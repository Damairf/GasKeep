import styles from "./layanan_landing.module.css"
import Image from "next/image"

const LayananLanding = () => {
    return(
        <div className={styles.wrapper}>
            <h1 className={styles.judul}>Layanan</h1>
            <ul>
                <li>
                    <div className={styles.container}>
                        <div className={styles.image_container}>
                            <Image 
                                src="/img/Logo_Motor.png" 
                                alt="Logo Motor" 
                                width={80} 
                                height={30}
                                priority
                            />
                        </div>
                        <h1 className={styles.judul_container}>Penitipan</h1>
                        <p className={styles.isi_container}>Kami menyediakan layanan penitipan kendaraan yang tersebar luas dan keamanan yang terjamin serta bergaransi</p>
                    </div>
                </li>
                <li>
                    <div className={styles.container}>
                        <div className={styles.image_container}>
                            <Image 
                                src="/img/Logo_Aki.png" 
                                alt="Logo Aki" 
                                width={80} 
                                height={30}
                                priority
                            />
                        </div>
                        <h1 className={styles.judul_container}>Perawatan</h1>
                        <p className={styles.isi_container}>Kami menyediakan layanan perawatan kendaraan seperti perawatan mesin, kebersihan kendaraan dan lainnya</p>
                    </div>
                </li>
                <li>
                    <div className={styles.container}>
                        <div className={styles.image_container}>
                            <Image 
                                src="/img/Logo_Orang.png" 
                                alt="Logo Orang" 
                                width={80} 
                                height={30}
                                priority
                            />
                        </div>
                        <h1 className={styles.judul_container}>Penjemputan</h1>
                        <p className={styles.isi_container}>Kami menyediakan layanan penjemputan kendaraan ke lokasi sehingga anda tidak perlu repot untuk mengantar kendaraan anda</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default LayananLanding;