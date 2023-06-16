export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="main.css" rel="stylesheet"></link>
      </head>

      <body>{children}</body>
    </html>
  );
}
