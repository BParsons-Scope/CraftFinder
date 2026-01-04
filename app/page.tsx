// app/page.tsx
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={styles.title}>CraftFinder</h1>
        <p className={styles.subtitle}>
          A quick quiz to suggest crafts you’ll actually enjoy.
        </p>

        <Link className={styles.primaryButton} href="/quiz">
          Start the quiz
        </Link>

        <p className={styles.smallNote}>
          You can skip any question. No wrong answers.
        </p>
      </div>
    </main>
  );
}
