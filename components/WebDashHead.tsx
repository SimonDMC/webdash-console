import Head from "next/head";

export default function WebDashHead() {
    return (
        <Head>
            <title>WebDash</title>
            <meta content="WebDash" property="og:title" />
            <meta content="A Web Dashboard for your Minecraft server" property="og:description" />
            <meta content="A Web Dashboard for your Minecraft server" name="description" />
            <meta content="%START_URL%" property="og:url" />
            <meta content="https://simondmc.com/media/imgs/covers/plugins/webdash-full.webp" property="og:image" />
            <meta content="#232c35" data-react-helmet="true" name="theme-color" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="apple-touch-icon" href="%START_URL%/icon-192.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="socket-port" content="%WEBSOCKET_PORT%" />
            <link rel="icon" href="favicon.ico" />
            <link rel="manifest" href="manifest.json" />
        </Head>
    );
}
