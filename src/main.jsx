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
import BikeDetail from './component/DashBoard/UserDashBoard/BikeDetail.tsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Error from './pages/ErrorPage/Error.tsx'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute.tsx'
import ReturnBike from './component/DashBoard/AdminDashBoard/ReturnBike.tsx'
import SpinWheelComponent from './component/spin-while/SpinWheel.tsx'
import UserProfile from './assets/userProfile.tsx'
import Cart from './component/DashBoard/UserDashBoard/Cart.tsx'
import LineChart from './component/DashBoard/AdminDashBoard/LineChart.tsx'



const stripePromise = loadStripe('pk_test_51OEWQiI8i8m69lNjPL8a3QNQtS31dfaIR6lr00gHoVxSTvtZpjdNVv186ZG7pYGfTwqchyWoClqvbBLGmdzA4Oxr00lZCJmnc7');


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error />,
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
        path: '/all-bike',
        element: <BikeList />
      },
      {
        path: '/spin',
        element: <SpinWheelComponent />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/bikes/:_id',
        element: (
          <Elements stripe={stripePromise}>
            <BikeDetail />
          </Elements>
        )
      },
    ]
  },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute>
      <AdminDashBoard />
    </ProtectedRoute>,
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
        path: '/admin/dashboard/return',
        element: <ReturnBike />
      },
      {
        path: '/admin/dashboard/cart',
        element: <Cart />
      },
      {
        path: '/admin/dashboard/chart',
        element: <LineChart />
      },
      {
        path: '/admin/dashboard/coupon-management',
        element: <Coupon />
      }
    ]
  },
  {
    path: '/user/dashboard',
    element: <ProtectedRoute><UserDashBoard /></ProtectedRoute>,
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
        path: '/user/dashboard/test',
        element: <UserProfile />
      },
      {
        path: '/user/dashboard/cart',
        element: <Cart />
      },

      {
        path: '/user/dashboard/booking',
        element: (
          <Elements stripe={stripePromise}>
            <Booking />
          </Elements>
        )
      },
      {
        path: '/user/dashboard/bike-list',
        element: <BikeList />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <main className="dark:dark light:light text-foreground bg-background">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </main>
    </NextUIProvider>
  </StrictMode >,
)
