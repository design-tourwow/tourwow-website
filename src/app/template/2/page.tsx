import styles from './style.module.css';

export default function Template2() {
  return (
    <main className={styles.bg}>
      <section className={styles.card}>
        <h1 className={styles.title}>Colorful Card</h1>
        <p className={styles.desc}>ดีไซน์สดใส เหมาะกับสาย startup หรือ travel</p>
        <form className={styles.form}>
          <input className={styles.input} type="email" placeholder="อีเมลของคุณ" />
          <button className={styles.button} type="submit">Join Now</button>
        </form>
      </section>
    </main>
  );
} 