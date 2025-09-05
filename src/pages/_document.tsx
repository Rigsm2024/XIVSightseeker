import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "XIVSightseeker",
    "description": "FFXIV 新生の探検手帳特化型攻略サイト。時間と天候を加味して今どの項目が達成可能なのかを提示します。",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "creator": {
      "@type": "Organization",
      "name": "XIVSightseeker Team"
    }
  };

  return (
    <Html lang="ja">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}