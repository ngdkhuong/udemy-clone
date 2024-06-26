'use client';

import React from 'react';
import Input from '../components/Inputs/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import SocialLoginButtons from '../components/authButtons';

interface InitialStateProps {
    email: string;
    password: string;
}

const initialState: InitialStateProps = {
    email: '',
    password: '',
};

export default function page() {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        signIn('credentials', {
            ...state,
            redirect: false,
        }).then((callback) => {
            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh();
            }
            if (callback?.error) {
                throw new Error('Wrong credentials');
            }
        });

        router.push('/');
    }

    return (
        <form onSubmit={onSubmit} className="text-center">
            <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
                <p>
                    welcome to the <span className="text-pink-400">Udemy</span> login page
                </p>
                <SocialLoginButtons />
                Or
                <Input
                    placeholder="Email"
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={state.email}
                    textarea={false}
                    big={false}
                />
                <Input
                    placeholder="Password"
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={state.password}
                    textarea={false}
                    big={false}
                />
                <div className=" flex justify-center items-center">
                    <button type="submit" disabled={loading} className=" text-gray-100 bg-violet-600 w-[50%] h-12">
                        submit
                    </button>
                </div>
                <div>
                    <div>
                        Don't have an account ?{' '}
                        <Link href="/register" className=" text-blue-600">
                            register here
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
