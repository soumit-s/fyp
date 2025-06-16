"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProductCategories } from "@/lib/hooks";
import CategorySection from "@/components/common/CategorySection";
import { Input } from "@/components/ui/input";

const App: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const categories = useProductCategories();

  // const topFiltered = allCategories.filter((cat) =>
  //   cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="font-sans">
      {/* Header and Search */}
      <div className="mb-6 mt-4 flex">
        <input
          type="text"
          placeholder="Search for products to rent"
          className="py-3 text-md w-full outline-none ring-0  bg-neutral-100 rounded-l-lg px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="rounded-r-lg bg-primary text-white px-4">
          Search
        </button>
      </div>

      {/* Top Categories */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Browse our top categories
        </h2>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {topFiltered.length > 0 ? (
            topFiltered.map((cat) => (
              <div
                key={cat.id}
                className="border border-gray-300 rounded-xl p-5 flex flex-col items-center justify-between hover:shadow-md transition cursor-pointer"
                onClick={() => router.push(`/home/${cat.id}`)}
                role="button"
                tabIndex={0}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={cat.width}
                  height={cat.height}
                  className="mb-3"
                />
                <span className="text-center font-medium text-gray-800 min-h-[24px]">
                  {cat.name}
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No top categories found</span>
          )}
        </div> */}
        <CategorySection />
      </div>

      {/* Promo Banner */}
      <div className="mt-8 bg-black text-white rounded-xl flex flex-col md:flex-row items-center justify-between py-6 md:p-8 min-h-[180px] md:min-h-[220px] gap-4 overflow-hidden">
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            LIMITLESS
          </h2>
          <p className="text-xl md:text-3xl mt-1">Endless Options, One Rent!</p>
          <p className="mt-2 text-sm md:text-base text-gray-300">
            Starting from ₹999/month
          </p>
          <button className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 text-sm md:text-base rounded-full">
            Explore Limitless
          </button>
        </div>
        <div className="flex-1 h-full w-full rounded-xl overflow-hidden">
          <Image
            src="/banner.jpg"
            alt="Promo Devices"
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-white">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">
          There's more <br className="sm:hidden" /> to renting
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-4 items-start bg-white p-4 rounded-lg border border-neutral-100 bg-neutral-50 hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={benefit.icon}
                alt={benefit.title}
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;




// const allCategories = [
//   {
//     id: "smartphones",
//     name: "Smartphones",
//     image: "/phones.jpg",
//     width: 140,
//     height: 120,
//   },
//   {
//     id: "laptops",
//     name: "Laptops",
//     image: "/laptop.jpg",
//     width: 200,
//     height: 200,
//   },
//   {
//     id: "smartwatches",
//     name: "Smartwatches",
//     image: "/watches.webp",
//     width: 150,
//     height: 100,
//   },
//   {
//     id: "gamepad",
//     name: "Gamepad",
//     image: "/pads.webp",
//     width: 200,
//     height: 200,
//   },
//   {
//     id: "cameras",
//     name: "Cameras",
//     image: "/cameras.jpg",
//     width: 400,
//     height: 600,
//   },
//   {
//     id: "speakers",
//     name: "Speakers",
//     image: "/speaker.jpg",
//     width: 200,
//     height: 350,
//   },
// ];

const benefits = [
  {
    icon: "/medal-quality-svgrepo-com.svg",
    title: "Finest-quality products",
    description: "Strict quality checks for every product.",
  },
  {
    icon: "/location-pin-svgrepo-com.svg",
    title: "Free relocation",
    description: "We’ll relocate your rented products for free.",
  },
  {
    icon: "/maintenance-repair-construction-svgrepo-com.svg",
    title: "Free maintenance",
    description: "We keep your rented items in great condition.",
  },
  {
    icon: "/cancel-svgrepo-com.svg",
    title: "Cancel anytime",
    description: "Pay only for what you use. Cancel anytime.",
  },
  {
    icon: "/return-svgrepo-com.svg",
    title: "Easy return on delivery",
    description: "Return on delivery if not satisfied—no questions asked.",
  },
  {
    icon: "/upgrade-svgrepo-com.svg",
    title: "Keep upgrading",
    description: "Switch to newer designs anytime.",
  },
];
