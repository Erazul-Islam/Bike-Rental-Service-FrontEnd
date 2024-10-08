import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { useLoginMutation } from '../../redux/feature/auth/authApi';
import { FieldValues, useForm } from "react-hook-form"
import "./Style.css"
import Swal from 'sweetalert2';
import { setUser } from '../../redux/feature/auth/authSlice';
import { Button, Input } from '@nextui-org/react';

type Inputs = {
    email: string
    password: string
}

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm();

    const [login] = useLoginMutation()

    const onSubmit = async (data: FieldValues) => {
        console.log(data)

        try {
            const userInfo = {
                email: data.email,
                password: data.password
            }
            const res = await login(userInfo).unwrap()
            console.log(res)
            const { token, data: user } = res
            dispatch(setUser({ user: res.data, token: res.token }))
            Swal.fire({
                title: "Good job!",
                text: "Login Successfully",
                icon: "success"
            });
            if (user.role === 'admin') {
                navigate('/admin/dashboard/admin-profile');
            } else {
                navigate('/user/dashboard/profile');
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }

    }

    return (
        <div className="dark h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    className="w-64 text-orange-500"
                    placeholder="Email"
                    type="email"
                    {...register('email', { required: true })}
                />
                <input
                    className="w-64 text-orange-500"
                    placeholder="Password"
                    type="password"
                    {...register('password', { required: true })}
                />
                <Button type="submit" color="secondary">
                    Login
                </Button>
                <div>
                    Don't you have account ? <br />

                    <Link className='text-red-600' to='/signup'>Create Account</Link>

                </div>
            </form>
        </div>
    );
}

export default Login