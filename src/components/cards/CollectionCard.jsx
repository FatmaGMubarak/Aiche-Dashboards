import img from '../../assets/block.png'
import { fetchCollections } from '../../store/reducers/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'




export default function CollectionCard() {
    const collections = useSelector((state)=>state.collection.collections)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchCollections())
    }, [dispatch])
  return (
    <div className='w-full grid grid-cols-3 px-2 sm:px-24 mx-auto gap-3 sm:gap-y-3'>
{collections.map((collection)=>{
    return (
                <div key={collection.id} className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img
      className="p-5 sm:p-8 rounded-t-lg"
      src={collection.image}
      alt="product image"
    />
  </a>
  <div className="px-5 pb-5">
    <a href="#">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{collection.name}</h1>
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {collection.description}
      </h5>
    </a>
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">
        ${collection.total}
      </span>
      <Link
        to={`/product-page`}
        className="text-white bg-customBlue3 hover:bg-customBlue2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View Products
      </Link>
    </div>
  </div>
</div>
    )
})}

    </div>

  )
}
