/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxDotFilled } from 'react-icons/rx';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Link from "next/link";

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="hidden sm:flex md:relative">
      <input
        type="text"
        placeholder="Search Anything"
        className={` text-gray-800 w-full py-2 my-5 px-4 rounded-full border ${isFocused ? 'border-blue-500' : 'border-gray-300'
          } focus:outline-none transition-all duration-300 transform ${isFocused
            ? 'w-[700px] scale-110' // Maintain focus scale and adjust width
            : 'w-[650px] scale-100' // Preserve normal scale on other states
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
        {/* <FaSearch className="h-5 w-5" /> */}
        <Link className="h-5 w-5" href="/inventory">
          <FaSearch />
        </Link>

      </button>
    </div>
  );
};

export default function Header() {
  const slides = [
    {
      url: 'https://gtspiritmedia.com/gtspirit/uploads/2015/01/Supercars-3.jpeg',
    },
    {
      url: 'https://d1i1eo6qmdfmdv.cloudfront.net/upload/site/pages/exotics_racing_LA/DSC01660-2.jpg',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/exr-static/upload/site/pages/exotics_racing_LA/DSC01339.jpg',
    },
    {
      url: 'https://hips.hearstapps.com/toc.h-cdn.co/assets/16/14/3200x1600/landscape-1459819192-mph-club-a.jpg?resize=1200:*',
    },
    {
      url: 'https://www.carscoops.com/wp-content/uploads/2015/01/7df67e38-supercars-china-track-6.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1400px] md:h-[780px] h-[600px] w-full m-auto py-16 px-4 group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
        <header className="container mx-auto px-6 flex flex-col items-center h-full">

          <div className="w-full container mx-auto md:px-6 px-0 flex flex-col md:items-center items-end justify-center h-full">
            <h1 id="heading__title_a" className="md:text-center text-right lg:text-6xl md:text-4xl text-2xl font-extrabold text-transparent">Browse Your Favourite Cars From</h1>
            <h1 id="heading__title_b" className="lg:text-5xl md:text-3xl text-xl font-bold md:mb-0 mb-2">Online Car Collections</h1>

            <div className="relative flex w-full md:mb-0 mb-3 md:mt-0 mt-3">
              {/* Left Arrow */}
              <div className='justify-center absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>

              {/* Right Arrow */}
              <div className='justify-end absolute top-[50%] -translate-x-0 translate-y-[-50%] right-3 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
            </div>
            <SearchBar />
          </div>
        </header>
      </div>

      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-2xl' : 'text-xl'
              }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
      
    </div>
  );
}