import { Hlebozavod } from "@/components/font";
import styles from "./hlebzavod.module.css";

const cx = (...variants) => variants.filter(Boolean).join(" ");

const Style = ({ number, children }) => (
  <span style={{ fontFeatureSettings: `'ss0${number}'` }}>{children}</span>
);

export default function Page() {
  return (
    <main className={Hlebozavod.className} style={{ fontSize: 128 }}>
      <p className={cx(styles.paragraph, styles.letters)}>
        абвгдеёжзийклмнопрстуфхцчшщъыьэюя1234567890
      </p>

      <p className={cx(styles.paragraph, styles.letters)}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
      </p>

      <p className={cx(styles.paragraph, styles.letters)}>
        {`!?:;#/\.,_‘’„“”-–—()[]{}«»‹›"'`}
        <Style number={1}>{`{}`}</Style>
        <Style number={2}>{`{}`}</Style>
        <Style number={3}>{`{}`}</Style>
        <Style number={4}>{`{}`}</Style>
      </p>

      <p className={cx(styles.paragraph, styles.letters)}>
        {`©®TM°&%$€₽£¥@+−×÷=><@`}
        <Style number={1}>@</Style>
        <Style number={2}>@</Style>
        <Style number={3}>@</Style>
        <Style number={4}>@</Style>
        <Style number={5}>@</Style>
      </p>

      <p className={cx(styles.paragraph, styles.letters)}>↑↗→↘↓↙←↖↔↕</p>

      <p className={styles.paragraph}>
        <Style number={1}>зкты</Style>
      </p>

      <p className={styles.paragraph}>
        .<Style number={1}>,</Style>,<Style number={2}>,</Style>
      </p>

      <p className={styles.paragraph}>
        а если её маслом нашим, донским, полить да солью присыпать...
      </p>

      <p className={cx(styles.paragraph, styles.outline)}>
        торты консервы крупы хлеб
      </p>

      <p className={cx(styles.paragraph, styles.outline, styles.outline_red)}>
        кисель сок мясо молоко
      </p>
    </main>
  );
}
