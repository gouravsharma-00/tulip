import React from 'react'
import { Icon } from '@constants/icon'
/**
 * 
 * @returns { JSX.Element } renders the root page
 */
export default async function RootPage() {
    
    return(
        <main className='w-full min-h-screen '>
            <section className='w-full h-28 outline-1 outline-gray-400  flex'>
                <div className='w-full m-auto h-28 sm:max-w-lg md:max-w-4/5 outline-1 outline-gray-400'></div>
            </section>
            <section 
            className='p-3 gap-4 w-full m-auto min-h-screen sm:max-w-lg md:max-w-4/5 outline-1 outline-gray-400 flex justify-center items-center flex-col'>
            <div className='flex justify-center items-center flex-col gap-5'>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                    Crack Every NPTEL Quiz 🚀
                </h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-xl">
                    Struggling with NPTEL quizzes? Our extension helps you 
                    <span className="font-semibold text-blue-600"> find answers instantly, save time, </span> 
                    and focus on learning smarter.
                </p>
            </div>
            
            <video
                className="w-4/5 h-auto rounded-lg shadow-lg"
                src="/videos/sample.mkv"
                controls
                autoPlay
                muted
                loop
                playsInline
            >

            </video>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
      Why Use Our Extension?
    </h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      Unlock smarter learning with features designed to help you 
      <span className="font-semibold text-blue-600">ace every NPTEL quiz</span>.
    </p>

    {/* <!-- Benefits Grid --> */}
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-12">

      {/* <!-- Benefit 1 --> */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <img src="/images/fast-search.png" alt="Instant Answers" className="w-16 h-16" />
        <h3 className="text-xl font-semibold text-gray-800">Instant Answers</h3>
        <p className="text-gray-600">Get quiz solutions in seconds, saving you valuable time.</p>
      </div>

      {/* <!-- Benefit 2 --> */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <img src="/images/easy-ui.png" alt="Easy to Use" className="w-16 h-16" />
        <h3 className="text-xl font-semibold text-gray-800">Easy to Use</h3>
        <p className="text-gray-600">Simple, clean, and distraction-free interface for smooth navigation.</p>
      </div>

      {/* <!-- Benefit 3 --> */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <img src="/images/accuracy.png" alt="High Accuracy" className="w-16 h-16" />
        <h3 className="text-xl font-semibold text-gray-800">High Accuracy</h3>
        <p className="text-gray-600">Our AI ensures you get the most accurate and reliable results.</p>
      </div>

      {/* <!-- Benefit 4 --> */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <img src="/images/secure.png" alt="Safe & Secure" className="w-16 h-16" />
        <h3 className="text-xl font-semibold text-gray-800">Safe & Secure</h3>
        <p className="text-gray-600">Your data stays private with industry-level security.</p>
      </div>
{/* 
      <!-- Benefit 5 --> */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <img src="/images/support.png" alt="24/7 Support" className="w-16 h-16" />
        <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
        <p className="text-gray-600">We’re always here to help you with any questions or issues.</p>
      </div>

      {/* <!-- Benefit 6 --> */}
      <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <img src="/images/free.png" alt="Free to Use" className="w-16 h-16" />
        <h3 className="text-xl font-semibold text-gray-800">Free Forever</h3>
        <p className="text-gray-600">Enjoy all features at no cost—completely free for students.</p>
      </div>
      </div>
            </section>
            <section className='w-full h-28 outline-1 outline-gray-400 flex'>
                <div className='w-full h-28 m-auto sm:max-w-lg md:max-w-4/5 outline-1 outline-gray-400'></div>
            </section>

        </main>
    )
}