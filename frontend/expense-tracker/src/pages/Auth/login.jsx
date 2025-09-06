import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); 

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        if (!password) {
            setError('Please enter the password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard'); 
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
                console.error(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
                console.error('Login error');
            }
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-2 mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="name@example.com"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 Characters"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        {isLoading ? 'Logging in...' : 'LOGIN'}
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{' '}
                        <Link className="font-medium text-primary underline" to="/signup">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
