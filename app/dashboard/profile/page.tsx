"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ProfilePage = () => {
    const [user, setUser] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('gaskeep_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            window.location.href = '/login';
        }
        setIsLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('gaskeep_user');
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
        window.location.href = '/';
    };

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid #f3f4f6', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }
    if (!user) return null;

    if (user && typeof user === 'object' && 'picture' in user && 'name' in user && 'email' in user) {
        const u = user as { picture: string; name: string; email: string };
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', padding: '2rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px' }}>
                    <Image src={u.picture || '/img/Logo_Orang.png'} alt="Foto Profil" width={80} height={80} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
                    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '1.3rem', margin: 0 }}>{u.name}</h2>
                    <p style={{ color: '#6b7280', fontFamily: 'Poppins, sans-serif', margin: '0.5rem 0 1.5rem 0', fontSize: '1rem' }}>{u.email}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            style={{
                                background: '#e4e4e4',
                                color: 'rgb(44, 44, 44)',
                                border: 'none',
                                borderRadius: '0.375rem',
                                padding: '0.7rem 2rem',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            Kembali
                        </button>
                        <button onClick={handleLogout} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.7rem 2rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Keluar</button>
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
    }

    return null;
};

export default ProfilePage; 