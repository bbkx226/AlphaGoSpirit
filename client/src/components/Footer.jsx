import React from "react";

import logo from "../assets/logo-removebg.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <a href="https://blockchainapp-4e293.web.app/" target="_blank">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </a>
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <a href="https://coinmarketcap.com/currencies/ethereum/" target="_blank">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
        </a>
        <a href="https://coinmarketcap.com/rankings/exchanges/" target="_blank">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
        </a>
        <a href="https://speedrunethereum.com/" target="_blank">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
        </a>
      </div>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex items-center mt-3">
      <p className="text-white text-xs">Copyright © 2023 Opac1ty. All rights reserved</p>
    </div>
  </div>
);

export default Footer;