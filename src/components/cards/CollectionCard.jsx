import img from '../../assets/block.png'
import { fetchCollections } from '../../store/reducers/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'




export default function CollectionCard() {
    const collections = useSelector((state)=>state.collection.collections)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchCollections())
    }, [dispatch])
  return (
    <div className='w-full  grid grid-cols-3 mx-auto px-24 gap-y-3'>
{collections.map((collection)=>{
    return (
                <div key={collection.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img
      className="p-8 rounded-t-lg"
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
    <div className="flex items-center justify-between">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">
        ${collection.total}
      </span>
      <a
        href="#"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View Products
      </a>
    </div>
  </div>
</div>
    )
})}

    </div>
  )
}
