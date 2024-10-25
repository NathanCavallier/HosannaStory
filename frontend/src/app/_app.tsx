// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageTransition from '@/components/PageTransition';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PageTransition>
            <Component {...pageProps} />
        </PageTransition>
    );
}

export default MyApp;