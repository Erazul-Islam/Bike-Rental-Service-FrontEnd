import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCouponCode } from '../../redux/feature/coupon/coupon'
import Confetti from 'react-confetti';

const SpinWheelComponent = () => {
    const [visible, setVisible] = useState(false);
    const [couponCode, setCouponCodeState] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    const dispatch = useDispatch();

    const segments = [
        { name: '10% Off', code: 'TAOSIF10' },
        { name: '20% Off', code: 'TAOSIF20' },
        { name: '30% Off', code: 'TAOSIF30' },

    ];

    const handleSpin = () => {
        if (spinning) return;
        setSpinning(true);
        const randomIndex = Math.floor(Math.random() * segments.length);
        const selectedSegment = segments[randomIndex];

        setTimeout(() => {
            setCouponCodeState(selectedSegment.code);
            dispatch(setCouponCode(selectedSegment.code));
            setVisible(true);
            setCelebrate(true)
            setSpinning(false);
        }, 2000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(couponCode);
    };

    const closeModal = () => {
        setVisible(false);
        setCelebrate(false);
    };

    return (
        <div className="flex flex-col items-center">
            {celebrate && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            {/* Arrow Indicator */}
            <div className="relative flex items-center justify-center mt-8">
                <div className="absolute top-[-10px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-red-500"></div>
            </div>

            {/* Spin Wheel */}
            <div className="relative h-72 w-72 mt-8 flex items-center justify-center cursor-pointer" onClick={handleSpin}>
                <div
                    className={`relative w-full h-full rounded-full border-8 border-white shadow-lg overflow-hidden transition-transform duration-[2s] ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)] ${
                        spinning ? 'transform rotate-[1440deg]' : ''
                    } ${!spinning && couponCode ? 'ring-4 ring-yellow-500 ring-opacity-50' : ''}`}
                >
                    {segments.map((segment, index) => (
                        <div
                            key={index}
                            className={`absolute w-1/2 h-1/2 top-1/2 left-1/2 origin-top-left text-center flex items-center justify-center font-bold text-white text-lg ${
                                index === 0
                                    ? 'bg-red-500 rotate-0'
                                    : index === 1
                                    ? 'bg-purple-500 rotate-[120deg]'
                                    : 'bg-blue-500 rotate-[240deg]'
                            }`}
                            style={{ transform: `rotate(${index * 120}deg) translate(-100%, -100%)` }}
                        >
                            {segment.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal
                title={<h2 className="text-2xl font-bold text-center">Congratulations!</h2>}
                open={visible}
                onCancel={closeModal}
                footer={[
                    <Button
                        key="copy"
                        onClick={copyToClipboard}
                        icon={<CopyOutlined />}
                        style={{backgroundColor:'purple'}}
                        className="h-12 bg-green-500 text-white hover:bg-green-600"
                    >
                         Copy Code
                    </Button>,
                    <Button key="close" style={{backgroundColor:'green'}} type="primary" onClick={closeModal} className="h-12">
                        Close
                    </Button>,
                ]}
            >
                <div className="text-center text-lg">
                    <div>Your coupon code: <strong className='text-pink-600'>{couponCode}</strong></div>
                </div>
            </Modal>

            {/* Spin Button */}
            <button
                className="mt-8 bg-pink-700 text-white text-xl font-bold py-2 px-6 rounded-sm shadow-md hover:bg-red-600 focus:outline-none"
                onClick={handleSpin}
            >
                Spin the Wheel
            </button>

            <div className="text-2xl font-bold mt-12 text-center">
                Spin the wheel and get an attractive Discount!
            </div>
        </div>
    );
};

export default SpinWheelComponent;