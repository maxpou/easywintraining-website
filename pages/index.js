import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Easywintraining games</title>
      </Head>

      <Header/>
      <main className="main">
        <div className="grid">
          
        </div>
      </main>
      <Footer/>
    </div>
  )
}