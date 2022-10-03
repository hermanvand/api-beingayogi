import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{backgroundColor: "#e8e3d9", color: "#828290", padding: 10, height: "100vh", textAlign: "center"}}>
      <Head>
        <title>Being a yogi API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Interested in being a yogi?</h2>
      <Link href="https://www.beingayogi.org/"><a style={{color: "blue"}}>visit beingayogi.org</a></Link> or <Link href="https://www.beingayogi.org/app"><a style={{color: "blue"}}>download the app</a></Link>

    </div>
  )
}
