import React from 'react';
import { useDeletecartMutation, useGetCartQuery } from '../../../redux/feature/Enpoints/Enpoints';
import { useAppSelector } from '../../../redux/hook';
import { RiMotorbikeFill } from 'react-icons/ri';
import { FaCcDinersClub } from 'react-icons/fa';
import { GiCalendarHalfYear } from 'react-icons/gi';
import { MdOutlineModelTraining, MdOutlinePriceCheck } from 'react-icons/md';
import { TbBrandAdobe } from 'react-icons/tb';
import Swal from 'sweetalert2';

const Cart = () => {
    const token = useAppSelector(state => state.auth.token)
    const { data,refetch } = useGetCartQuery(token as string)
    const [deleteCart] = useDeletecartMutation()

    const cart = data?.data

    const handleDelete = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteCart(_id).unwrap()
                    cart.filter(item => item._id !== _id)
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "You successfully delete the product",
                        icon: "success"
                    });
                    
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }


    return (
        <div className='   grid grid-cols-1 md:grid-cols-2 mr-12 lg:grid-cols-3 gap-14 lg:ml-32'>
            {
                cart?.map(one => (<div key={one._id} className='h-[550px] border shadow-lg w-96 dark:dark light:light'>
                    {/* <h1 className='pt-3 pl-4 text-cyan-500 text-left'>Name: {one.name}</h1> */}
                    <img className='pl-14 h-64' src={one.image} alt="" />
                    <div className='flex justify-between pl-8 pr-8 pt-4'>
                        <div>
                            <div className='flex gap-2'>
                                <h1 className='text-red-600 text-2xl'><RiMotorbikeFill /> </h1>
                                <h2 className="dark:text-white">{one.name}</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><FaCcDinersClub /> </h1>
                                <h2 className="dark:text-white">{one.cc}</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><GiCalendarHalfYear /> </h1>
                                <h2 className="dark:text-white">{one.year}</h2>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2'>
                                <h1 className='text-red-600 text-2xl'><MdOutlinePriceCheck /> </h1>
                                <h2 className="dark:text-white">{one.pricePerHour}</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><MdOutlineModelTraining /> </h1>
                                <h2 className="dark:text-white">{one.model}</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><TbBrandAdobe /> </h1>
                                <h2 className="dark:text-white">{one.brand}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'> <button className='pt-2 pb-2 rounded-sm bg-purple-700 text-white' onClick={() => handleDelete(one._id)}>Delete</button> </div>
                </ div>))
            }
        </div>
    );
};

export default Cart;