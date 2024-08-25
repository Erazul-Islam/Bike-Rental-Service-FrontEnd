import React from 'react';
import BikeForm from '../../component/Form/BikeForm';
import { Button, Input } from '@nextui-org/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TUser } from '../../redux/feature/auth/authSlice';
import Swal from 'sweetalert2';
import { useSignupMutation } from '../../redux/feature/auth/authSignup';
import { useNavigate } from 'react-router-dom';

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
                text: "Login Successfully",
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
                    <Input
                        className="w-full"
                        placeholder="Email"
                        type="email"
                        {...register('email', { required: true })}
                    />
                    <Input
                        className="w-full"
                        placeholder="Name"
                        type="text"
                        {...register('name', { required: true })}
                    />
                    <Input
                        className="w-full"
                        placeholder="Password"
                        type="password"
                        {...register('password', { required: true })}
                    />
                    <Input
                        className="w-full"
                        placeholder="Phone"
                        type="text"
                        {...register('phone', { required: true })}
                    />
                    <Input
                        className="w-full"
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
                </form>
            </div>
        </div>
    );
};

export default Signup;