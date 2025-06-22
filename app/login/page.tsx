"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Type declaration for Google OAuth
declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (element: HTMLElement | null, options: any) => void;
                    disableAutoSelect: () => void;
                };
            };
        };
    }
}

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Google OAuth Configuration
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '648984769678-o6vjiqi2lds9o745j7cpep6aapaifcd9.apps.googleusercontent.com';

    useEffect(() => {
        // Load Google OAuth script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'),
                    {
                        theme: 'outline',
                        size: 'large',
                        type: 'standard',
                        text: 'signin_with',
                        shape: 'rectangular',
                        logo_alignment: 'left',
                        width: 300,
                    }
                );
            }
        };

        return () => {
            // Cleanup
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const handleCredentialResponse = async (response: any) => {
        setIsLoading(true);
        try {
            // Decode the JWT token
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            console.log('Google Login Success:', payload);
            
            // Store user data in localStorage or state management
            const userData = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                given_name: payload.given_name,
                family_name: payload.family_name,
                email_verified: payload.email_verified,
                loginTime: new Date().toISOString()
            };

            // Save to localStorage
            localStorage.setItem('gaskeep_user', JSON.stringify(userData));
            setUser(userData);

            // Redirect to dashboard or home page
            window.location.href = '/dashboard';
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Login gagal. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('gaskeep_user');
        setUser(null);
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
        window.location.href = '/';
    };

    // Check if user is already logged in
    useEffect(() => {
        const savedUser = localStorage.getItem('gaskeep_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    if (user) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#f9fafb',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem 1rem',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: '0.5rem'
                    }}>
                        Selamat datang, {user.name}!
                    </h2>
                    <p style={{
                        color: '#6b7280',
                        marginBottom: '1.5rem'
                    }}>
                        {user.email}
                    </p>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}
                    >
                        Keluar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem 1rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '400px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <Image
                        src="/img/Logo_GasKeep_Biru.png"
                        alt="GasKeep Logo"
                        width={150}
                        height={50}
                        priority
                        style={{ margin: '0 auto' }}
                    />
                    <h2 style={{
                        marginTop: '1.5rem',
                        fontSize: '1.875rem',
                        fontWeight: 'bold',
                        color: '#111827'
                    }}>
                        Masuk ke GasKeep
                    </h2>
                    <p style={{
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                    }}>
                        Silakan masuk menggunakan akun Google Anda
                    </p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    {isLoading ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                border: '4px solid #f3f4f6',
                                borderTop: '4px solid #2563eb',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }}></div>
                            <p style={{ color: '#6b7280' }}>Memproses login...</p>
                        </div>
                    ) : (
                        <div id="google-signin-button" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '1rem'
                        }}></div>
                    )}
                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: '1rem'
                }}>
                    <Link href="/" style={{
                        color: '#6b7280',
                        textDecoration: 'none',
                        fontSize: '0.875rem'
                    }}>
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoginPage; 