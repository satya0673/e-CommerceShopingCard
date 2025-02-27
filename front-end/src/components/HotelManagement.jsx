import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './private/pages/DashBoard'
import ItemForm from './private/pages/ItemForm'
import Setting from './private/pages/Setting'
import Profile from './private/pages/Profile'
import LoginPage from './LoginPage'
import CreateAccount from './CreateAccount'
import OrderList from './private/pages/OrderList'
import { Toaster } from 'react-hot-toast'
import CheckUserLogin from './CheckUserLogin'
import UserDashBoard from './private/userpages/UserDashBoard'
import UserShowOrderList from './private/userpages/UserShowOrderList'
import UserProfile from './private/userpages/UserProfile'
import SingleItem from './private/userpages/SingleItem'
import UserAddToCard from './private/userpages/UserAddToCard'

export default function HotelManagement() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route Component={LoginPage} path='/' />
                <Route Component={CreateAccount} path='/createAccount' />

                <Route Component={CheckUserLogin} path='/private/admin'>
                    <Route Component={DashBoard} path='dashboard' />
                    <Route Component={OrderList} path='orderList' />
                    <Route Component={ItemForm} path='addItem' />
                    <Route Component={Setting} path='setting' />
                    <Route Component={Profile} path='profile' />
                </Route>


                <Route Component={CheckUserLogin} path='/private/user'>
                    <Route Component={UserDashBoard} path='dashboard' />
                    <Route Component={UserShowOrderList} path='orderList' />
                    <Route Component={UserAddToCard} path='addtocard' />
                    <Route Component={UserProfile} path='profile' />
                    <Route Component={SingleItem} path='item/:_id' />
                </Route>
            </Routes>


        </>

    )
}
