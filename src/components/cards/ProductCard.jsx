// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Link from '@mui/joy/Link';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Chip from '@mui/joy/Chip';
// import Typography from '@mui/joy/Typography';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/reducers/productSlice";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from 'react-loading-indicators';


export default function ProductCard() {
  const products = useSelector((state)=>state.product.products)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const loading = useSelector((state)=>state.product.loading)


  useEffect(()=>{
dispatch(fetchProducts())
  }, [dispatch])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5  flex justify-center items-start">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }


  return (
<div className='w-full grid grid-cols-4 px-2 sm:px-24 mx-auto gap-3 sm:gap-y-3 py-5'>
{products.map((product)=>{
    return (
<div
  key={product.id}
  onClick={()=>nav(`/product-detail/${product.id}`)}
  className="w-full h-full flex flex-col justify-between hover:cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700"
>
  
  <div className="h-48 flex justify-center items-center p-5 sm:p-8">
    <img
      src={product.image}
      alt={product.name}
      className="max-h-full max-w-full object-contain"
    />
  </div>

 
  <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
    <div className="flex flex-col justify-start items-center text-center min-h-[120px]">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate w-full">
        {product.name}
      </h1>
      <span className="text-base font-semibold text-gray-800 dark:text-white mt-1">
        ${product.price}
      </span>
      <a
        href={product.link}
        target="_blank"
        className="text-sm font-medium text-customBlue5 hover:text-customBlue3 mt-1"
      >
        View Product
      </a>
    </div>

    <button
      onClick={() => {
        nav("/collection-form", {state: {productId:product.id}})
      }}
      className="mt-4 text-white bg-customBlue3 hover:bg-customBlue2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Add to collection
    </button>
  </div>
</div>

    )
})}
</div>
  );
}
