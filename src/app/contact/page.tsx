/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const SearchBar: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // State for loader

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Show loader when form submitted

    if (customerPhone.length !== 11) {
      toast.error('Please enter 11 numbers for the phone number.');
      setLoading(false); // Hide loader
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_name: customerName, customer_phone: customerPhone, customer_email: customerEmail })
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponse(`Contact added successfully:\n${JSON.stringify(responseData, null, 2)}`);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Contact added successfully'
        });
      } else {
        const errorData = await response.json();
        setResponse(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Internal server error');
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (!/^[0-9]*$/.test(input)) { // Check if input contains only numbers
      toast.error('Please enter numbers only.');
      return;
    }
    if (input.length > 11) { // Allow only 11 digits
      toast.error('Please enter 11 numbers for the phone number.');
      return;
    }
    setCustomerPhone(input);
  };

  return (
    <>
      <ToastContainer />
      <div className="font-[sans-serif] text-[#333] mt-10">
        <div className="min-h-60 flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mt-8">
                  <label htmlFor="customerName" className="text-base block font-bold">Customer Name</label><br />
                  <div className="relative flex items-center">
                    <input type="text" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} name="customer_email" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter Customer Name" />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mt-8">
                    <label htmlFor="customerPhone" className="text-base block font-bold">Customer Phone</label><br />
                    <div className="relative flex items-center">
                      <input type="tel" id="customerPhone" value={customerPhone} onChange={handlePhoneChange} required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter Customer Phone No" />
                    </div>
                  </div>

                  <div className="mt-8">
                    <label htmlFor="customerEmail" className="text-base block font-bold">Customer Email</label><br />
                    <div className="relative flex items-center">
                      <input type="email" id="customerEmail" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} name="customer_email" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter Email Address" />
                    </div>
                  </div>
                </div>
                <br /><br />
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-md font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Send your message
                </button>
              </form>
            </div>
            <div className="md:h-full max-md:mt-10 rounded-xl lg:p-12 p-8">
              <img src="/contact.png" className="w-full h-full object-contain" alt="login-image" />
            </div>
          </div>
        </div>
      </div>
      {/* Loader */}
      {loading && (
        <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
          <div className="flex justify-center items-center h-screen">
            <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
              <svg className="h-20 w-20 animate-spin stroke-blue-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                </line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                </line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                </line>
              </svg>
            </div>
          </div>
          <span className="text-white text-3xl font-bold">Loading...</span>
        </div>
      )}
    </>
  );
};

export default SearchBar;
