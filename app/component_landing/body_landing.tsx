import styles from "./body_landing.module.css"
import Image from "next/image"
import Link from "next/link"

const BodyLanding = () => {
    return(
        <div id="beranda">
            <div className={styles.bg_wrapper}>
                <Image className={styles.image_bg_container} src="/img/parking_lot.jpg" alt="Parking Lot" fill/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Image className={styles.image_container} src="/img/Background_Ilustrasi.png" alt="Background Ilustrasi" fill/>
                </div>
                <div className={styles.text_container}>
                    <h1 className={styles.judul}>GasKeep</h1>
                    <p className={styles.isi}>Tidak perlu khawatir lagi untuk meninggalkan kendaraan anda, karena kami hadir menyediakan layanan penitipan dan perawatan rutin kendaraan selagi anda keluar kota</p>
                    <Link href="/login">
                        <button id="layanan" type="button" className={styles.button}>Daftar Sekarang</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BodyLanding;