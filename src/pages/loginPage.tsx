//@ts-nocheck
import React from "react";
import {InputField} from "../components/common/input";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from "../schema/authenticationSchemas";
import { userLogin } from "../redux/reducers/athentications.reducer";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/api/store";
import auhtenticatinoImage from '../assets/signin.jpg';
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/common/header/mainHeader";

interface UserLogin {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch:AppDispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.login.loading);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLogin>({
        resolver: yupResolver(loginSchema), 
    });
    const onSubmit: SubmitHandler<UserLogin> = async (user: UserLogin) => {
        try {
            const respose = await dispatch(userLogin(user)).unwrap();
             localStorage.setItem('accessToken',respose.token);
             localStorage.setItem('loggedin_user', JSON.stringify(respose.data));
            toast.success("Welcome!");
            reset();
            if(respose.data.role === "admin" || respose.data.role === "seller") {
                setTimeout(() => {
                    navigate("/dashboard");
                  }, 3000);
            }
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
                    <p>Login to Your Account</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <div className="text-white text-center pt-[2%]">
                    <p>First time here? <span className="cursor-pinter text-blue-400 "><Link to='/register'>Create account.</Link>
                    </span> or <span className="cursor-pinter text-green-400 font-bold"><Link to='/'>Back Home</Link></span></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    </div>
    );
};
