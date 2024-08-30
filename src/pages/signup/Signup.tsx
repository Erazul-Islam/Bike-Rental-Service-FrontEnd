import React from 'react';
import BikeForm from '../../component/Form/BikeForm';
import { Button, Input } from '@nextui-org/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TUser } from '../../redux/feature/auth/authSlice';
import Swal from 'sweetalert2';
import { useSignupMutation } from '../../redux/feature/auth/authSignup';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()

    const [signup] = useSignupMutation()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        console.log(data)

        try {
            const userInfo = {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                address: data.address,
                role: 'user',
            }
            const res = await signup(userInfo).unwrap()
            console.log(res.data)


            Swal.fire({
                title: "Good job!",
                text: "Sign up Successfully",
                icon: "success"
            });

            navigate('/login')
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }

    }

    return (
        <div>
            <div className="dark h-screen flex items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        className="w-full text-orange-500"
                        placeholder="Email"
                        type="email"
                        {...register('email', { required: true })}
                    />
                    <input
                        className="w-full text-orange-500"
                        placeholder="Name"
                        type="text"
                        {...register('name', { required: true })}
                    />
                    <input
                        className="w-full text-orange-500"
                        placeholder="Password"
                        type="password"
                        {...register('password', { required: true })}
                    />
                    <input
                        className="w-full text-orange-500"
                        placeholder="Phone"
                        type="text"
                        {...register('phone', { required: true })}
                    />
                    <input
                        className="w-full text-orange-500"
                        placeholder="Address"
                        type="text"
                        {...register('address', { required: true })}
                    />
                    <Button
                        type="submit"
                        color="secondary"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    <div>
                        If you have account ? <br />

                        <Link className='text-red-600' to='/login'>Login Now</Link>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;