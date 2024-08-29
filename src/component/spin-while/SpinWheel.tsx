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
        { name: '10% Off', code: 'DISCOUNT10' },
        { name: '20% Off', code: 'DISCOUNT20' },
        { name: '30% Off', code: 'DISCOUNT30' },
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
        <div className="spin-wheel-container">
            <div className={`spin-wheel ${spinning ? 'spinning' : ''}`} onClick={handleSpin}>
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
                    <Button key="copy" onClick={copyToClipboard}>
                        Copy <CopyOutlined />
                    </Button>,
                    <Button key="close" type="primary" onClick={() => setVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                <p>Your coupon code: {couponCode}</p>
            </Modal>
        </div>
    );
};

export default SpinWheelComponent;
