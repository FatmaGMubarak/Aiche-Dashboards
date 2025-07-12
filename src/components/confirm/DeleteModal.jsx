export default function DeleteModal  ({ onConfirm, onCancel, message, isOpen }) {

if(!isOpen) return null;


  return (
    <>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1.5px] bg-black bg-opacity-50 ">
          <div className="bg-white p-10 rounded-lg shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-4 text-customBlue1">
              {message}
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

