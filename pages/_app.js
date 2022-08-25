import Layout from '../layout/Layout'
// import Head from "next/head";

import '../styles/globals.css'

function MyApp({ Component, pageProps  }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp
