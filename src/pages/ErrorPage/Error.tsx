import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {


    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
        },
    };

    return (
        <div style={styles.container}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/">
                        <Button className='h-12' type="primary" size="large">
                            Back Home
                        </Button>
                    </Link>
                }
            />

        </div >
    );

};

export default Error;