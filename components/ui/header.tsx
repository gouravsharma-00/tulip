import React from 'react'
import { Icon } from '@constants/icon'
import { ZIP } from '@constants/zip'
export default function Header() {
    return(
        <section className='w-full h-28 outline-1 outline-gray-400  flex'>
            <div className='w-full m-auto h-28 sm:max-w-lg md:max-w-4/5 outline-1 outline-gray-400 flex justify-around items-center'>

                <div className="flex items-center space-x-3">
                    <img src={Icon.logo} alt="icon" className="h-10 w-10" />
                    <h1 className="text-xl font-bold text-gray-800">Tulip</h1>
                </div>


                <div className="flex items-center space-x-6">
                    <a
                    href={ZIP.URL}
                    download
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                    Download
                    </a>
                    <a
                    href="https://github.com/gouravsharma-00/tulip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                    GitHub
                    </a>
                </div>

            </div>
        </section>
    )
}