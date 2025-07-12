import { useState } from "react"
export default function MoreLessBtns() {
    const [visible, setVisible] = useState(9)
    const handleViewMore = () =>{
        setVisible((prev)=>prev + 9)
    }
    const handleViewLess = () =>{
        setVisible((prev)=>prev > 9 ?prev - 9 :prev)
    }
  return (
    <>
<div className="flex justify-between items-center w-full space-x-5">
{visible < blog.length && (
<div className="text-center mt-5">
<button onClick={handleViewMore} className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
    Load More
</button>
</div>

)}
{visible > 9 && (
<div className="text-center mt-5">
<button onClick={handleViewLess} className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
    Load Less
</button>
</div>

)}
</div>
    </>
  )
}
