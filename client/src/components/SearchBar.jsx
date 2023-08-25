import React from "react";

export default function SearchComponent() {
    return (
        <div className="flex items-center">
            <div className="flex border border-purple-200 rounded p-4 mt-2 ml-2">
                <input type="text" className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Search..." />
                <button className="px-4 text-white bg-purple-600 border-1 rounded">
                    Search
                </button>
            </div>
        </div>
    )
}