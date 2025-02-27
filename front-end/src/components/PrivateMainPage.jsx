import React from 'react'
import NavBar from './private/SideNavBar'

export default function PrivateMainPage({ children }) {
    
    return (
        <>
            <div className='grid grid-cols-12 h-[100vh]'>
                <div className='border-2 border-gray-100 w-[4rem] bg-gray-100'>
                    <NavBar />
                </div>
                <div className='col-span-11 overflow-y-auto'>

                    {children}
                </div>
            </div>
        </>
    )
}
