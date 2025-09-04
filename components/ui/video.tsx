import React from 'react'

export default function Video() {
    return(
         <video
            className="w-4/5 h-auto rounded mt-5"
            src="/videos/sample.mkv"
            controls
            autoPlay
            muted
            loop
            playsInline
        >

        </video>
    )
}