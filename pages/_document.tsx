// pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* load Tailwind CSS CDN asynchronously */}
          <script async src="https://cdn.tailwindcss.com"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}