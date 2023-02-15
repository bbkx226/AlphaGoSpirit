// Explanation:
// This is a Solidity smart contract that allows users to add transactions to a blockchain. 
// The contract keeps track of the number of transactions and stores them in an array of `TransferStructs`

// SPDX-License-Identifier: UNLICENSED (there are no licensing restrictions on its use or distribution)
pragma solidity ^0.8.17; // solidity version

contract Transactions { // Defines the start of the Solidity contract
    uint256 transactionCount; // Declares a state variable named "transactionCount" of type uint256 
    // UINT is unsigned, its first bit (Most Significant Bit (MSB)) is not reserved for signing. Thus, range 0 < x <  4294967295 decimal

    // Defines an event named "Transfer" that will emit data when a new transaction is added to the blockchain.
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct { // parameters required for each transaction
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions; // defines a struct like we do in C programming

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public { 
        // public: It means this function is public and can be called by anyone
        
        transactionCount += 1;

        // !!! (Important) Adds a new TransferStruct to the transactions array using the input parameters and the current block timestamp
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        
        // By emitting this event, the transaction details are made available to anyone interested in listening for them
        // !!! (Important) It is a way to provide transparency and enable interoperability between the smart contract and external systems by broadcasting details about a transaction being added to the blockchain
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);

    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        // view: This function is only used for reading-purpose
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}