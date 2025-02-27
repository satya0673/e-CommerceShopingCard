import React from 'react'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { MdCardTravel } from 'react-icons/md'
import { FaBowlFood } from 'react-icons/fa6'
import { IoBagAdd } from 'react-icons/io5'
import { IoMdLogOut } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextDetals'
import { dologout } from '../../auth/localstroage'
export default function NavBar() {


    const location = useLocation();
    const { user, setUser } = useAuth();

    const isActive = (path) => {

        if (path === location.pathname) {
            return true
        } else {
            return false
        }
    }

    const usenavigation = useNavigate();

    const userLogout = () => {

        dologout(() => {
            setUser(null)
            usenavigation("/")
        })
    }

    return (

        <>
            <div className='mt-10 flex flex-col justify-center items-center gap-9 text-2xl '>

                {
                    user?.userRole === 'Admin' ?
                        <>
                            <Link to='/private/admin/dashboard'>
                                <MdOutlineDashboardCustomize className={`cursor-pointer  w-7 h-7 ${isActive('/private/admin/dashboard') ? 'text-red-500' : 'text-primaryColor'}`} title='Dashboard' />
                            </Link>

                            <Link to='/private/admin/orderList'>
                                <MdCardTravel className={`cursor-pointer  w-7 h-7 ${isActive('/private/admin/orderList') ? 'text-red-500' : 'text-primaryColor'}`} title='List of order' />

                            </Link>

                            <Link to='/private/admin/addItem'>
                                <FaBowlFood className={`cursor-pointer  w-7 h-7 ${isActive('/private/admin/addItem') ? 'text-red-500' : 'text-primaryColor'}`} title='Add Item' />
                            </Link>

                            {/* <Link to='/private/admin/setting'>
                    <IoSettings className={`cursor-pointer  w-7 h-7 ${isActive('/private/admin/setting') ? 'text-red-500' : 'text-primaryColor'}`} title='Setting' />
                </Link> */}

                            <Link to='/private/admin/profile'>
                                <FaUserCircle className={`cursor-pointer  w-7 h-7 ${isActive('/private/admin/profile') ? 'text-red-500' : 'text-primaryColor'}`} title='Profile' />
                            </Link>
                        </>
                        :
                        <>
                            <Link to='/private/user/dashboard'>
                                <MdOutlineDashboardCustomize className={`cursor-pointer  w-7 h-7 ${isActive('/private/user/dashboard') ? 'text-red-500' : 'text-primaryColor'}`} title='Dashboard' />
                            </Link>

                            <Link to='/private/user/orderList'>
                                <MdCardTravel className={`cursor-pointer  w-7 h-7 ${isActive('/private/user/orderList') ? 'text-red-500' : 'text-primaryColor'}`} title='List of order' />

                            </Link>
                            <Link to='/private/user/addtocard'>
                                <IoBagAdd className={`cursor-pointer  w-7 h-7 ${isActive('/private/user/addtocard') ? 'text-red-500' : 'text-primaryColor'}`} title='List of order' />

                            </Link>
                            <Link to='/private/user/profile'>
                                <FaUserCircle className={`cursor-pointer  w-7 h-7 ${isActive('/private/user/profile') ? 'text-red-500' : 'text-primaryColor'}`} title='Add Item' />
                            </Link>

                        </>
                }


                <IoMdLogOut className={`cursor-pointer  w-7 h-7 text-primaryColor`} title='Logout' onClick={userLogout} />
            </div>
        </>
    )
}
