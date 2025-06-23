import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://gaskeep2025:okegas@gaskeep.mqsmqxi.mongodb.net/?retryWrites=true&w=majority&appName=GasKeep';

const PemesananSchema = new mongoose.Schema({
  nama: String,
  alamat: String,
  telepon: String,
  tanggalMasuk: String,
  tanggalKeluar: String,
  total: Number,
  paket: String,
  kode: String,
}, { timestamps: true });

const Pemesanan = mongoose.models.Pemesanan || mongoose.model('Pemesanan', PemesananSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    // Generate kode unik 6 digit angka
    const kode = Math.floor(100000 + Math.random() * 900000).toString();
    const pemesanan = await Pemesanan.create({ ...body, kode });
    return NextResponse.json({ success: true, data: pemesanan });
  } catch (err) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const kode = searchParams.get('kode');
    if (kode) {
      const data = await Pemesanan.findOne({ kode });
      return NextResponse.json({ success: true, data });
    }
    const data = await Pemesanan.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const kode = searchParams.get('kode');
    if (!kode) return NextResponse.json({ success: false, error: 'Kode tidak ditemukan' }, { status: 400 });
    await Pemesanan.deleteOne({ kode });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
} 