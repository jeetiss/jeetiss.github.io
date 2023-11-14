export default function PageLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="main.css" rel="stylesheet"></link>
        <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PGDX74FW');`}</script>
      </head>

      <body>{children}</body>
    </html>
  );
}
