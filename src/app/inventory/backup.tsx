/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Link from "next/link";
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const itemsPerPage = 20; // Number of items to display per page

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]); // State to hold fetched car data
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  const sliderSettings = {
    dots: false, // Remove dots
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Fetch car data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredData(data.slice(startIndex, endIndex));
  }, [currentPage, data]);

  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected);
  };

  // Calculate total number of pages (considering potential remainder)
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <div className="w-full my-20">
        <header className="container mx-auto px-6 flex justify-center w-full">
          <div className="flex justify-center w-full">

            <h1 className="text-3xl font-bold mb-4 flex text-center">Car Pagination</h1>
          </div>
        </header>
        <div className="flex justify-end md:pr-60 pr-56">
          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            onPageChange={handlePageChange}
            breakLabel="..."
            pageCount={pageCount}
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
          />
        </div><br />
        {loading ? (
          // <p className="text-center">Loading car data...</p>
          <div className="flex items-center justify-center">
            <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
              <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
              </svg>
              <span className="text-4xl font-medium text-gray-500">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {data.length > 0 ? (
              // <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 px-6 text-center'>
              //   {filteredData.map((item:any) => (
              //     <div key={item.id} className="rounded-2xl hover:scale-105 transition duration-700 ease-in-out item py-4 card shadow-2xl overflow-hidden">
              //       <Slider {...sliderSettings}>
              //         {item.photourls?.split(',').map((url:any, index:any) => (
              //           <div key={index}>
              //             <img className="w-[600px] h-[300px] object-cover rounded-t-2xl"
              //               src={url || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} // Display placeholder image if photourls array is empty
              //               width={600}
              //               height={300}
              //               alt={item.name}
              //             />
              //           </div>
              //         ))}
              //       </Slider>
              //       <div className="p-4 text-left">
              //         <h3 className="font-bold text-xl tracking-widest">{item.make}, {item.model}</h3>
              //         <p className="font-normal text-lg tracking-widest">Price: ${parseFloat(item.sellingprice).toFixed(0)}</p>
              //         {/* <p className="font-normal text-lg tracking-widest">{item.description}</p> */}
              //       </div>
              //       <Link href={`/inventory/${item.uuid}`}>
              //         <button className="rounded-xl group relative min-h-[50px] w-40 overflow-hidden border border-gray-400 bg-white text-gray-700 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-gray-700 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-gray-700 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
              //           <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-gray-700 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-gray-700 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
              //           <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">View Item</span>
              //         </button>
              //       </Link>
              //     </div>
              //   ))}
              // </div>
              <>
                <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 px-6 text-center'>
                  {filteredData.map((item: any) => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl hover:scale-105 transition duration-700 ease-in-out item py-4 card shadow-2xl overflow-hidden"
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                    >

                      {hovered === item.id && (
                        <>
                          <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-l focus:outline-none transition duration-300 ease-in-out hover:bg-gray-300">
                            &lt;
                          </button>
                          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-r focus:outline-none transition duration-300 ease-in-out hover:bg-gray-300">
                            &gt;
                          </button>
                        </>
                      )}
                      <Slider {...sliderSettings}>
                        {item.photourls?.split(',').map((url: any, index: any) => (
                          <div key={index}>
                            <img
                              className="w-[600px] h-[300px] object-cover rounded-t-2xl"
                              src={url || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} // Display placeholder image if photourls array is empty
                              width={600}
                              height={300}
                              alt={item.name}
                            />
                          </div>
                        ))}
                      </Slider>
                      <div className="p-4 text-left">
                        <h3 className="font-bold text-xl tracking-widest">{item.make}, {item.model}</h3>
                        <p className="font-normal text-lg tracking-widest">Price: ${parseFloat(item.sellingprice).toFixed(0)}</p>
                        {/* <p className="font-normal text-lg tracking-widest">{item.description}</p> */}
                      </div>
                      <Link target="_blank" href={`/inventory/${item.uuid}`}>
                        <button className="rounded-xl group relative min-h-[50px] w-40 overflow-hidden border border-gray-400 bg-white text-gray-700 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-gray-700 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-gray-700 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                          <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-gray-700 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-gray-700 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                          <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">View Item</span>
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>

              </>
            ) : (
              <p className="text-center">No items found.</p>
            )}
            <div className="flex items-center justify-center flex-col mt-7">
              <ReactPaginate
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                onPageChange={handlePageChange}
                breakLabel="..."
                pageCount={pageCount}
                previousLabel={
                  <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillLeftCircle />
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillRightCircle />
                  </IconContext.Provider>
                }
              />
            </div>
          </>
        )}
      </div >
    </>
  );
}
