import React, { useEffect, useState } from 'react';
import { useAddToCartMutation, useGetAllBikesQuery } from '../../../redux/feature/Enpoints/Enpoints';
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FaCcDinersClub } from "react-icons/fa";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdOutlineModelTraining } from "react-icons/md";
import { TbBrandAdobe } from "react-icons/tb";
import { Button, Checkbox, Modal, Select } from 'antd';
import { TBike } from '../../../utils/global';
import { Spinner } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Swal from 'sweetalert2';

const BikeList = () => {

    const { data, refetch } = useGetAllBikesQuery(null)
    const { Option } = Select;
    const [filters, setFilters] = useState({ brand: '', model: '', isAvailable: '' });
    const [filteredProducts, setFilteredProducts] = useState(data?.data);
    const [loading, setLoading] = useState(true);
    const [selectedBike, setSelectedBike] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [addToCart] = useAddToCartMutation()

    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            let filtered = data?.data
                .filter((product: TBike) => (filters.brand ? product.brand === filters.brand : true))
                .filter((product: TBike) => (filters.model ? product.model === filters.model : true))
            setFilteredProducts(filtered);
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [data, filters]);

    const handleFilterChange = (name: string, value: string) => {
        setFilters({ ...filters, [name]: value });
    };

    const clearFilters = () => {
        setFilters({ brand: '', model: '', isAvailable: '' });
    };

    const handleCheckBoxChange = (bike) => {
        setSelectedBike((prevSelected: any) => {
            if (prevSelected.includes(bike)) {
                return prevSelected.filter((item) => item !== bike)
            } else {
                return [...prevSelected, bike]
            }
        })
    }

    const handleCompare = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddTocart = async (bikeId: string) => {
        try {
            await addToCart({ bikeId, cartData: {} }).unwrap();
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: 'Product added successfully',
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create product',
            });
        }
    }

    return (
        <div className='mb-12 '>
            <div className='justify-center'>
                <div className='flex items-center justify-center  ' style={{ marginBottom: 20 }}>
                    <Select
                        placeholder="Select Category"
                        onChange={(value) => handleFilterChange('model', value)}
                        value={filters.brand}
                        style={{ width: 150, marginRight: 10, height: 48 }}
                    >
                        <Option value="">Model</Option>
                        <Option value="Xixer">Xixer</Option>
                        <Option value="MT 15">MT15</Option>
                        <Option value="MT 14">MT14</Option>
                    </Select>
                    <Select
                        placeholder="Select Brand"
                        onChange={(value) => handleFilterChange('brand', value)}
                        value={filters.model}
                        style={{ width: 150, marginRight: 10, height: 48 }}
                    >
                        <Option value="">Brand</Option>
                        <Option value="Suzuki">Suzuki</Option>
                        <Option value="Yamaha">Yamaha</Option>
                        <Option value="Honda">Honda</Option>
                        <Option value="Platina">Platina</Option>
                    </Select>
                    <button className='pb-4 mt-5 text-white border-none rounded-sm bg-pink-700 h-12' onClick={clearFilters}>Clear Filters</button>
                    <button className='pb-4 mt-5 text bg-red-700 border-none rounded-sm text-white ml-4 h-12' onClick={handleCompare} disabled={selectedBike.length < 2}>
                        Compare ({selectedBike.length})
                    </button>
                </div>
                <h1 className='text-center text-green-400 text-3xl'>Select at least two to compare</h1>
            </div>

            {
                loading ? <div className='flex  justify-center items-center h-screen'><Spinner></Spinner></div> : <div className='grid grid-cols-1 md:grid-cols-2 mr-12 lg:grid-cols-3 gap-14 lg:ml-40'>
                    {
                        filteredProducts?.map(one => (<motion.div key={one._id} className='h-[550px] border mt-4 shadow-lg w-96 dark:dark light:light'>
                            <div className='flex justify-between'>
                                <div className='pt-3 pl-4  text-left'>Name: {one.name}</div>
                                <div className='pt-3 pr-4  text-center'> {one.isAvailable === true ? 'Available' : 'Unavailable'}</div>
                            </div>
                            <img className='pl-14 h-64' src={one.image} alt="" />
                            <div className='flex justify-between pl-8 pr-8 pt-4'>
                                <div>
                                    <div className='flex gap-2'>
                                        <div className='text-red-600 text-2xl'><RiMotorbikeFill /> </div>
                                            <h2 className="dark:text-white">{one.name}</h2> <br />
                                    </div>
                                    <div className='flex mt-4 gap-2'>
                                        <div className='text-red-600 text-2xl'><FaCcDinersClub /> </div>
                                        <h2 className="dark:text-white">{one.cc}</h2>
                                    </div>
                                    <div className='flex mt-4 gap-2'>
                                        <div className='text-red-600 text-2xl'><GiCalendarHalfYear /> </div>
                                        <h2 className="dark:text-white">{one.year}</h2>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex gap-2'>
                                        <div className='text-red-600 text-2xl'><MdOutlinePriceCheck /> </div>
                                        <h2 className="dark:text-white">{one.pricePerHour}</h2>
                                    </div>
                                    <div className='flex mt-4 gap-2'>
                                        <div className='text-red-600 text-2xl'><MdOutlineModelTraining /> </div>
                                        <h2 className="dark:text-white">{one.model}</h2>
                                    </div>
                                    <div className='flex mt-4 gap-2'>
                                        <div className='text-red-600 text-2xl'><TbBrandAdobe /> </div>
                                        <h2 className="dark:text-white">{one.brand}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between pl-6 pr-6 '>
                                <Link to={`/bikes/${one._id}`} > <button className='pb-4 text-white border-none rounded-sm  bg-pink-700 h-12'> View Detail</button></Link>
                                <Checkbox onChange={() => handleCheckBoxChange(one)} checked={selectedBike.includes(one)}>
                                </Checkbox>
                                <button onClick={() => handleAddTocart(one._id)} className=' rounded-sm pb-4 border-none text-white bg-pink-700 h-12'>Add to Cart</button>

                            </div>
                        </ motion.div>))
                    }
                </div>
            }
            <Modal
                title="Bike Comparison"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <div className='flex justify-around'>
                    {selectedBike.map((bike: TBike) => (
                        <div key={bike?._id} className='border p-4'>
                            <h2 className='text-orange-500'>{bike.name}</h2>
                            <img src={bike.image} alt={bike.name} className='h-40' />
                            <div className='text-orange-500'>Brand: {bike.brand}</div>
                            <div className='text-orange-500'>Model: {bike.model}</div>
                            <div className='text-orange-500'>CC: {bike.cc}</div>
                            <div className='text-orange-500'>Year: {bike.year}</div>
                            <div className='text-orange-500'>Price per Hour: {bike.pricePerHour}</div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default BikeList;