import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, deleteProduct } from "../store/reducers/productSlice";
import notify from "../hooks/Notifications";
import DeleteModal from "../components/confirm/DeleteModal";
import { ThreeDot } from "react-loading-indicators";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";

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
        <div className="w-[90vw] sm:w-[50vw] h-[60vh] sm:h-[50vh]">
<div
  key={product?.id}
  className="w-full h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
>
  
  <div className="h-48 flex justify-center items-center p-5 sm:p-8">
    <img
      src={product?.image}
      alt={product?.name}
      className="max-h-full max-w-full object-contain"
    />
  </div>

 
  <div className="px-5 pb-1 flex flex-col justify-between">
    <div className="flex flex-col justify-start items-center text-center">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate w-full">
        {product?.name}
      </h1>
      <span className="text-base font-semibold text-gray-800 dark:text-white mt-1">
        ${product?.price}
      </span>
      <p
        className="text-sm font-medium text-customBlue5 hover:text-customBlue3 mt-1"
      >
        {product?.link}
      </p>
    </div>
  </div>
                <div className="flex justify-between items-center pb-2 lg:pb-5 px-10">
            <Link
          to={`/edit-product-form/${product?.id}`}
            className="flex items-center gap-2 px-7 py-1.5 bg-customBlue3 text-white font-semibold rounded-lg hover:bg-customBlue2 transition-all duration-300">
              <MdOutlineModeEdit className="text-lg" />
              <span>Edit</span>
            </Link>

            <button onClick={handleDelete}
             className="flex items-center gap-2 px-7 py-1.5 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-all ease-in-out duration-300 ml-4">
                <IoTrashBin className="text-lg" />
              <span>Delete</span>
            </button>
          </div>
</div>

        </div>
    </div>
    </>
  );
}
