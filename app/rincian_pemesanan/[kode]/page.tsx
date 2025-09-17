"use client";
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Pesanan {
  kode: string;
  nama: string;
  alamat: string;
  telepon: string;
  tanggalMasuk: string;
  tanggalKeluar: string;
  paket: string;
  total: number;
}

export default function RincianPemesananPage({ params }: { params: Promise<{ kode: string }> }) {
  const router = useRouter();
  const { kode } = use(params);
  const [data, setData] = useState<Pesanan | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/pemesanan?kode=${kode}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data as Pesanan);
        setLoading(false);
      });
  }, [kode]);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/pemesanan?kode=${kode}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      alert('Pesanan selesai dan dihapus.');
      router.replace('/dashboard');
    } else {
      alert('Gagal menghapus pesanan.');
      setDeleting(false);
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  if (!data) return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Pesanan tidak ditemukan.</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 400, width: '100%' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#05308C', margin: 0, marginBottom: '1.5rem', textAlign: 'center' }}>Rincian Pemesanan</h2>
        <div style={{ marginBottom: '1rem' }}><b>Kode:</b> {data.kode}</div>
        <div style={{ marginBottom: '1rem' }}><b>Nama Lengkap:</b> {data.nama}</div>
        <div style={{ marginBottom: '1rem' }}><b>Alamat:</b> {data.alamat}</div>
        <div style={{ marginBottom: '1rem' }}><b>Nomor Telepon:</b> {data.telepon}</div>
        <div style={{ marginBottom: '1rem' }}><b>Tanggal Masuk:</b> {data.tanggalMasuk}</div>
        <div style={{ marginBottom: '1rem' }}><b>Tanggal Keluar:</b> {data.tanggalKeluar}</div>
        <div style={{ marginBottom: '1rem' }}><b>Paket:</b> {data.paket}</div>
        <div style={{ marginBottom: '2rem' }}><b>Harga:</b> Rp {data.total?.toLocaleString()}</div>
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
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            style={{
              width: '50%',
              background: '#05308C',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 6,
              padding: '0.8rem 0',
              fontSize: '1rem',
              cursor: deleting ? 'not-allowed' : 'pointer',
              opacity: deleting ? 0.7 : 1
            }}
          >
            {deleting ? 'Memproses...' : 'Selesai'}
          </button>
        </div>
      </div>
    </div>
  );
} 