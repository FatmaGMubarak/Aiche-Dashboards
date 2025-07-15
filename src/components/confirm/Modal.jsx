
"use client";

import { Button, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Modal({ heading, message, onConfirm, onCancel, isOpen }) {
    if(!isOpen) return null;

  return (
       <div className="w-full min-h-screen fixed inset-0 flex flex-col justify-center items-center z-50 bg-black bg-opacity-50  text-center">
            <div className="bg-white w-[70%] sm:w-[30%] p-6 rounded-lg">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {heading}
            </h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-center gap-4 ">
              <Button className="bg-customBlue3 hover:bg-customBlue2" onClick={onConfirm}>
                Logout
              </Button>
              <Button className="border-customBlue3 text-customBlue3 hover:bg-gray-100" onClick={onCancel}>
                Cancel
              </Button>
            </div>
            </div>
          </div>
  );
}
