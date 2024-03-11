/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

function CustomerReview() {
	return (
		<>
			<main className="md:hidden flex w-full justify-center align-middle">
				<Link href="/inventory" className="mr-10">
					<button className="border border-slate-500 group relative h-12 w-full px-5 overflow-hidden rounded-lg bg-white text-lg shadowm-0">
						<div className="absolute inset-0 w-3 bg-slate-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
						<span className="relative text-black group-hover:text-white">Inventory</span>
					</button>
				</Link>
				<Link href="/contact">
					<button className="border border-slate-500 group relative h-12 w-full px-5 overflow-hidden rounded-lg bg-white text-lg shadow">
						<div className="absolute inset-0 w-3 bg-slate-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
						<span className="relative text-black group-hover:text-white">Contact!</span>
					</button>
				</Link>
			</main>
			<section className="my-8 mb-28 bg-gray-200 text-gray-800">
				<header className="container mx-auto px-6 flex justify-center w-full">
					<h1 className="text-4xl mt-20 font-serif font-medium mb-24 flex text-slate-600 text-center hover:duration-300 hover:shadow-blue-500 hover:rounded hover:bg-transparent hover:shadow-lg">What our customers are saying about us</h1>
				</header>

				<div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
					<div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
						<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-300">
							<p className="relative px-6 py-1 text-lg italic text-center text-gray-900">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400">
									<path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
									<path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
								</svg>Online Car Collection delivers excellence! Their vast inventory, user-friendly website, and seamless purchasing process made finding my dream car a breeze. Highly recommend!
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400">
									<path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
									<path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
								</svg>
							</p>
						</div>
						<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-violet-400 text-gray-900">
							<img src="./1.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full bg-gray-500" />
							<p className="text-xl font-semibold leadi">Jason Andrews</p>
							<p className="text-sm uppercase">⭐⭐⭐⭐⭐</p>
						</div>
					</div>
					<div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
						<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-300">
							<p className="relative px-6 py-1 text-lg italic text-center text-gray-900">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400">
									<path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
									<path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
								</svg>Impressed by Online Car Collection's seamless experience. Easy browsing, efficient purchase process, and top-notch service. Thrilled with my purchase!
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400">
									<path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
									<path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
								</svg>
							</p>
						</div>
						<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-violet-400 text-gray-900">
							<img src="./2.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full bg-gray-500" />
							<p className="text-xl font-semibold leadi">Emily Chen</p>
							<p className="text-sm uppercase">⭐⭐⭐⭐</p>
						</div>
					</div>
					<div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
						<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-300">
							<p className="relative px-6 py-1 text-lg italic text-center text-gray-900">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400">
									<path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
									<path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
								</svg>Exceptional experience with Online Car Collection. Easy browsing, straightforward ordering, and prompt delivery. Highly satisfied!
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400">
									<path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
									<path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
								</svg>
							</p>
						</div>
						<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-violet-400 text-gray-900">
							<img src="./3.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full bg-gray-500" />
							<p className="text-xl font-semibold leadi">Adam Patel</p>
							<p className="text-sm uppercase">⭐⭐⭐</p>
						</div>
					</div>
					<div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
						<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-300">
							<p className="relative px-6 py-1 text-lg italic text-center text-gray-900">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-violet-400">
									<path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
									<path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
								</svg>Online Car Collection excels! Extensive inventory, intuitive website, and hassle-free process. Sets the standard for online car shopping!
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-violet-400">
									<path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
									<path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
								</svg>
							</p>
						</div>
						<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-violet-400 text-gray-900">
							<img src="./4.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full bg-gray-500" />
							<p className="text-xl font-semibold leadi">Alex Johnson</p>
							<p className="text-sm uppercase">⭐⭐⭐⭐⭐</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default CustomerReview;
