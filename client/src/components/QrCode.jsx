import React, { useContext, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { TransactionContext } from "../context/TransactionContext";
import { saberToast } from "../utils/toast";
import photo from "../assets/camera.png"

const Input = ({ placeholder, name, type, value, handleChange }) => {
    const handleInputChange = (e) => {
        handleChange(e, name )
    }

    return (
        <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={handleInputChange}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
);}

const QrCode = () => {
    const [dt, setData] = useState("");
    const [open, setOpen] = useState(false)
    const [check, setCheck] = useState(false)
    const [confirm, setConfirm] = useState("")

    const { currentAccount, handleChange, sendTransaction, formData, handleAddressChange } = useContext(TransactionContext);

    const handleSubmit = () => {
        console.log(formData)
        const { addressTo, amount, keyword, message } = formData; // Destructure the data to its variable
        // e.preventDefault(); // To prevent the page from reloading (kinda important when event happens)
        
        if (!addressTo || !amount || !keyword || !message) {
            saberToast.info({
                title: "Friendly Reminder",
                text: `Ensure all input box have been filled`,
                delay: 200,
                duration: 2600,
                rtl: true,
                position: "bottom-right"
            })
        }
        sendTransaction();
        setCheck(false)
    };

    useEffect(() => {
        if (check === true) {
            handleAddressChange("addressTo", dt)
        }
        console.log(confirm)

    }, [check])
    
    useEffect(() => {
        if (confirm === "Confirm")
        {
            handleSubmit()
        }
    }, [confirm])


    return(
        
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-qrcode">
                {currentAccount ? (
                <div className="flex flex-col md:p-12 py-12 px-4">
                    <h1 className="text-white text-3xl text-center my-2">
                        QR Transaction
                    </h1>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                        <QRCode
                            size={512}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={currentAccount}
                            viewBox={`0 0 512 512`}
                        />
                    </div>
                
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism ml-20 mt-10">
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        { dt ? <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" 
                        type="text" placeholder="Type 'Confirm' to allow this transaction" value={confirm} onChange={(e) => setConfirm(e.target.value)} required/> : ""}
                    </div>
                    { open ?
                        <QrReader
                            onResult={(result, error) => {
                            if (!!result) {
                                setData(result?.text);
                                setCheck(true)
                            }
                            }}
                            containerStyle={{ width: '512px', height: '512px', marginLeft: '30px' }}
                            scanDelay={500}
                        />    
                    :
                        <button onClick={() => setOpen(true)} className="mt-10" style={{ width: '512px', height: '360px', marginLeft: '30px', backgroundColor: 'white'}}>
                            <img src={photo} alt="Camera" style={{ width: '360px', height: '360px',  marginLeft: '80px'}}/>
                        </button>
                    }

                    
                </div>
                ):
                <div className="flex flex-col md:p-12 py-12 px-4">
                    <h1 className="text-white text-3xl text-center my-2">
                        
                    </h1>
                </div>
                }
        </div>
    )
}



export default QrCode;