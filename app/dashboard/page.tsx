"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface User {
  name: string;
  picture?: string;
}

interface Pesanan {
  _id: string;
  kode: string;
  tanggalMasuk: string;
  tanggalKeluar: string;
  paket: string;
  total: number;
}

const DashboardPage = () => {
    const [user, setUser] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [hoveredMotorItem, setHoveredMotorItem] = useState<number | null>(null);
    // const [hoveredMobilItem, setHoveredMobilItem] = useState<number | null>(null);
    const [pesanan, setPesanan] = useState<Pesanan[]>([]);

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

        // Ambil data pesanan
        fetch('/api/pemesanan')
            .then(res => res.json())
            .then(data => {
                if (data.success) setPesanan(data.data);
            });

        return () => {
            window.removeEventListener('focus', checkAuth);
            document.removeEventListener('visibilitychange', checkAuth);
        };
    }, []);

    const handleMotorMouseEnter = (index: number) => {
        // setHoveredMotorItem(index);
    };

    const handleMotorMouseLeave = () => {
        // setHoveredMotorItem(null);
    };

    const handleMobilMouseEnter = (index: number) => {
        // setHoveredMobilItem(index);
    };

    const handleMobilMouseLeave = () => {
        // setHoveredMobilItem(null);
    };

    const handleStarterMotorClick = () => {
        window.location.href = '/paket/starter_motor';
    };
    const handleBoostMotorClick = () => {
        window.location.href = '/paket/boost_motor';
    };
    const handleMaxMotorClick = () => {
        window.location.href = '/paket/max_motor';
    };
    const handleStarterMobilClick = () => {
        window.location.href = '/paket/starter_mobil';
    };
    const handleBoostMobilClick = () => {
        window.location.href = '/paket/boost_mobil';
    };
    const handleMaxMobilClick = () => {
        window.location.href = '/paket/max_mobil';
    };

    const scrollToAtas = () => {
        const atasSection = document.getElementById('atas');
        if (atasSection) {
            atasSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToMotor = () => {
        const motorSection = document.getElementById('motor');
        if (motorSection) {
            motorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToMobil = () => {
        const mobilSection = document.getElementById('mobil');
        if (mobilSection) {
            mobilSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const scrollToPesanan = () => {
        const pesananSection = document.getElementById('pesanan');
        if (pesananSection) {
            pesananSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    let userObj: User | null = null;
    if (user && typeof user === 'object' && 'name' in user) {
        userObj = user as User;
    }

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

    if (!userObj) {
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
                marginBottom: '5%',
                backgroundColor: 'white',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
            }}>
                <div onClick={scrollToAtas} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer'}}>
                    <Image 
                        src="/img/Logo_GasKeep_Biru.png" 
                        alt="Logo GasKeep" 
                        width={120} 
                        height={40}
                        priority
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className='header_paket' style={{ textAlign: 'right'}}>
                        <h1 className='header_text' style={{margin: 0, marginRight: '1rem', fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: 'rgb(44, 44, 44)', cursor: 'pointer', transition: 'color 0.3s ease'}} onClick={scrollToMotor}>GasKeep Motor</h1>
                    </div>
                    <div className='header_paket' style={{ textAlign: 'right'}}>
                        <h1 className='header_text' style={{margin: 0, marginRight: '1rem', fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: 'rgb(44, 44, 44)', cursor: 'pointer', transition: 'color 0.3s ease'}} onClick={scrollToMobil}>GasKeep Mobil</h1>
                    </div>
                    <div className='header_paket' style={{ textAlign: 'right'}}>
                        <h1 className='header_text' style={{margin: 0, marginRight: '1rem', fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: 'rgb(44, 44, 44)', cursor: 'pointer', transition: 'color 0.3s ease'}} onClick={scrollToPesanan}>Pesanan Saya</h1>
                    </div>
                    <button
                        onClick={() => window.location.href = '/dashboard/profile'}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title="Profil Akun"
                    >
                        {userObj.picture ? (
                            <Image src={userObj.picture} alt="Profil" width={40} height={40} style={{objectFit: 'cover'}} />
                        ) : (
                            <div style={{width: '40px', height: '40px', background: '#eee', borderRadius: '50%'}} />
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main id="atas" style={{
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                marginTop: '6%'
            }}>
                <div style={{
                    backgroundColor: '#05308C',
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
                        height: '15rem',
                        position: 'relative'
                    }}>
                        <Image 
                            src="/img/Background_Dashboard.png" 
                            alt="Parking Lot" 
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
                            color: '#ffffffff',
                            fontFamily: 'Poppins, sans-serif',
                            marginBottom: '1rem'
                        }}>
                            Selamat Datang di GasKeep, {userObj.name}
                        </h1>
                        <p id="motor" style={{
                            fontSize: '1.2rem',
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            marginBottom: '1rem'
                        }}>
                            Siap menjaga kendaraan kesayangan anda dengan layanan terbaik kami. Pilih paket yang sesuai dan nikmati kenyamanan tanpa khawatir!
                        </p>
                    </div>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    marginTop: '2rem',
                    marginLeft: '5%',
                    marginRight: '5%',
                    paddingLeft: '4%',
                    paddingRight: '4%',
                    paddingBottom: '3rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#05308C',
                        marginBottom: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                    }}>
                        GasKeep Motor
                    </h2>
                    <ul className="paket-list-motor" style={{
                        display: 'flex',
                        transformOrigin: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '3rem'
                    }}>
                        <li className="paket-item-motor" 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#05308C',
                                borderRadius: '10px',
                                width: '18vw',
                                height: '23rem',
                                transition: 'transform 0.3s ease, height 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => handleMotorMouseEnter(0)}
                            onMouseLeave={handleMotorMouseLeave}
                            onClick={handleStarterMotorClick}
                        >
                            <div>
                                <div style={{backgroundColor: '#FFBB68', borderRadius: '0 0 10px 10px', paddingTop: '0.8rem'}}>
                                    <img 
                                        src="/img/icon_motor_kecil.png" 
                                        alt="Icon Motor Kecil"
                                        style={{
                                            height: '6rem',
                                            display: 'block',
                                            margin: '0 auto',
                                        }} 
                                    />
                                    <h1 style={{margin: 0, paddingBottom: '10px', borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', textAlign: 'center'}}>PAKET<br />GAS STARTER</h1>
                                </div>
                                <ul style={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1rem',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    paddingLeft: '0',
                                    textAlign: 'left',
                                    width: 'fit-content'
                                }}>
                                    <li>Penitipan Motor</li>
                                    <li>Perawatan Motor</li>
                                    <li>Keamanan Motor</li>
                                </ul>
                            </div>
                        </li>
                        <li className="paket-item-motor" 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#05308C',
                                borderRadius: '10px',
                                width: '18vw',
                                height: '23rem',
                                transition: 'transform 0.3s ease, height 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => handleMotorMouseEnter(1)}
                            onMouseLeave={handleMotorMouseLeave}
                            onClick={handleBoostMotorClick}
                        >
                            <div>
                                <div style={{backgroundColor: '#FFBB68', borderRadius: '0 0 10px 10px', paddingTop: '0.8rem'}}>
                                    <img 
                                        src="/img/icon_motor_sedang.png" 
                                        alt="Icon Motor Sedang"
                                        style={{
                                            height: '6rem',
                                            display: 'block',
                                            margin: '0 auto',
                                        }} 
                                    />
                                    <h1 style={{margin: 0, paddingBottom: '10px', borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', textAlign: 'center'}}>PAKET<br />GAS BOOST</h1>
                                </div>
                                <ul style={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1rem',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    paddingLeft: '0',
                                    textAlign: 'left',
                                    width: 'fit-content'
                                }}>
                                    <li>Penitipan Motor</li>
                                    <li>Perawatan Motor</li>
                                    <li>Keamanan Motor</li>
                                    <li>Cuci Motor</li>
                                </ul>
                            </div>
                        </li>
                        <li className="paket-item-motor" 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#05308C',
                                borderRadius: '10px',
                                width: '18vw',
                                height: '23rem',
                                transition: 'transform 0.3s ease, height 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => handleMotorMouseEnter(2)}
                            onMouseLeave={handleMotorMouseLeave}
                            onClick={handleMaxMotorClick}
                        >
                            <div>
                                <div style={{backgroundColor: '#FFBB68', borderRadius: '0 0 10px 10px', paddingTop: '0.8rem'}}>
                                    <img 
                                        src="/img/icon_motor_besar.png" 
                                        alt="Icon Motor Besar"
                                        style={{
                                            height: '6rem',
                                            display: 'block',
                                            margin: '0 auto',
                                        }} 
                                    />
                                    <h1 style={{margin: 0, paddingBottom: '10px', borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', textAlign: 'center'}}>PAKET<br />GAS MAX</h1>
                                </div>
                                <ul style={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1rem',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    paddingLeft: '0',
                                    textAlign: 'left',
                                    width: 'fit-content'
                                }}>
                                    <li>Penitipan Motor</li>
                                    <li>Perawatan Motor</li>
                                    <li>Keamanan Motor</li>
                                    <li>Cuci Motor</li>
                                    <li>Penjemputan Motor</li>
                                    <li>Pengantaran Motor</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div id="mobil" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                    </div>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    marginTop: '2rem',
                    marginLeft: '5%',
                    marginRight: '5%',
                    paddingLeft: '4%',
                    paddingRight: '4%',
                    paddingBottom: '3rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#05308C',
                        marginBottom: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                    }}>
                        GasKeep Mobil
                    </h2>
                    <ul className="paket-list-mobil" style={{
                        display: 'flex',
                        transformOrigin: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '3rem'
                    }}>
                        <li className="paket-item-mobil" 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#05308C',
                                borderRadius: '10px',
                                width: '18vw',
                                height: '23rem',
                                transition: 'transform 0.3s ease, height 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => handleMobilMouseEnter(0)}
                            onMouseLeave={handleMobilMouseLeave}
                            onClick={handleStarterMobilClick}
                        >
                            <div>
                                <div style={{backgroundColor: '#FFBB68', borderRadius: '0 0 10px 10px', paddingTop: '0.8rem'}}>
                                    <img 
                                        src="/img/icon_mobil_kecil.png" 
                                        alt="Icon Mobil Kecil"
                                        style={{
                                            height: '6rem',
                                            display: 'block',
                                            margin: '0 auto',
                                        }} 
                                    />
                                    <h1 style={{margin: 0, paddingBottom: '10px', borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', textAlign: 'center'}}>PAKET<br />GAS STARTER</h1>
                                </div>
                                <ul style={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1rem',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    paddingLeft: '0',
                                    textAlign: 'left',
                                    width: 'fit-content'
                                }}>
                                    <li>Penitipan Mobil</li>
                                    <li>Perawatan Mobil</li>
                                    <li>Keamanan Mobil</li>
                                </ul>
                            </div>
                        </li>
                        <li className="paket-item-mobil" 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#05308C',
                                borderRadius: '10px',
                                width: '18vw',
                                height: '23rem',
                                transition: 'transform 0.3s ease, height 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => handleMobilMouseEnter(1)}
                            onMouseLeave={handleMobilMouseLeave}
                            onClick={handleBoostMobilClick}
                        >
                            <div>
                                <div style={{backgroundColor: '#FFBB68', borderRadius: '0 0 10px 10px', paddingTop: '0.8rem'}}>
                                    <img 
                                        src="/img/icon_mobil_sedang.png" 
                                        alt="Icon Mobil Sedang"
                                        style={{
                                            height: '6rem',
                                            display: 'block',
                                            margin: '0 auto',
                                        }} 
                                    />
                                    <h1 style={{margin: 0, paddingBottom: '10px', borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', textAlign: 'center'}}>PAKET<br />GAS BOOST</h1>
                                </div>
                                <ul style={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1rem',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    paddingLeft: '0',
                                    textAlign: 'left',
                                    width: 'fit-content'
                                }}>
                                    <li>Penitipan Mobil</li>
                                    <li>Perawatan Mobil</li>
                                    <li>Keamanan Mobil</li>
                                    <li>Cuci Mobil</li>
                                </ul>
                            </div>
                        </li>
                        <li className="paket-item-mobil" 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#05308C',
                                borderRadius: '10px',
                                width: '18vw',
                                height: '23rem',
                                transition: 'transform 0.3s ease, height 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => handleMobilMouseEnter(2)}
                            onMouseLeave={handleMobilMouseLeave}
                            onClick={handleMaxMobilClick}
                        >
                            <div>
                                <div style={{backgroundColor: '#FFBB68', borderRadius: '0 0 10px 10px', paddingTop: '0.8rem'}}>
                                    <img 
                                        src="/img/icon_mobil_besar.png" 
                                        alt="Icon Mobil Besar"
                                        style={{
                                            height: '6rem',
                                            display: 'block',
                                            margin: '0 auto',
                                        }} 
                                    />
                                    <h1 style={{margin: 0, padding: '10px', borderRadius: '0 0 10px 10px', fontWeight: 'bold', color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Poppins, sans-serif', textAlign: 'center'}}>PAKET<br />GAS MAX</h1>
                                </div>
                                <ul style={{
                                    listStyleType: 'disc',
                                    listStylePosition: 'inside',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '1rem',
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '1rem',
                                    paddingLeft: '0',
                                    textAlign: 'left',
                                    width: 'fit-content'
                                }}>
                                    <li>Penitipan Mobil</li>
                                    <li>Perawatan Mobil</li>
                                    <li>Keamanan Mobil</li>
                                    <li>Cuci Mobil</li>
                                    <li>Penjemputan Mobil</li>
                                    <li>Pengantaran Mobil</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                    </div>
                </div>
                <div id="pesanan" style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    marginTop: '2rem',
                    marginLeft: '5%',
                    marginRight: '5%',
                    paddingLeft: '4%',
                    paddingRight: '4%',
                    paddingBottom: '3rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#05308C',
                        marginBottom: '1rem',
                        fontFamily: 'Poppins, sans-serif',
                    }}>
                        Pesanan Saya
                    </h2>
                    {pesanan.length === 0 ? (
                        <p style={{ color: '#6b7280', fontFamily: 'Poppins, sans-serif' }}>Belum ada pesanan.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>
                                <thead>
                                    <tr style={{ background: '#f3f4f6' }}>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>No</th>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Kode</th>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Tanggal Masuk</th>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Tanggal Keluar</th>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Paket</th>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}>Harga</th>
                                        <th style={{ padding: '8px', border: '1px solid #e5e7eb' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pesanan.map((p, i) => (
                                        <tr key={p._id}>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>{i + 1}</td>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>{p.kode}</td>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>{p.tanggalMasuk}</td>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>{p.tanggalKeluar}</td>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>{p.paket}</td>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>Rp {p.total?.toLocaleString()}</td>
                                            <td style={{ padding: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                                                <button onClick={() => window.location.href = `/rincian_pemesanan/${p.kode}`} style={{ background: '#05308C', color: 'white', border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>Lihat</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .paket-list-motor li.paket-item-motor:hover {
                    transform: scale(1.05);
                }
                .paket-list-motor li.paket-item-motor {
                    will-change: transform;
                }
                .paket-list-mobil li.paket-item-mobil:hover {
                    transform: scale(1.05);
                }
                .paket-list-mobil li.paket-item-mobil {
                    will-change: transform;
                }
                .header_paket .header_text:hover {
                    color: #05308C !important;
                }
                .header_paket .header_text:active {
                    color: #5b8cff !important;
                }
            `}</style>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1.5rem'
            }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: '#05308C',
                    width: '100%',
                    textAlign: 'center',
                    padding: '1rem',
                    fontFamily: 'Poppins, sans-serif',
                    margin: 0,
                    borderRadius: '0 0 10px 10px'
                }}>©2025 GasKeep - All Rights Reserved</h3>
            </div>
        </div>
    );
};

export default DashboardPage; 