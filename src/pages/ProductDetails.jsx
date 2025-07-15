import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, deleteProduct } from "../store/reducers/productSlice";
import notify from "../hooks/Notifications";
import DeleteModal from "../components/confirm/DeleteModal";
import { ThreeDot } from "react-loading-indicators";

export default function ProductCard() {
  const nav = useNavigate()
  const {id} = useParams()
  const product = useSelector((state)=>state.product?.product)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.product.loading)

useEffect(()=>{
    if(id)
    {
        dispatch(fetchProductById(id))
    }
},[dispatch, id])
  useEffect(()=>{
    window.scrollTo(0,0)

  },[])

const handleDelete = () =>{
  setIsModalOpen(true)
}

const handleCancel = () =>{
  setIsModalOpen(false)
}

const handleConfirm = () =>{
  dispatch(deleteProduct(id))
  notify("You deleted this product successfully", "success")
  nav("/product-page")
}



  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
    <DeleteModal
    onCancel={handleCancel}
    onConfirm={handleConfirm}
    isOpen={isModalOpen}
    message="Are you sure you want to delete this product?"
    />
    <div className="flex w-full justify-center items-center min-h-screen pt-28">
        <div className="w-[70vw] sm:w-[50vw] h-[50vh]">
<div
  key={product.id}
  className="w-full h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
>
  
  <div className="h-48 flex justify-center items-center p-5 sm:p-8">
    <img
      src={product.image}
      alt={product.name}
      className="max-h-full max-w-full object-contain"
    />
  </div>

 
  <div className="px-5 pb-1 flex flex-col justify-between">
    <div className="flex flex-col justify-start items-center text-center">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate w-full">
        {product.name}
      </h1>
      <span className="text-base font-semibold text-gray-800 dark:text-white mt-1">
        ${product.price}
      </span>
      <p
        className="text-sm font-medium text-customBlue5 hover:text-customBlue3 mt-1"
      >
        {product.link}
      </p>
    </div>
  </div>
                <div className="flex justify-between items-center pb:0 lg:pb-5 px-10">
            <Link
          to={`/edit-product-form/${product?.id}`}
            className="flex items-center gap-2 px-7 py-1.5 bg-customBlue3 text-white font-semibold rounded-lg hover:bg-customBlue2 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <p>Edit</p>
            </Link>

            <button onClick={handleDelete}
             className="flex items-center gap-2 px-7 py-1.5 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-all ease-in-out duration-300 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <p>Delete</p>
            </button>
          </div>
</div>

        </div>
    </div>
    </>
  );
}
