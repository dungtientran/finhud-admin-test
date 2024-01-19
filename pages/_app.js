import 'antd/dist/reset.css';
import '@/styles/antd-overide.css'
import '@/styles/globals.css'
import Layout from '@/components/Layout/Layout';
import { SWRConfig } from 'swr';
import { useEffect, useState } from 'react';
import SearchContextProvider from '@/context/searchContext';
export default function App({ Component, pageProps }) {

  if(Component.getLayout){
    return Component.getLayout(
      <SearchContextProvider>
        <SWRConfig value={{ provider: () => new Map() }}>
          <Component {...pageProps} />
        </SWRConfig>
      </SearchContextProvider>
    )
  }
  return (
    <SearchContextProvider>
      <SWRConfig value={{ provider: () => new Map() }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SearchContextProvider>
  )
}
