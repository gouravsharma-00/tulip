import React from 'react'
import { ZIP } from '@constants/zip'

export default function Download() {
    return(
        <div className="mt-16 w-full bg-green-200">
            <div className="flex justify-center items-center p-6 gap-8 flex-col">
                <h2 className="text-3xl font-bold text-gray-800">Try It for <span className='bg-black text-white rounded p-3'>Free</span></h2>
                <p className="text-gray-600 max-w-md">
                Experience all features without limits. Download now and start using our extension for free!
                </p>
                <a href={ZIP.URL} download className="px-8 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition">
                Download Now
                </a>
            </div>
        </div>

    )
}