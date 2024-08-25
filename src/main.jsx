import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './pages/Home/Home.tsx'
import About from './pages/About/About.tsx'
import Root from './Root/Root.tsx'
import { store } from './redux/store.ts'
import Login from './pages/Login/Login.tsx'
import Signup from './pages/signup/Signup.tsx'
import AdminDashBoard from './component/DashBoard/AdminDashBoard/AdminDashBoard.tsx'
import UserDashBoard from './component/DashBoard/UserDashBoard/UserDashBoard.tsx'
import Profile from './component/DashBoard/UserDashBoard/Profile.tsx'
import MyRental from './component/DashBoard/UserDashBoard/MyRental.tsx'
import BikeList from './component/DashBoard/UserDashBoard/BikeList.tsx'
import Booking from './component/DashBoard/UserDashBoard/Booking.tsx'
import AdminProfile from './component/DashBoard/AdminDashBoard/AdminProfile.tsx'
import BikeManagement from './component/DashBoard/AdminDashBoard/BikeManagement.tsx'
import UserManagement from './component/DashBoard/AdminDashBoard/UserManagement.tsx'
import Coupon from './component/DashBoard/AdminDashBoard/Coupon.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashBoard />,
    children: [
      {
        path: '/admin/dashboard/admin-profile',
        element: <AdminProfile />
      },
      {
        path: '/admin/dashboard/bike-management',
        element: <BikeManagement />
      },
      {
        path: '/admin/dashboard/user-management',
        element: <UserManagement />
      },
      {
        path: '/admin/dashboard/coupon-management',
        element: <Coupon />
      }
    ]
  },
  {
    path: '/user/dashboard',
    element: <UserDashBoard />,
    children: [
      {
        path: '/user/dashboard/profile',
        element: <Profile />
      },
      {
        path: '/user/dashboard/my-rental',
        element: <MyRental />
      },
      {
        path: '/user/dashboard/booking',
        element: <Booking />
      },
      {
        path: '/user/dashboard/bike-list',
        element: <BikeList />
      },
      {
        path: '/user/dashboard/manage-user',
        element: <UserManagement />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>
  </StrictMode>,
)
