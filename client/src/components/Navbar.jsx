import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import logo from "../assets/logo-removebg.png";

const NavBarItem = ({ title, classprops, position}) => {
  const urls = ['https://coinmarketcap.com/currencies/ethereum/', 'https://coinmarketcap.com/rankings/exchanges/', 'https://speedrunethereum.com/']
  return <a href={urls[position]} target="_blank"><li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li></a>
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
      <a href="https://blockchainapp-4e293.web.app/" target="_blank">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </a>
      
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials"].map((item, index) => (
          <NavBarItem key={item + index} title={item} position={index}/>
        ))}

      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <AiOutlineBars fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <IoClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><IoClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// w-full: sets the width of the element to 100%
// flex: to be styled using flexbox layout
// md:justify-center: sets the element's justify-content property to center when the screen size is medium or larger
// justify-between: sets the element's justify-content property to space-between, which distributes the child elements evenly across the width of the element with equal spacing between them.
// items-center: sets the element's align-items property to center, which vertically centers the child elements within the element.
// p-4: sets the element's padding to 4 units
// md:flex-[0.5]: The md:flex-[0.5] class sets the flex-basis property of the element to 50% when the screen size is medium or larger.
// flex-initial: The flex-initial class sets the element's flex property to its initial value, which is 0 1 auto. This means that the element will not grow or shrink to fit its content, and that its size will be determined based on the width and height properties set for it.
// justify-center: The justify-center class sets the element's justify-content property to center, which centers the element horizontally within its parent container.
// items-center: The items-center class sets the element's align-items property to center, which vertically centers the element within its parent container.
// flex-row: The flex-row class sets the flex-direction property of the element to row, which means that child elements will be arranged in a row from left to right.
// list-none: The list-none class sets the list-style-type property of the element to none, which means that no markers (such as bullets) will be displayed for the element.
// hidden: The hidden class sets the visibility property of the element to hidden, which means that the element will not be visible on the page but will still take up space.
// rounded-full: The rounded-full class sets the border-radius property of the element to 50%, which creates a circular shape for the element.
// cursor-pointer: The cursor-pointer class sets the cursor property of the element to pointer
