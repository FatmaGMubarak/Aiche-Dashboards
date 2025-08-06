import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../store/reducers/adminSlice";
import { ThreeDot } from "react-loading-indicators";
import { ShoppingBag } from "lucide-react";

const OrderPage = () => {
  const orders = useSelector((state)=>state.admin.orders);
  const loading = useSelector((state)=>state.admin.loading);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getOrders())
  }, [dispatch])

      if(loading){
          return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center w-full gap-x-1 mb-5">
            <ShoppingBag size={30} />
                    <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    order.image ||
                    "https://via.placeholder.com/60x60.png?text=No+Image"
                  }
                  alt={order.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {order.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Order ID: #{order.id}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-600">
                  <span className="font-medium">Description: </span>
                  {order.description || "No description available."}
                </p>

                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Total: </span>
                  {order.total ? `$${order.total}` : "N/A"}
                </p>

                <div className="mt-3">
                  <span className="font-medium text-gray-700">Products:</span>
                  {order.products ? (
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {order.products.map((product, idx) => (
                        <li key={idx}>{product}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No products listed</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
