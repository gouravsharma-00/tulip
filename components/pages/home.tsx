import React from 'react'
import Feature from '@components/ui/feature'
import Download from '@components/ui/download'
import Header from '@components/ui/header'
import Footer from '@components/ui/footer'
import Video from '@components/ui/video'

/**
 * 
 * @returns { JSX.Element } renders the home page
 */
export default async function Home() {
    
    return(
        <main className='w-full min-h-screen '>
            <Header />
            <section className='p-3 gap-4 w-full m-auto min-h-screen sm:max-w-lg md:max-w-4/5 outline-1 outline-gray-400 flex justify-center items-center flex-col'>
              <div className='flex justify-center items-center flex-col gap-5 mt-7'>
                  <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900">
                      Crack Every NPTEL Quiz 🚀
                  </h1>
                  <p className="text-gray-600 text-lg sm:text-xl max-w-xl">
                      Struggling with NPTEL quizzes? Our extension helps you 
                      <span className="font-semibold text-blue-600"> find answers instantly, save time, </span> 
                      and focus on learning smarter.
                  </p>
              </div>
              <Video />
           
              <div className='flex justify-center items-center flex-col gap-2 mt-12'>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                    Why Use Our Extension?
                  </h2>
                  <p className="text-gray-600 text-lg max-w-xl mx-auto text-center ">
                    Unlock smarter learning with features designed to help you 
                    <span className="font-semibold text-blue-600"> ace every NPTEL quiz</span>.
                  </p>  
              </div>
              <Feature />
              <Download />

            </section>
            <Footer />

        </main>
    )
}