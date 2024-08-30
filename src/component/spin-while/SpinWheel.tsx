import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCouponCode } from '../../redux/feature/coupon/coupon'
import './SpinWheelComponentCss.css'

const SpinWheelComponent = () => {
    const [visible, setVisible] = useState(false);
    const [couponCode, setCouponCodeState] = useState('');
    const [spinning, setSpinning] = useState(false);
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

        // Simulate spin duration
        setTimeout(() => {
            setCouponCodeState(selectedSegment.code);
            dispatch(setCouponCode(selectedSegment.code)); // Save the coupon code to Redux
            setVisible(true);
            setSpinning(false);
        }, 2000); // Adjust the spin duration
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(couponCode);
    };


    return (
        <div>
            <div className="spin-wheel-container">
                <div className={` mt-20 spin-wheel ${spinning ? 'spinning' : ''}`} onClick={handleSpin}>
                    {segments.map((segment, index) => (
                        <div key={index} className="segment">
                            {segment.name}
                        </div>
                    ))}
                </div>
                <Modal
                    title="Congratulations!"
                    open={visible}
                    onCancel={() => setVisible(false)}
                    footer={[
                        <Button className='h-12 ' key="copy" onClick={copyToClipboard}>
                            Copy <CopyOutlined />
                        </Button>,
                        <Button className='h-12 ' key="close" type="primary" onClick={() => setVisible(false)}>
                            Close
                        </Button>,
                    ]}
                >
                    <div>Your coupon code: {couponCode}</div>
                </Modal>
            </div>
            <h1 className='text-2xl font-bold mt-12 text-orange-400  '>Spin the wheel and get attractive Discount</h1>
        </div>
    );
};

export default SpinWheelComponent;