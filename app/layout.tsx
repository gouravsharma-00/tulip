import React from 'react'
import './globals.css'
/**
 * 
 * @param {{children} : {children: React.ReactNode}} param root children
 * @returns {JSX.Element} render Root Layout
 */
export default function RootLayout({children} : {children: React.ReactNode}) {
    return(
        <html lang='en'>
            <head>
                <link rel='canonical' href='/' />
                <link rel='icon' href='/icons/icon.png'/>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}