'use client';

// Import necessary modules
import React from 'react';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { signIn } from 'next-auth/react';

// Define a function to handle login clicks
const handleLoginClick = async (provider: any) => {
    try {
        await signIn(provider); // Sign in using the specified provider (e.g., 'google' or 'github')
    } catch (error) {
        console.error('Error during login:', error);
        // Handle any errors (e.g., display an error message to the user)
    }
};

// Component that renders login buttons
const SocialLoginButtons = () => {
    return (
        <>
            <GoogleLoginButton onClick={() => handleLoginClick('google')}>
                Continue with Google
            </GoogleLoginButton>
            <GithubLoginButton onClick={() => handleLoginClick('github')}>Continue with Github</GithubLoginButton>
            {/* Add more social login buttons as needed */}
        </>
    );
};

export default SocialLoginButtons;
