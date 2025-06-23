"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const paketData: Record<string, { judul: string; harga: number }> = {
  "starter-motor-button": {
    judul: "Paket Gas Starter - Motor",
    harga: 3000,
  },
  "boost-motor-button": {
    judul: "Paket Gas Boost - Motor",
    harga: 4000,
  },
  "max-motor-button": {
    judul: "Paket Gas Max - Motor",
    harga: 5000,
  },
  "starter-mobil-button": {
    judul: "Paket Gas Starter - Mobil",
    harga: 6000,
  },
  "boost-mobil-button": {
    judul: "Paket Gas Boost - Mobil",
    harga: 7000,
  },
  "max-mobil-button": {
    judul: "Paket Gas Max - Mobil",
    harga: 8000,
  },
};

const getUserEmail = () => {
  if (typeof window === 'undefined') return '';
  const user = localStorage.getItem('gaskeep_user');
  if (!user) return '';
  try {
    return JSON.parse(user).email || '';
  } catch {
    return '';
  }
};

const DetailPemesananPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paketId, setPaketId] = useState<string | null>(null);
  const [judul, setJudul] = useState('');
  const [harga, setHarga] = useState(0);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [jumlahHari, setJumlahHari] = useState(7);
  const [total, setTotal] = useState(0);
  const [teleponError, setTeleponError] = useState('');
  const [tanggalMasuk, setTanggalMasuk] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [tanggalKeluar, setTanggalKeluar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ambil paketId dari query atau localStorage
    const id = searchParams.get('paket') || localStorage.getItem('paket_id');
    if (!id || !paketData[id]) {
      router.replace('/dashboard');
      return;
    }
    setPaketId(id);
    setJudul(paketData[id].judul);
    setHarga(paketData[id].harga);
    setTotal(paketData[id].harga * jumlahHari);
    localStorage.setItem('paket_id', id);
  }, [searchParams, jumlahHari, router]);

  useEffect(() => {
    setTotal(harga * jumlahHari);
  }, [harga, jumlahHari]);

  const handleJumlahHariChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setJumlahHari(NaN);
      return;
    }
    const num = parseInt(value, 10);
    setJumlahHari(num);
  };

  const handleJumlahHariBlur = () => {
    if (isNaN(jumlahHari) || jumlahHari < 7) {
      setJumlahHari(7);
    }
  };

  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    setNama(value);
  };

  const handleAlamatChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAlamat(e.target.value);
  };

  const handleTeleponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTelepon(value);
      setTeleponError('');
    } else {
      setTeleponError('Nomor telepon hanya boleh angka');
    }
  };

  useEffect(() => {
    const masuk = new Date(tanggalMasuk);
    if (isNaN(masuk.getTime()) || isNaN(jumlahHari)) {
      setTanggalKeluar('');
      return;
    }
    const keluar = new Date(masuk);
    keluar.setDate(masuk.getDate() + jumlahHari - 1);
    setTanggalKeluar(keluar.toISOString().split('T')[0]);
  }, [tanggalMasuk, jumlahHari]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teleponError) return;
    let hari = jumlahHari;
    if (isNaN(hari) || hari < 7) {
      hari = 7;
      setJumlahHari(7);
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/pemesanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-email': getUserEmail() },
        body: JSON.stringify({
          nama,
          alamat,
          telepon,
          tanggalMasuk,
          tanggalKeluar,
          total: harga * hari,
          paket: judul,
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Pemesanan Sukses, Terima Kasih');
        setIsSubmitting(false);
        window.location.replace('/dashboard');
      } else {
        alert('Gagal menyimpan pemesanan: ' + data.error);
        setIsSubmitting(false);
      }
    } catch {
      alert('Terjadi error saat menyimpan pemesanan.');
      setIsSubmitting(false);
    }
  };

  if (!paketId) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', padding: '2.5rem 2rem', minWidth: 440, maxWidth: 600, width: '100%' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#2f6dfd', margin: 0, marginBottom: '1.5rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{judul}</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>Nama Lengkap</label>
          <input type="text" value={nama} onChange={handleNamaChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', textTransform: 'capitalize' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>Alamat</label>
          <textarea value={alamat} onChange={handleAlamatChange} required rows={3} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', resize: 'vertical', fontFamily: 'inherit', fontSize: '1rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>Nomor Telepon</label>
          <input type="tel" value={telepon} onChange={handleTeleponChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }} />
          {teleponError && <span style={{ color: 'red', fontSize: '0.9rem' }}>{teleponError}</span>}
        </div>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>Tanggal Masuk</label>
            <input type="date" value={tanggalMasuk} onChange={e => setTanggalMasuk(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }} min={new Date().toISOString().split('T')[0]} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>Jumlah Hari</label>
            <input
              type="number"
              min={7}
              value={isNaN(jumlahHari) ? '' : jumlahHari}
              onChange={handleJumlahHariChange}
              onBlur={handleJumlahHariBlur}
              required
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }}
            />
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>(Minimal 7 hari)</span>
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>Tanggal Keluar</label>
          <input type="date" value={tanggalKeluar} readOnly style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', background: '#f3f4f6' }} />
        </div>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2f6dfd' }}>Total Harga: </span>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#F7C100' }}>Rp {harga.toLocaleString()} x {jumlahHari} = Rp {total.toLocaleString()}</span>
          <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Anda dapat mengambil lebih cepat dari tanggal keluar tetapi tidak ada pengurangan harga</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.4rem',
              padding: '0.8rem 0',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '50%'
            }}
          >
            Kembali
          </button>
          <button type="submit" disabled={isSubmitting || isNaN(jumlahHari)} style={{ width: '50%', background: '#2f6dfd', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: 6, padding: '0.8rem 0', fontSize: '1rem', cursor: isSubmitting || isNaN(jumlahHari) ? 'not-allowed' : 'pointer', opacity: isSubmitting || isNaN(jumlahHari) ? 0.7 : 1 }}>
            {isSubmitting ? 'Memproses...' : 'Konfirmasi Pesanan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailPemesananPage; 