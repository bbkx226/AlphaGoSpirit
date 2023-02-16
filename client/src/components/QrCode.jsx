import React, { useContext, useState } from "react";
import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { TransactionContext } from "../context/TransactionContext";
import { saberToast } from "../utils/toast";
import photo from "../assets/camera.png"

const Input = ({ placeholder, name, type, value, handleChange}) => {

    const handleInputChange = (e) => {
        handleChange(e, name)
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
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false)
    const { currentAccount, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

    if (!currentAccount) return

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData; // Destructure the data to its variable
    
        e.preventDefault(); // To prevent the page from reloading (kinda important when event happens)
    
        if (!addressTo || !amount || !keyword || !message) {
            return saberToast.info({
                title: "Friendly Reminder",
                text: `Ensure all input box have been filled`,
                delay: 200,
                duration: 2600,
                rtl: true,
                position: "bottom-right"
            })
        }
    
        sendTransaction();
    };

    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-qrcode">
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
                {/* This one is qr code generator, which I intend to implement it behind the ethereum card we have in the welcome page */}
            
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism ml-20 mt-10">
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange}/>
                <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>
            </div>
            { open ?
            <QrReader
                onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                    handleSubmit()
                }
                }}
                containerStyle={{ width: '512px', height: '512px', marginLeft: '30px' }}
                scanDelay={1000}
            />
            
            :
            <button onClick={() => setOpen(true)} className="mt-10" style={{ width: '512px', height: '360px', marginLeft: '30px', backgroundColor: 'white'}}>
                <img src={photo} alt="Camera" style={{ width: '360px', height: '360px',  marginLeft: '80px'}}/>
            </button>
            }
            <p>{data}</p> 
            <div className="hidden">
                <Input placeholder="Address To" name="addressTo" type="text" value={data} handleChange={handleChange} />
            </div>
            </div>
        </div>
    )
}



export default QrCode;