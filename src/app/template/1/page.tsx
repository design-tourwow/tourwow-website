import styles from './style.module.css';

export default function Template1() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Minimal Clean</h1>
      <p className={styles.desc}>ดีไซน์เรียบง่าย เหมาะกับสาย modern/corporate</p>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="ชื่อของคุณ" />
        <button className={styles.button} type="submit">ส่งข้อมูล</button>
      </form>
    </main>
  );
} 