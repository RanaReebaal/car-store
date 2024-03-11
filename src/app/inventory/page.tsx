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
  const [searchLoader, setSearchLoader] = useState(false);

  const [hovered, setHovered] = useState(null);

  const sliderSettings = {
    dots: false, // Remove dots
    infinite: true,
    speed: 3000,
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

  // Search Bar
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    year: "",
    price: "",
    miles: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Capitalize the first letter and remove extra spaces
    if (name === 'name') {
      setFormData({
        ...formData,
        [name]: value.trim().replace(/\s+/g, ' ').split(' ')[0].charAt(0).toUpperCase() + value.trim().replace(/\s+/g, ' ').split(' ')[0].slice(1)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const submitSearch = async (formData: any) => {
    try {
      setSearchLoader(true);
      const response = await axios.post("/api/search", formData);
      setData(response.data); // Update data state with search results
      setCurrentPage(0);
      setSearchLoader(false); // Reset current page to first page
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitSearch(formData);
  };

  return (
    <>
      <br /><br />
      {/* <br /><br /> */}
      <div>
        <form className="grid" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-center items-center mt-5 place-content-center">
            <div className="flex justify-center w-full">
              <header className="container mx-auto px-6 flex justify-center w-full">
                <h1 className="text-4xl font-serif font-medium mb-24 flex text-slate-600 text-center hover:duration-300 hover:shadow-blue-500 hover:rounded hover:bg-transparent hover:shadow-lg">Use search filters to find your favourite car</h1>
              </header>
            </div>
            <br /><br /><br /><br /><br /><br /><br />
            <div className='grid smm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
              <div>
                <h1 className='text-md font-medium px-6 text-slate-600 mt-4'>Type Of Car</h1>
                <select name="type" value={formData.type} onChange={handleChange} className='px-4 ml-6 mt-3 h-12 w-64 bg-slate-50 rounded-xl'>
                  <option value="">Select type of car</option>
                  <option value="Used">Used cars</option>
                  <option value="New">New cars</option>
                </select>
              </div>
              <div>
                <h1 className='text-md font-medium px-6 text-slate-600 mt-4'>Car Year</h1>
                <select name="year" value={formData.year} onChange={handleChange} className='px-4 ml-6 mt-3 h-12 w-64 bg-slate-50 rounded-xl'>
                  <option value="">Select car year</option>
                  <option value="1990">Cars before 1990</option>
                  <option value="2000">Cars before 2000</option>
                  <option value="2010">Cars after 2000</option>
                  <option value="2020">Cars after 2010</option>
                  <option value="2024">Cars upto 2024!</option>
                </select>
              </div>
              <div className="">
                <h1 className='text-md font-medium px-6 text-slate-600 mt-4'>Price</h1>
                <select name="price" value={formData.price} onChange={handleChange} className='px-4 ml-6 mt-3 h-12 w-64 bg-slate-50 rounded-xl'>
                  <option value="">Select price range</option>
                  <option value="20000">Less than $20,000</option>
                  <option value="50000">Less than $50,000</option>
                  <option value="150000">Less than $150,000</option>
                </select>
              </div>
              <div>
                <h1 className='text-md font-medium px-6 text-slate-600 mt-4'>Miles</h1>
                <select name="miles" value={formData.miles} onChange={handleChange} className='px-4 ml-6  mr-4 mt-3 h-12 w-64 bg-slate-50 rounded-xl'>
                  <option value="">Select mileage range</option>
                  <option value="20000">O to 20,000 miles</option>
                  <option value="50000">Less than 50,000 miles</option>
                  <option value="150000">Less than 150,000 miles</option>
                </select>
              </div>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter any car manufacturer / brand of your choice e.g Ford"
              value={formData.name}
              onChange={handleChange}
              className="px-3 text-wrap mt-20 ml-7 h-12 md:w-[470px] w-[320px] bg-slate-50 rounded-xl"
            />
            <button className="mt-20 ml-7 mr-[30px] relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-slate-600 rounded font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]">
              <span className="relative z-10">Submit</span>
            </button>
          </div>
        </form>
      </div>
      <br />
      {/* <br /><br /><br /><br /> */}
      <div className="w-full my-20">
        <div className="flex justify-end md:pr-32 pr-28">
          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            onPageChange={handlePageChange}
            breakLabel="..."
            pageCount={pageCount}
            previousLabel={
              <IconContext.Provider value={{ color: "#000", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#000", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
          />
        </div><br />

        {searchLoader || loading ? (
          <>
            {/* // <p className="text-center">Loading car data...</p> */}
            <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
              <div className="flex justify-center items-center h-screen">
                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                  <svg className="h-20 w-20 animate-spin stroke-blue-500" viewBox="0 0 256 256">
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
                </div>
              </div>
              <span className="text-white text-3xl font-bold">Loading...</span>

            </div>
          </>
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-6 text-center'>
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
                        <h3 className="mb-1 font-bold text-xl tracking-widest">{item.make}, {item.model}</h3>
                        <div className="flex">
                          <span className="font-normal text-sm tracking-widest"><span className="font-medium">Price</span>: <span className="text-slate-600">${parseFloat(item.sellingprice).toFixed(0)}</span></span>
                          <span className="font-normal text-sm tracking-widest ml-2"><span className="font-medium">Model Number</span>: <span className="text-slate-600">{item.modelnumber}</span></span><br />
                        </div>
                        {item.year && (
                          <button className="mt-2 bg-black text-base hover:bg-gray-900 mr-2 text-white font-bold py-1 px-3 rounded-full">
                            {item.year}
                          </button>
                        )}
                        {item.ext_color_generic && (
                          <button className="bg-black text-base hover:bg-gray-900 mr-2 text-white font-bold py-1 px-3 rounded-full">
                            {item.ext_color_generic}
                          </button>
                        )}
                        {item.type && (
                          <button className="bg-black text-base hover:bg-gray-900 text-white font-bold py-1 px-3 rounded-full">
                            {item.type}
                          </button>
                        )}

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
                  <IconContext.Provider value={{ color: "#000", size: "36px" }}>
                    <AiFillLeftCircle />
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider value={{ color: "#000", size: "36px" }}>
                    <AiFillRightCircle />
                  </IconContext.Provider>
                }
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
              />
            </div>
          </>
        )}
      </div >
    </>
  )
}