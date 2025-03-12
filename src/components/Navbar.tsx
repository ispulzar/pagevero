import React from "react";
import { FaInstagram } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className=" p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">Pistacho</div>

        <ul className="flex space-x-4">
          <li >
            <a href="#" className="text-black hover:text-red-300">
              <FaInstagram className="" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
