import React from 'react'
import { Img } from '@constants/image'

export default function Feature(){
    return(
        <div className="space-y-12 mt-12">

            <div 
            className="flex justify-center items-center gap-9 flex-row wrap">
                <img src={Img.instand} alt="Instant Answers" className="w-58 h-58 mx-auto md:mx-0" />
                <div className="text-center md:text-left space-y-3 max-w-84">
                    <h3 className="text-2xl font-semibold text-gray-800">Instant & Accurate</h3>
                    <p className="text-gray-600">
                    Get quiz solutions in seconds with high accuracy. Save valuable time while ensuring reliable results.
                    </p>
                </div>
            </div>
            
            <div 
            className="flex justify-center items-center gap-9">
                <div className="text-center md:text-left space-y-3 max-w-84">
                    <h3 className="text-2xl font-semibold text-gray-800">Always There for You</h3>
                    <p className="text-gray-600">
                    Get 24/7 support whenever you need help. Plus, enjoy all features completely free—forever!
                    </p>
                </div>
                <img src={Img.support} alt="Instant Answers" className="w-58 h-58 mx-auto md:mx-0 " />

            </div>
              
        </div>
    )
}