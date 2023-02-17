import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { saberToast } from "../utils/toast";
import '../utils/toast.css';

// This context object can be used to share data across multiple components in a React application
// When a value is provided to this context at the top level of the application, 
// it can be consumed by any child component that subscribes to this context.
export const TransactionContext = React.createContext();

// Using destructuring assignment to extract the ethereum object from the window object in the browser
const { ethereum } = window; // type window.ethereum in console for specific details
const createEthereumContract = () => {
  //a Web3Provider object is created using the ethereum object that was previously extracted from the window object. 
  // The Web3Provider is a class provided by the ethers.js library that allows interaction with the Ethereum network.
  const provider = new ethers.providers.Web3Provider(ethereum);
 
  // The Signer is an interface provided by the ethers.js library that allows you to sign transactions and messages using your Ethereum account.
  const signer = provider.getSigner();

  // A new instance of a smart contract is created using the Contract class provided by the ethers.js library. The Contract constructor takes three arguments:
    // 1. contractAddress: the address of the smart contract on the blockchain.
    // 2. contractABI: the Application Binary Interface (ABI) of the contract, which defines the methods and events that can be called on the contract.
    // 3. signer: the Signer object obtained from the Web3Provider.
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => { // The magic of useState is what makes React special, google it and see how it works
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount")); //local storage is a storage that stores data in your web app
  const [transactions, setTransactions] = useState([]);
  
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(formData)
  };
 
  const handleAddressChange = (name, data) => {
    setFormData((prevState) => ({ ...prevState, [name]: data }));
    console.log(formData)
  }

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));
        
        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        saberToast.warn({
          title: "Warning",
          text: "Please install metamask",
          delay: 200,
          duration: 2600,
          rtl: true,
          position: "bottom-right"
        })
        return window.open("https://metamask.io/download/")
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return saberToast.info({
          title: "Friendly Reminder",
          text: "Please install metamask",
          delay: 200,
          duration: 2600,
          rtl: true,
          position: "bottom-right"
        })
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);

      window.location.reload();
    } catch (error) {
      console.log(error);
      // throw an exception, which interrupts the normal execution 
      // of the code and jumps to the nearest exception handler
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData; // Get data
        const transactionsContract = createEthereumContract(); // Get contract
        const parsedAmount = ethers.utils.parseEther(amount); // Convert decimal to hex

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 Gwei, 1 ETH = 10*18 Gwei
            value: parsedAmount._hex,
          }],
        });


        // Transaction ID
        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
        saberToast.info({
          title: "Friendly Remainder",
          text: `Processing...`,
          delay: 200,
          duration: 50000,
          rtl: true,
          position: "top-right"
        })
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        saberToast.success({
          title: "Congrats!",
          text: "Your ETH has successfully been transferred",
          delay: 200,
          duration: 1000,
          rtl: true,
          position: "top-right"
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      saberToast.error({
        title: "Error occurred",
        text: "Something went wrong...",
        delay: 200,
        duration: 2600,
        rtl: true,
        position: "bottom-right"
      })
      
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => { 
    // Check after every render whether wallet is connected (`checkIfWalletIsConnect()`) or if transactions (`checkIfTransactionsExists()`) exist
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        handleAddressChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
