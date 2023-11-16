import Link from "next/link";
import styles from "./first-page.module.css";

export default function Greeting() {
  return (
    <div className={styles.centeredText}>
      <h1 className={styles.title}>Hello, World!</h1>
      <p className={styles.text}>
        This is a bold design example with Next.js and TypeScript.
      </p>
      <Link href="./posts/final-post">Go to Bye World</Link>
    </div>
  );
}
