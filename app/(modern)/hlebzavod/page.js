import { Hlebozavod } from "@/components/font";
import { Hover, Hovered, Default } from "@/components/hover";
import styles from "./hlebzavod.module.css";

const cx = (...variants) => variants.filter(Boolean).join(" ");

const Style = ({ number, children }) => (
  <span style={{ fontFeatureSettings: `'ss0${number}'` }}>{children}</span>
);

const Section = ({ bg, centered, children }) => (
  <section className={styles.section}>
    <div
      className={cx(
        styles.section_body,
        centered && styles.section_body__centered
      )}
    >
      {children}
    </div>
    {bg && <img className={styles.section_image} src={bg} />}
  </section>
);

const Paragraph = ({
  children,
  centered,
  letters,
  outline,
  color = "black",
}) => (
  <p
    className={cx(
      styles.paragraph,
      letters && styles.paragraph__letters,
      centered && styles.paragraph__centered,
      outline && styles.outline
    )}
    style={{ color }}
  >
    {children}
  </p>
);

export default function Page() {
  return (
    <main className={Hlebozavod.className} style={{ fontSize: 128 }}>
      <Section bg="images/mashina.png" centered>
        <Paragraph centered color="white">
          хлебозавод
          <br />
          (1927)
        </Paragraph>
      </Section>

      <Section>
        <Paragraph letters>
          абвгдеёжзийклмнопрстуфхцчшщъыьэюя1234567890
        </Paragraph>
        <Paragraph letters>ABCDEFGHIJKLMNOPQRSTUVWXYZ</Paragraph>
      </Section>

      <Section>
        <Paragraph letters>
          {`!?:;#/\.,_‘’„“”-–—()[]{}«»‹›"'`}
          <Style number={1}>{`{}`}</Style>
          <Style number={2}>{`{}`}</Style>
          <Style number={3}>{`{}`}</Style>
          <Style number={4}>{`{}`}</Style>
        </Paragraph>
        <Paragraph letters>
          {`©®TM°&%$€₽£¥@+−×÷=><@`}
          <Style number={1}>@</Style>
          <Style number={2}>@</Style>
          <Style number={3}>@</Style>
          <Style number={4}>@</Style>
          <Style number={5}>@</Style>
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph letters>↑↗→↘↓↙←↖↔↕</Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered>
          <Style number={1}>зкты</Style>
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered>
          .<Style number={1}>,</Style>,<Style number={2}>,</Style>
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered>
          а если её маслом нашим, донским, полить да солью присыпать...
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered>
          а если её маслом нашим, донским, полить да солью присыпать...
        </Paragraph>
      </Section>

      <Section>
        <Paragraph outline>торты консервы крупы хлеб</Paragraph>
        <Paragraph outline>кисель сок мясо молоко</Paragraph>
      </Section>

      <Section centered>
        <Hover as={"p"} className={styles.paragraph}>
          <Default>Станиславского, 91</Default>

          <Hovered>
            С<Style number={1}>т</Style>аниславского<Style number={2}>,</Style>{" "}
            <Style number={1}>9</Style>1
          </Hovered>
        </Hover>
      </Section>
    </main>
  );
}
