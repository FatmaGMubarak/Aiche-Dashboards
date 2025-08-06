import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/reducers/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import { fetchCollectionById } from "../../store/reducers/collectionSlice";

export default function ProductCard() {
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id : collectionId} = useParams()
  const displayedProducts = collectionId ? collection?.products || [] : products || [];


  const [selectedIds, setSelectedIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  useEffect(() => {
  if (collectionId) {
    dispatch(fetchCollectionById(collectionId));
  } else {
    dispatch(fetchProducts());
  }
}, [collectionId]);


 const toggleSelection = (e, productId, productPrice) => {
  e.stopPropagation();
  console.log(typeof(totalPrice))
  setSelectedIds((prevSelected) => {
    const isSelected = prevSelected.includes(productId);

    if (isSelected) {
      setTotalPrice((prev) => prev - productPrice);
      return prevSelected.filter((id) => id !== productId);
    } else {
      setTotalPrice((prev) => +prev + +productPrice);
      return [...prevSelected, productId];
    }
  });
};

  const handleProceed = () => {
    if (selectedIds.length > 0) {
      nav("/collection-form", { state: { productId: selectedIds,
        totalPrice: totalPrice.toString()
       } });
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5 flex justify-center items-start">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-24 mx-auto py-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-y-3">
        {displayedProducts.map((product) => {
          const isSelected = selectedIds.includes(product.id);
          return (
            <div
              key={product.id}
              onClick={() => nav(`/product-detail/${product.id}`)}
              className={`w-full h-full flex flex-col justify-between hover:cursor-pointer bg-white border ${
                isSelected ? "border-blue-500" : "border-gray-200"
              } rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700`}
            >
              <div className="h-48 flex justify-center items-center p-5 sm:p-8">
                <img
                  src={product?.image}
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
                    rel="noreferrer"
                    className="text-sm font-medium text-customBlue5 hover:text-customBlue3 mt-1"
                  >
                    View Product
                  </a>
                </div>

                <button
                  onClick={(e) => toggleSelection(e, product?.id, product?.price)}
                  className={`mt-4 text-white ${
                    isSelected ? "bg-red-700" : "bg-customBlue3 hover:bg-customBlue2"
                  }  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2`}
                >
                  {isSelected ? "Remove from Collection" : "Add to Collection"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleProceed}
          disabled={selectedIds.length === 0}
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            selectedIds.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-customBlue3"
          }`}
        >
          Proceed with {selectedIds.length} selected
        </button>
      </div>
    </div>
  );
}
