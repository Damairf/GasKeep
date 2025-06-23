import styles from "./tentang_landing.module.css"

const TentangLanding = () => {
    return (
        <div id="tentang" className={styles.wrapper}>
            <div className={styles.tentang_container}>
                <h1 className={styles.judul}>Tentang Kami</h1>
                <p className={styles.isi}>GasKeep adalah sebuah startup yang bergerak di bidang jasa penitipan dan perawatan kendaraan, khususnya untuk menjawab kebutuhan mahasiswa perantau yang harus meninggalkan kendaraannya saat pulang kampung. Dengan mengusung tagline &quot;Teman Setia Kendaraan Anda,&quot; GasKeep hadir sebagai solusi yang aman, terpercaya, dan terjangkau dalam menjaga kondisi kendaraan baik secara fisik maupun mesin selama pemiliknya tidak berada di tempat. Layanan GasKeep dapat diakses secara online, memudahkan pelanggan dalam melakukan reservasi serta memilih paket perawatan sesuai kebutuhan. Pelanggan juga diberikan kemudahan dalam penyerahan kendaraan melalui dua opsi, yaitu pengantaran langsung atau layanan penjemputan. Dengan adanya GasKeep, mahasiswa tidak perlu lagi khawatir akan keamanan dan kondisi kendaraannya selama ditinggal dalam waktu lama.</p>
            </div>
            <div className={styles.footer_container}>
                <h3 className={styles.footer}>©2025 GasKeep - All Rights Reserved</h3>
            </div>
        </div>
    )
}

export default TentangLanding;