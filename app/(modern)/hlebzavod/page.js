import { Hlebozavod } from "@/components/font";
import { Hover, Hovered, Default } from "@/components/hover";
import styles from "./hlebzavod.module.css";

const cx = (...variants) => variants.filter(Boolean).join(" ");

const Style = ({ number, children }) => (
  <span style={{ fontFeatureSettings: `'ss0${number}'` }}>{children}</span>
);

const Section = ({ bg, small, centered, children }) => (
  <section className={styles.section}>
    <div
      className={cx(
        styles.section_body,
        centered && styles.section_body__centered
      )}
    >
      {children}
    </div>
    {bg && (
      <img
        className={cx(
          styles.section_image,
          small && styles.section_image__small
        )}
        src={bg}
      />
    )}
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
      outline && styles.paragraph__outline
    )}
    style={{ "--paragraph-color": color }}
  >
    {children}
  </p>
);

export default function Page() {
  return (
    <main className={cx(Hlebozavod.className, styles.font_size)}>
      <Section bg="images/mashina.png" centered>
        <Paragraph centered color="white">
          хлебозавод
          <br />
          (1927)
        </Paragraph>
      </Section>

      <Section>
        <Paragraph letters centered>
          абвгдеёжзийклмнопрстуфхцчшщъыьэюя1234567890
        </Paragraph>
        <Paragraph letters centered>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </Paragraph>
      </Section>

      <Section>
        <Paragraph letters centered>
          {`!?:;#/\.,_‘’„“”-–—()[]{}«»‹›"'`}
          <Style number={1}>{`{}`}</Style>
          <Style number={2}>{`{}`}</Style>
          <Style number={3}>{`{}`}</Style>
          <Style number={4}>{`{}`}</Style>
        </Paragraph>
        <Paragraph letters centered>
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

      <Section bg="images/hleb.png" centered>
        <Paragraph color="white">
          В первый день работы предприятия, 23 марта 1927 года, было выпечено
          120 пудов хлеба.
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered>
          .<Style number={1}>,</Style>,<Style number={2}>,</Style>
        </Paragraph>
      </Section>

      <Section bg="images/kid.png" small centered>
        <Paragraph centered color="white">
          а ты любишь
          <br />
          корочку?
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered>
          а если её маслом нашим, донским, полить да солью присыпать...
        </Paragraph>
      </Section>

      <Section bg="images/magaz.png" small>
        <Paragraph outline color="black">
          торты консервы крупы хлеб
        </Paragraph>
        <Paragraph outline color="red">
          кисель сок мясо молоко
        </Paragraph>
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

      <Section bg="images/mnogo-hleba.png" centered>
        <Paragraph color="white">
          <Style number={1}>the end</Style>
        </Paragraph>
      </Section>
    </main>
  );
}
