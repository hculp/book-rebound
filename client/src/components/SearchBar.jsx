import React from "react";

export default function SearchComponent() {
    return (
        <div className="flex items-center">
            <div className="flex border border-gray-200 rounded p-4 mt-2 ml-2">
                <input type="text" className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Search..." />
                <button className="text-white bg-forestfront-50 hover:bg-forestback-100 focus:ring-4 focus:outline-none focus:ring-bg-forestback-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-forestback-600 dark:hover:bg-forestback-700 dark:focus:ring-forestback-800">
                    Search
                </button>
            </div>
        </div>
    )
}