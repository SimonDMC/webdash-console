import Head from "next/head";

export default function WebDashHead() {
    return (
        <Head>
            <title>WebDash</title>
            <meta
                name="description"
                content="A Web Dashboard for your Minecraft server"
            />
            <meta
                name="viewport"
                content="width=device-width, user-scalable=no"
            />
            <meta name="socket-port" content="%WEBSOCKET_PORT%" />
            {/* <meta name="socket-port" content="26667" /> */}
            <link
                rel="icon"
                href="https://simondmc.com/media/webdash-favicon.png"
            />
        </Head>
    );
}
