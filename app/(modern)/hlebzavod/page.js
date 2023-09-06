import { Hlebozavod, Inter } from "@/components/font";
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
  strokeColor = "transparent",
  strokeWidth = 2,
}) => (
  <p
    className={cx(
      styles.paragraph,
      letters && styles.paragraph__letters,
      centered && styles.paragraph__centered,
      outline && styles.paragraph__outline
    )}
    style={{
      "--paragraph-color": color,
      "--stroke-color": strokeColor,
      "--stroke-width": `${strokeWidth}px`,
    }}
  >
    {children}
  </p>
);

export default function Page() {
  return (
    <main className={cx(Hlebozavod.className, styles.font_size)}>
      <Section bg="images/mashina.png" centered>
        <Paragraph
          centered
          outline
          color="white"
          strokeColor="#6b6b6b"
          strokeWidth={1}
        >
          хлебозавод
          <br />
          (1927)
        </Paragraph>
      </Section>

      <Section>
        <div className={cx(Inter.className)} style={{ fontSize: 24}}>Глифы:</div>
        <Paragraph letters>
          абвгдеёжз<Style number={1}>з</Style>
          ийк<Style number={1}>к</Style>
          лмнопрст<Style number={1}>т</Style>
          уфхцчшщъы<Style number={1}>ы</Style>ьэюя12<Style number={1}>2</Style>
          3456<Style number={1}>6</Style>789<Style number={1}>9</Style>0ABCD
          <Style number={1}>D</Style>EF<Style number={1}>F</Style>GH
          <Style number={1}>H</Style>I<Style number={1}>I</Style>J
          <Style number={1}>J</Style>KL<Style number={1}>L</Style>MNOP
          <Style number={1}>P</Style>QRSTUVWXYZ.<Style number={1}>,</Style>,
          <Style number={2}>,</Style>
          {`!?:;#/_‘’„“”-–—«»‹›"'()[]{}`}
          <Style number={1}>{`{}`}</Style>
          <Style number={2}>{`{}`}</Style>
          <Style number={3}>{`{}`}</Style>
          <Style number={4}>{`{}`}</Style>
          {`©®TM°&%$€₽£¥@+−×÷=><@`}
          <Style number={1}>@</Style>
          <Style number={2}>@</Style>
          <Style number={3}>@</Style>
          <Style number={4}>@</Style>
          <Style number={5}>@</Style>
          ↑↗→↘↓↙←↖↔↕
          <Style number={1}>↑↗→↘↓↙←↖↔↕</Style>
          <Style number={2}>↑↗→↘↓↙</Style>
          <Style number={3}>↗↘</Style>
          <Style number={4}>↑</Style>
        </Paragraph>
      </Section>

      <Section bg="images/hleb.png" centered>
        <Paragraph color="white">
          В первый день работы предприятия, 23 марта 1927 года, было выпечено
          120 пудов хлеба.
        </Paragraph>
      </Section>

      <Section centered>
        <Paragraph centered></Paragraph>
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
        <Paragraph outline color="white" strokeColor="black">
          торты консервы крупы хлеб
        </Paragraph>
        <Paragraph outline color="white" strokeColor="red">
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
        <Paragraph outline color="white" strokeColor="#6b6b6b" strokeWidth={1}>
          <Style number={1}>the end</Style>
        </Paragraph>
      </Section>
    </main>
  );
}
