import React, { useState, useEffect } from "react";
import banner1 from "../assets/banner11.jpg";
import banner2 from "../assets/banner12.jpg";
import banner3 from "../assets/banner.webp";
import side1 from "../assets/banner.webp"; // small right-side banner
import side2 from "../assets/banner1.jpg"; // another small right-side banner


export default function Banner() {
  const images = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full min-h-[50px] md:h-[250px] z-0 mt-6 px-4">
      {/* Left: Big Slider */}
      <div className="relative col-span-1 lg:col-span-2 overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img
                src={img}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-3xl font-bold mb-3 text-center">Discover Amazing Products</h2>
                <p className="text-base mb-4 text-center max-w-xl">Shop the latest trends and exclusive deals for every occasion.</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">Shop Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${current === idx ? "scale-150 bg-indigo-500" : "bg-opacity-50 hover:bg-opacity-75"}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Right: Two Small Banners */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-1/2 rounded-lg overflow-hidden shadow group">
          <img
            src={side1}
            alt="Side Banner 1"
            className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Amazing Deals
          </div>
        </div>
        <div className="relative w-full h-1/2 rounded-lg overflow-hidden shadow group">
          <img
            src={side2}
            alt="Side Banner 2"
            className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            New Arrivals
          </div>
        </div>
      </div>
    </section>
   
    </>
  
  );
}
