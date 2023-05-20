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
                content="width=device-width, initial-scale=1"
            />
            <link
                rel="icon"
                href="https://simondmc.com/media/webdash-favicon.png"
            />
        </Head>
    );
}
