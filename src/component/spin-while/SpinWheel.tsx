import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCouponCode } from '../../redux/feature/coupon/coupon'

const SpinWheelComponent = () => {
    const [visible, setVisible] = useState(false);
    const [couponCode, setCouponCodeState] = useState('');
    const [spinning, setSpinning] = useState(false);
    const dispatch = useDispatch();

    const segments = [
        { name: '10% Off', code: 'TAOSIF10' },
        { name: '20% Off', code: 'TAOSIF20' },
        { name: '30% Off', code: 'TAOSIF30' },
        // { name: '30% Off', code: 'TAOSIF30' },
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
            setSpinning(false);
        }, 2000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(couponCode);
    };


    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="relative h-72 w-72 mt-20 flex items-center justify-center cursor-pointer" onClick={handleSpin}>
                    <div
                        className={`relative w-full h-full rounded-full border-4 border-white overflow-hidden transition-transform duration-2000 ease-out ${spinning ? 'transform rotate-[1440deg]' : ''
                            }`}
                    >
                        {segments.map((segment, index) => (
                            <div
                                key={index}
                                className={`absolute w-1/2 h-1/2 top-1/2 left-1/2 origin-top-left text-center flex items-center justify-center font-bold text-white text-lg ${index === 0 ? 'bg-red-500 rotate-0' : index === 1 ? 'bg-pink-500 rotate-[120deg]' : 'bg-blue-500 rotate-[240deg]'
                                    }`}
                                style={{ transform: `rotate(${index * 120}deg) translate(-100%, -100%)` }}
                            >
                                {segment.name}
                            </div>
                        ))}
                    </div>
                </div>

                <Modal
                    title={<h2 className="text-2xl font-bold text-center">Congratulations!</h2>}
                    open={visible}
                    onCancel={() => setVisible(false)}
                    footer={[
                        <Button
                            key="copy"
                            onClick={copyToClipboard}
                            icon={<CopyOutlined />}
                            className="h-12 bg-green-500 text-white hover:bg-green-600"
                        >
                            Copy Code
                        </Button>,
                        <Button
                            key="close"
                            type="primary"
                            onClick={() => setVisible(false)}
                            className="h-12"
                        >
                            Close
                        </Button>,
                    ]}
                >
                    <div className="text-center text-lg">
                        <p>Your coupon code: <strong>{couponCode}</strong></p>
                    </div>
                </Modal>
                <div className="text-2xl font-bold mt-12 text-center">Spin the wheel and get an attractive Discount!</div>
            </div>
        </div>
    );
};

export default SpinWheelComponent;