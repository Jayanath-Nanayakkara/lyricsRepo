import { useState } from "react";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          className="flex flex-row justify-start items-center
        my-8 text-sm font-medium text-gray-400 hover:text-cyan-400
        "
          key={item.name}
          to={item.to}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 mr-2  cursor-pointer"
            onClick={() => setMobileMenuOen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 cursor-pointer"
            onClick={() => setMobileMenuOen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3
      bg-gradient-to-tl from-white/10 to-[#483d5b]
      backdrop-blur-lg z-10 p-6 md:hidden ${
        mobileMenuOpen ? "left-0" : "-left-full"
      }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
