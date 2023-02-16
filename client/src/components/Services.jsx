import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdMobileFriendly } from "react-icons/Md"; // https://react-icons.github.io/react-icons/
import { RiHeart2Fill } from "react-icons/Ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Why Opac1ty? <br/>
          What do we offer?
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          Our platform provides a range of user-friendly services, 
          making it the optimal choice for buying and selling your crypto assets
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="We ensure the security and privacy of Opac1ty, while also maintaining its high quality"
        />
        <ServiceCard
          color="bg-[#90EE90]"
          title="User-friendly interface"
          icon={<MdMobileFriendly fontSize={21} className="text-white" />}
          subtitle="A clean and intuitive user interface can help users navigate our app more easily and provide a positive user experience"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Opac1ty offers lightning-fast transaction speeds, 
          allowing you to quickly and easily transfer assets and complete transactions with ease"
        />
      </div>
    </div>
  </div>
);

export default Services;