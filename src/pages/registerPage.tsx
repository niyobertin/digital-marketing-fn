import React from "react";
import { InputField,SelectField } from "../components/common/input";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from "react-toastify";
import { registerSchema } from "../schema/authenticationSchemas";
import { userRegister } from "../redux/reducers/athentications.reducer";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/api/store";
import auhtenticatinoImage from '../assets/signin.jpg';
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/common/header/mainHeader";

interface UserRegister {
    firstName: string;
    secondName?: string;
    gender: string;
    dob: Date;
    email: string;
    password: string;
  }
  

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch:AppDispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.register.loading);

    // Use react-hook-form to manage form
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegister>({
        resolver: yupResolver(registerSchema), 
    });

    // Function to handle form submission
    const onSubmit: SubmitHandler<UserRegister> = async (user: UserRegister) => {
        try {
            const respose = await dispatch(userRegister(user)).unwrap();
            //@ts-ignore
            toast.success(`${respose.message}`);
            setTimeout(() =>{
                navigate('/login')
            },3000)
            reset();
        } catch (err) {
            const error = err as AxiosError;
            toast.error(`${error.message}`);
        }
    };

    return (
        <div>
            <MainHeader/>
        <div className="flex items-center justify-center h-screen">
            <div className="sm:block hidden">
                <img src={auhtenticatinoImage} alt="login" />
            </div>
            <div className="w-full max-w-md bg-[#233a2f] p-8 rounded-lg shadow-md">
                <div className="text-white text-center">
                    <h1 className="text-3xl">Welcome to Nzamura </h1>
                    <p>Create Account</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        register={register}
                        error={errors.firstName?.message}
                    />
                    <InputField
                        name="secondName"
                        type="text"
                        placeholder="Second name"
                        register={register}
                        error={errors.secondName?.message}
                    />
                    <SelectField
                        name="gender"
                        placeholder="Gender"
                        register={register}
                        options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        ]}
                        error={errors.gender?.message}
                    />
                    <InputField
                        name="dob"
                        type="date"
                        placeholder="Date of birth"
                        register={register}
                        error={errors.dob?.message}
                    />
                    <InputField
                        name="email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        error={errors.email?.message}
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        error={errors.password?.message}
                    />
                    <button
                        type="submit"
                        className="w-full p-[1%] bg-gradient-to-r from-[#98AA28] to-[#D6EF7E] font-bold sm:mt-[6%] mt-[17%] rounded-[30px] px-8"
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                <div className="text-white text-center pt-[2%]">
                    <p>Already have an account? <span className="cursor-pinter text-blue-400 "><Link to='/login'>Sign In.</Link>
                    </span> or <span className="cursor-pinter text-green-400 font-bold"><Link to='/'>Back Home</Link></span></p>
                </div>
            </div>
            <ToastContainer />
        </div>
        </div>
    );
};
