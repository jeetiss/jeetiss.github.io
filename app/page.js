import Script from "next/script";

export default function Page() {
  return (
    <div className="legacy">
      <main className="full-width js-exps">
        <img
          src="https://avatars2.githubusercontent.com/u/6726016?s=460&v=4"
          alt="image of my face"
        />

        <h1 style={{ maxWidth: 700 }}>Hi 👋🏻, I'm Dmitry Ivakhnenko.</h1>
      </main>

      <footer className="full-width">
        <p>Contacts</p>

        <ul className="reset contacts">
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
