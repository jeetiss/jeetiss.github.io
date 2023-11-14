import Script from "next/script";

export default function PageLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="gtm.js" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
