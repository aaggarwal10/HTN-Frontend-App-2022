import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_EVENTS_QUERY } from '../lib/queries';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home({ events }) {
  const {theme,setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className='text-4xl'> Hello, world!</h1>
    <button className='px-6 py-2 bg-black dark:bg-white text-white dark:text-black' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle
    </button>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.hackthenorth.com/v3/graphql',
    cache: new InMemoryCache
  });
  const { data } = await client.query({
    query: GET_ALL_EVENTS_QUERY
  });
  return {
    props: {
      events: data.sampleEvents
    }
  };
}