"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StarterMotorPage = () => {
    const [user, setUser] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const savedUser = localStorage.getItem('gaskeep_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                window.location.href = '/login';
            }
            setIsLoading(false);
        };

        checkAuth();
        window.addEventListener('focus', checkAuth);
        document.addEventListener('visibilitychange', checkAuth);
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload();
            }
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => {
            window.removeEventListener('focus', checkAuth);
            document.removeEventListener('visibilitychange', checkAuth);
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('gaskeep_user');
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
        window.location.replace('/');
    };

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9fafb'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f4f6',
                    borderTop: '4px solid #2563eb',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'white',
                padding: '1rem 2rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                        <Image 
                            src="/img/Logo_GasKeep_Biru.png" 
                            alt="Logo GasKeep" 
                            width={120} 
                            height={40}
                            priority
                        />
                    </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                marginTop: '6%'
            }}>
                <div style={{
                    backgroundColor: '#2f6dfd',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    marginBottom: '2rem',
                    marginLeft: '5%',
                    marginRight: '5%',
                    overflow: 'hidden'
                }}>
                    {/* Bagian atas dengan foto */}
                    <div style={{
                        width: '100%',
                        height: '14rem',
                        position: 'relative'
                    }}>
                        <Image 
                            src="/img/parkir_mobil.jpg" 
                            alt="Parkir Mobil" 
                            fill
                            style={{
                                objectFit: 'cover'
                            }}
                            priority
                        />
                    </div>
                    
                    {/* Bagian bawah dengan teks */}
                    <div style={{
                        padding: '2rem',
                        paddingLeft: '5%',
                        paddingRight: '5%'
                    }}>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#F7C100',
                            fontFamily: 'Poppins, sans-serif',
                            marginBottom: '1rem'
                        }}>
                            Paket Gas Boost - Mobil
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            marginBottom: '1rem'
                        }}>
                            Paket tengah untuk penitipan mobil dengan layanan perawatan, keamanan terjamin dan pencucian mobil.
                        </p>
                    </div>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    marginLeft: '5%',
                    marginRight: '5%',
                    paddingLeft: '4%',
                    paddingRight: '4%',
                    paddingBottom: '3rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#2f6dfd',
                        marginBottom: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                    }}>
                        Layanan yang Termasuk:
                    </h2>
                    <ul style={{
                        listStyleType: 'disc',
                        listStylePosition: 'inside',
                        marginLeft: '2rem',
                        color: 'rgb(44, 44, 44)',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.1rem',
                        lineHeight: '1.8'
                    }}>
                        <li>Penitipan Mobil</li>
                        <li>Perawatan Mobil</li>
                        <li>Keamanan Mobil</li>
                        <li>Cuci Mobil</li>
                    </ul>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: '#2f6dfd',
                            marginBottom: '1rem',
                            fontFamily: 'Poppins, sans-serif',
                        }}>
                            Harga Paket
                        </h3>
                        <p style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#F7C100',
                            fontFamily: 'Poppins, sans-serif',
                            margin: 0
                        }}>
                            Rp 7.000/hari
                        </p>
                        <p style={{
                            fontSize: '0.8rem',
                            color: 'rgb(44, 44, 44)',
                            fontFamily: 'Poppins, sans-serif'
                        }}>
                            (Minimal pemesanan 1 minggu)
                        </p>
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center'
                    }}>
                        <Link href="/dashboard" style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            textDecoration: 'none',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold'
                        }}>
                            Kembali
                        </Link>
                        <button id='boost-mobil-button' style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#F7C100',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold'
                        }}
                        onClick={() => window.location.href = '/detail_pemesanan?paket=boost-mobil-button'}
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1.5rem'
            }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    color: 'rgb(44, 44, 44)',
                    backgroundColor: 'rgb(228, 228, 228)',
                    width: '100%',
                    textAlign: 'center',
                    padding: '8px',
                    fontFamily: 'Poppins, sans-serif',
                    margin: 0,
                    borderRadius: '0 0 10px 10px'
                }}>©2025 GasKeep - All Rights Reserved</h3>
            </div>
        </div>
    );
};

export default StarterMotorPage;
