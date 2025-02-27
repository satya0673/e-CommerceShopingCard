import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { isloggedin } from '../auth/localstroage'

export default function CheckUserLogin() {
    return (
        <>
            {
                isloggedin() ? <Outlet /> : <Navigate to="/" />
            }
        </>
    )
}