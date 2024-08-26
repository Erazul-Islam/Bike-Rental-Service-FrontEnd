import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllBikesQuery } from '../../../redux/feature/Enpoints/Enpoints';
import { TBike } from '../../../utils/global';
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FaCcDinersClub } from "react-icons/fa";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdOutlineModelTraining } from "react-icons/md";
import { TbBrandAdobe } from "react-icons/tb";
import { Button } from 'antd';

const BikeDetail = () => {

    const { _id } = useParams()
    const { data } = useGetAllBikesQuery({})

    const [product, setProduct] = useState<TBike>()
    console.log(product)

    useEffect(() => {
        const findProduct = data?.data?.find((product: { _id: string | undefined; }) => product._id === _id)
        setProduct(findProduct)
    }, [_id, data])

    return (
        <div className=' bg-black h-screen'>
            <div >
                <h1 className='pt-3 pl-4 text-left'>Name: {product?.name}</h1>
                <img className='' src={product?.image} alt="" />
                <div className='flex gap-12 pl-8 pr-8 pt-4'>
                    <div>
                        <div className='flex gap-2'>
                            <h1 className='text-red-600 text-2xl'><RiMotorbikeFill /> </h1>
                            <h2 className="text-white">{product?.name}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><FaCcDinersClub /> </h1>
                            <h2 className="text-white">{product?.cc}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><GiCalendarHalfYear /> </h1>
                            <h2 className="text-white">{product?.year}</h2>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-2'>
                            <h1 className='text-red-600 text-2xl'><MdOutlinePriceCheck /> </h1>
                            <h2 className="text-white">{product?.pricePerHour}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><MdOutlineModelTraining /> </h1>
                            <h2 className="text-white">{product?.model}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><TbBrandAdobe /> </h1>
                            <h2 className="text-white">{product?.brand}</h2>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    {product?.description}
                    <div className='text-center'><Button className='h-12 '>Book Now</Button></div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetail;