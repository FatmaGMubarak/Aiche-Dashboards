import { Link } from 'react-router-dom';
import { useState } from 'react';
import cover from '../assets/group-students-posing-with-notepads.jpg';
import ProductCard from '../components/cards/ProductCard';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';


export default function ProductPage() {
  const [sortOrder, setSortOrder] = useState('asc');
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full mt-5">
          <img
            src={cover}
            alt=""
            className="object-cover w-[99%] h-[50vh] mx-auto rounded-lg"
          />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center sm:justify-between items-center relative">
          <div className="flex justify-center items-center w-full mx-auto">
            <h1 className="text-3xl text-customBlue1 text-center mb-5">
              Our Products
            </h1>
          </div>

<div className="flex flex-col justify-center sm:justify-between items-center sm:absolute sm:right-10 sm:mt-12 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row">
  <Link
    to="/product-form"
    className="flex items-center gap-2 text-white bg-customBlue3 hover:bg-customBlue2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    <span>Add Product</span>
  </Link>

  <Link
    to="/cart"
    className="flex items-center gap-2 text-white bg-customBlue3 hover:bg-customBlue2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    <ShoppingCartIcon className="w-5 h-5" />
    <span>Cart</span>
  </Link>
</div>

        </div>

        <hr className="border-t-2 border-double border-gray-400 my-12 w-[80%] mx-auto" />

        <div className='w-full'>
          <ProductCard sortOrder={sortOrder} />
        </div>
      </div>
    </>
  );
}
