/* eslint-disable @next/next/no-img-element */
"use client"
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { LanguageSwitcher } from "../components/Languages-Switcher";

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className={` text-gray-800 w-full py-2 px-4 rounded-full border ${isFocused ? 'border-blue-500' : 'border-gray-300'
          } focus:outline-none transition-all duration-300 transform ${isFocused
            ? 'w-60 scale-110 mr-3'
            : 'w-28 scale-100'
          }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none ${isFocused ? 'text-blue-500' : 'text-gray-500'
          }`}
        onClick={handleFocus}
      >
        <FaSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export const Logo = () => {
  return (
    <div>
      <h1 className="text-4xl font-signature ml-2">
        <a
          className="link-underline link-underline-black"
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <img className='w-44 h-[90px]' src="/logo.png" alt="logo" />
        </a>
      </h1>
    </div>
  );
};

const Navigation = () => {
  const [nav, setNav] = useState(false);

  const toggleNavLogo = () => {
    setNav(!nav);
  };

  const links = [
    {
      id: 2,
      name: "Inventory",
      link: "/inventory"
    },
    {
      id: 3,
      name: "Contact",
      link: "/contact"
    }
  ];

  return (
    <>
      <div className="flex items-center w-full h-20 pr-2 pl-4 text-white bg-gray-500 nav">

        {!nav && <Logo />}

        <ul className="hidden md:flex md:justify-end w-[57%]">
          <li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-100 hover:scale-110 hover:text-white duration-500 link-underline">
            <Link href="/">Home</Link>
          </li>
          {links.map(({ id, name, link }) => (
            <>
              <li
                key={id}
                className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-100 hover:scale-110 hover:text-white duration-500 link-underline"
              >
                <Link target="_blank" href={link}>{name}</Link>

              </li>
            </>
          ))}

        </ul>
        <div className="hidden md:flex items-center justify-end w-[45%] lg:px-4 md:px-2 sm:px-0">
          <LanguageSwitcher />
        </div>
        <div
          onClick={toggleNavLogo}
          className="w-[100%] cursor-pointer pr-4 z-10 md:hidden flex items-center justify-between"
        >
          <div> {nav && <Logo />} </div>
          <div className="text-orange-500"> {nav ? <FaTimes size={30} /> : <FaBars size={30} />} </div>
        </div>
        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-black text-slate-600">
            {links.map(({ id, name, link }) => (
              <li key={id} className="px-4 cursor-pointer capitalize py-6 text-2xl">
                <Link onClick={() => setNav(!nav)} href={link}>
                  {name}
                </Link>
              </li>
            ))}
            {nav && <LanguageSwitcher />}
          </ul>
        )}
      </div >
    </>
  );
};

export default Navigation;