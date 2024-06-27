import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/globals.css';
import { ToastProvider } from '@/contexts/toastContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<Head>
				<title>Teste Front-End - BNP</title>
			</Head>

			<Component {...pageProps} />
		</ToastProvider>
	);
}

