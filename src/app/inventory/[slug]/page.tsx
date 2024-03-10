/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InventoryPage() {
   const pathname = usePathname();
   const id = pathname.split('/').pop();
   const [post, setPost] = useState<any | null>(null);
   const [loading, setLoading] = useState(true);
   const [notFound, setNotFound] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.post('/api/inventory', { id });
            setPost(response.data);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching post:', error);
            setLoading(false);
            setNotFound(true);
         }
      };

      fetchData();
   }, [id]);

   const handleGoHome = () => {
      router.push('/');
   };
   return (
      <>
         {loading ? (

            <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
               <div className="flex justify-center items-center h-screen">
                  <div aria-label="Loading..." role="status" className="flex items-center space-x-2 m-2">
                     <img className="w-10 h-10 animate-spin" src="https://www.svgrepo.com/show/169757/loading-process.svg" alt="Loading icon" />
                  </div>
               </div>
               <span className="text-white text-3xl font-bold">Loading...</span>

            </div>
         ) : notFound ? (
            <div className="flex justify-center items-center h-screen flex-col">
               <h1 className="text-3xl font-medium text-red-500">Page Not Found</h1>
               <p className="text-lg text-gray-600 mb-4">The requested page does not exist.</p>
               <button onClick={handleGoHome} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go Back Home</button>
            </div>
         ) : (
            <div>
               {post ? (
                  // Your UI elements for displaying post data
                  <div className='mt-10'>
                     {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}

                     {/* <br /><br /><br /><br /> */}
                     <center>
                        <h1 className='text-3xl font-medium'>Product Details</h1>
                     </center>
                     <br />

                     <div className="font-[sans-serif] bg-white">
                        <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                           <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                              <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                                 <img src={post.photourls?.split(',')[0] || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt={`${post?.make}, ${post?.model}`} className=" rounded object-cover" />
                                 <div className="mt-6 flex gap-6 mx-auto">
                                    <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                       <img src={post.photourls?.split(',')[1] || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt={`${post?.make}, ${post?.model}`} className="w-56 h-40 rounded-xl cursor-pointer" />
                                    </div>
                                    <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                       <img src={post.photourls?.split(',')[2] || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt={`${post?.make}, ${post?.model}`} className="w-56 h-40 rounded-xl cursor-pointer" />
                                    </div>
                                 </div>
                                 <div className="mt-6 flex gap-6 mx-auto">

                                    <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                       <img src={post.photourls?.split(',')[3] || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt={`${post?.make}, ${post?.model}`} className="w-56 h-40 rounded-xl cursor-pointer" />
                                    </div>
                                    <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                       <img src={post.photourls?.split(',')[5] || 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt={`${post?.make}, ${post?.model}`} className="w-56 h-40 rounded-xl cursor-pointer" />
                                    </div>
                                 </div>
                              </div>
                              <div className="lg:col-span-2">
                                 <h2 className="text-2xl font-extrabold text-[#333]">{post?.make}, {post?.model}</h2>
                                 <div className="flex flex-wrap gap-4 mt-6">
                                    <p className="text-[#333] font-bold text-xl">Price :</p>
                                    <h1 className="text-[#333] text-xl">${parseFloat(post?.sellingprice).toFixed(0)}</h1>
                                 </div>
                                 <div className="flex flex-wrap gap-4 mt-6">
                                    <p className="text-[#333] font-bold text-xl">Dealer Id :</p>
                                    <h1 className="text-[#333] text-xl">{post?.dealerid}</h1>
                                 </div>
                                 <div className="flex flex-wrap gap-4 mt-6">
                                    <p className="text-[#333] font-bold text-xl">Type :</p>
                                    <h1 className="text-[#333] text-xl">{post?.type}</h1>
                                 </div>
                                 <div className="flex flex-wrap gap-4 mt-6">
                                    <p className="text-[#333] font-bold text-xl">Stock :</p>
                                    <h1 className="text-[#333] text-xl">{post?.stock}</h1>
                                 </div>

                                 <div className="flex flex-wrap gap-4 mt-6">
                                    <p className="text-[#333] font-bold text-xl">Vin :</p>
                                    <h1 className="text-[#333] text-xl">{post?.vin}</h1>
                                 </div>

                                 <div className="flex flex-wrap gap-4 mt-10">
                                    <button type="button" className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-bold rounded">Buy now</button>
                                 </div>
                                 <div className="mt-16">
                                    <div className="flex items-start">
                                       <div className="">
                                          <h4 className="text-2xl font-bold text-[#333]">Description</h4>

                                          <p className="text-md mt-4 text-[#333]">{post?.description}</p>
                                       </div>

                                    </div>
                                    <br />
                                    <div className="">
                                       <h4 className="text-2xl font-bold text-[#333] mb-5">Option</h4>
                                       {post && post.options && post.options.split(',').map((option: any, index: any) => (
                                          <button key={index} type="button" className="px-4 py-2.5 mb-1 border border-[#8e8d8d] bg-transparent hover:bg-gray-50 text-[#333] text-sm rounded">
                                             {option.trim()}
                                          </button>
                                       ))}
                                    </div>
                                 </div>

                              </div>

                           </div>

                           <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                              <h3 className="text-lg font-bold text-[#333]">Product information</h3>
                              <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 ssm:grid-cols-2" id='proinform'>
                                 <div className="">
                                    <ul className="mt-6 space-y-6 text-[#333]">
                                       <li className="text-sm font-bold">Year : </li>
                                       <li className="text-sm font-bold">Make :</li>
                                       <li className="text-sm font-bold">Model:</li>
                                       <li className="text-sm font-bold">Body :</li>
                                       <li className="text-sm font-bold">Trim :</li>
                                       <li className="text-sm font-bold">Model Number :</li>
                                       <li className="text-sm font-bold">Doors :</li>
                                       <li className="text-sm font-bold">Dealer Address : </li>
                                       <li className="text-sm font-bold">Dealer City :</li>
                                       <li className="text-sm font-bold">Dealer State :</li>
                                       <li className="text-sm font-bold">Style Description :</li>
                                       <li className="text-sm font-bold">Ext Color Generic :</li>
                                       <li className="text-sm font-bold">Ext Color Code :</li>
                                    </ul>
                                 </div>
                                 <div className="">

                                    <ul className="mt-6 space-y-6 text-[#333]">
                                       <li className="text-sm">{post?.year}</li>
                                       <li className="text-sm">{post?.make}</li>
                                       <li className="text-sm">{post?.model}</li>
                                       <li className="text-sm">{post?.body}</li>
                                       <li className="text-sm">{post?.trim}</li>
                                       <li className="text-sm">{post?.modelnumber}</li>
                                       <li className="text-sm">{post?.doors}</li>
                                       <li className="text-sm">{post?.dealeraddress}</li>
                                       <li className="text-sm">{post?.dealercity}</li>
                                       <li className="text-sm">{post?.dealerstate}</li>
                                       <li className="text-sm">{post?.style_description}</li>
                                       <li className="text-sm">{post?.ext_color_generic}</li>
                                       <li className="text-sm">{post?.ext_color_code}</li>
                                    </ul>
                                 </div>
                                 <div className="">
                                    <ul className="mt-6 space-y-6 text-[#333]">
                                       <li className="text-sm font-bold">Exterior Color :</li>
                                       <li className="text-sm font-bold">Interior Color :</li>
                                       <li className="text-sm font-bold">Transmission :</li>
                                       <li className="text-sm font-bold">Miles :</li>
                                       <li className="text-sm font-bold">Certified :</li>
                                       <li className="text-sm font-bold">Date In Stock :</li>
                                       <li className="text-sm font-bold">Chrome Style Info :</li>
                                       <li className="text-sm font-bold">Drive Train :</li>
                                       <li className="text-sm font-bold">Fuel Type :</li>
                                       <li className="text-sm font-bold">CityMpg :</li>
                                       <li className="text-sm font-bold">HighWayMpg :</li>
                                       <li className="text-sm font-bold">Factory Codes :</li>
                                       <li className="text-sm font-bold">Int Upholstery :</li>
                                    </ul>
                                 </div>
                                 <div className="">
                                    <ul className="mt-6 space-y-6 text-[#333]">
                                       <li className="text-sm">{post?.exteriorcolor}</li>
                                       <li className="text-sm">{post?.interiorcolor}</li>
                                       <li className="text-sm">{post?.transmission}</li>
                                       <li className="text-sm">{post?.miles}</li>
                                       <li className="text-sm">{post?.certified}</li>
                                       <li className="text-sm">{post?.dateinstock}</li>
                                       <li className="text-sm">{post?.chrome_style_info}</li>
                                       <li className="text-sm">{post?.drivetrain}</li>
                                       <li className="text-sm">{post?.fuel_type}</li>
                                       <li className="text-sm">{post?.citympg}</li>
                                       <li className="text-sm">{post?.highwaympg}</li>
                                       <li className="text-sm">{post?.factory_codes}</li>
                                       <li className="text-sm">{post?.int_upholstery}</li>
                                    </ul>
                                 </div>
                              </div>
                           </div>

                           <br /><br />
                           <div className="">
                              <h4 className="text-2xl font-bold text-[#333] mb-5">Engine Description</h4>
                              {post && post.engine_description && post.engine_description.split(',').map((engine_description: any, index: any) => (
                                 <button key={index} type="button" className="px-4 py-2.5 border border-[#8e8d8d] bg-transparent hover:bg-gray-50 text-[#333] text-sm mr-1 font-medium rounded">
                                    {engine_description.trim()}
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  // UI elements for when no post is found
                  <>
                     <p>No post found</p>
                     <div className="text-center">
                        <h1 className="mb-4 text-6xl font-semibold text-red-500">Oops!</h1>
                        <p className="mb-4 text-lg text-gray-600">Looks like No Post found.</p>
                        <div className="animate-bounce">
                           <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                           </svg>
                        </div>
                        <p className="mt-4 text-gray-600">Let's get you back <a href="/" className="text-blue-500">home</a>.</p>
                     </div>
                  </>
               )}
            </div>
         )}

         {/* The rest of your code */}
      </>
   )
}
