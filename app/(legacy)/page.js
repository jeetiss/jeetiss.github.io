import Link from "next/link";
import Script from "next/script";
import Font from "next/font/local";

const Hlebozavod = Font({ src: "../../public/Hlebozavod.woff" });

export default function Page() {
  return (
    <div className="legacy">
      <main className="full-width js-exps">
        <img
          src="https://avatars2.githubusercontent.com/u/6726016?s=460&v=4"
          alt="image of my face"
        />

        <h1 className={Hlebozavod.className} style={{ maxWidth: 700 }}>
          Dmitry Ivakhnenko.
        </h1>
      </main>

      <footer className="full-width">
        <p>Contacts</p>

        <ul className="reset contacts">
          <li>
            <Link href="/mpts">make package tree shakable</Link>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/jeetiss">
              Twitter
            </a>
          </li>
          <li>
            <a target="_blank" href="https://t.me/jeetiss">
              Telegram
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/jeetiss">
              Github
            </a>
          </li>
          <li>
            <a target="_blank" href="mailto:jeetiss@ya.ru">
              Mail
            </a>
          </li>
        </ul>
      </footer>

      <Script strategy="lazyOnload" src="main.js" />
    </div>
  );
}
