import NoSSR from "@/components/NoSSR";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NoSSR>
            <Component {...pageProps} />
        </NoSSR>
    );
}
