import styles from './style.module.css';

export default function Template7() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Modern Gradient</h1>
      <p className={styles.desc}>ดีไซน์โมเดิร์นด้วย gradient สีสันสดใส เหมาะกับสาย tech/startup</p>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="ชื่อของคุณ" />
        <input className={styles.input} type="email" placeholder="อีเมลของคุณ" />
        <button className={styles.button} type="submit">เริ่มต้นใช้งาน</button>
      </form>
    </main>
  );
} 