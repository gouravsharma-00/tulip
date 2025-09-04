import React from 'react'

export default function Footer() {
    return(
        <section className='w-full h-28 outline-1 outline-gray-400 flex'>
            <div className='w-full h-28 m-auto sm:max-w-lg md:max-w-4/5 outline-1 outline-gray-400 flex flex-col justify-center items-center text-center'>
                    <p className="text-gray-600 text-xs">© {new Date().getFullYear()} All rights reserved</p>
                    <p className="text-gray-700 text-md">
                        Made with ❤️ by <a href='https://www.github.com/gouravsharma-00' target='_blank' className="font-semibold">Gourav</a>
                    </p>
            </div>
        </section>
    )
}