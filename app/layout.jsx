'use client';
import "./globals.css";
import { store } from "@/redux/store";
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Spinner from '@/components/Spinner'
import Head from 'next/head';


let persistor = persistStore(store);
export default function RootLayout({ children }) {
  return (
    <html lang="en">
   <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple way to manage tasks built with Next.js" />
      </Head>
 
      <body >
      <Provider store={store}>
      <PersistGate loading={<div><Spinner /></div>}  persistor={persistor}>
          {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}