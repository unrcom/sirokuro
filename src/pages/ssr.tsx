import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Taisen } from '../types/types'

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSideProps/ssg invoked')
  const { data: taisens } = await supabase
    .from('taisen')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { taisens } }
}

type StaticProps = {
  taisens: Taisen[]
}

const Ssr: NextPage<StaticProps> = ({ taisens }) => {
  const router = useRouter()
  return (
    <Layout title="対戦 (SSR)">
      <p className="mb-3 text-blue-500">現在対戦中 (SSR)</p>
      <ul className="mb-3">
        {taisens.map((taisen) => {
          return (
            <li key={taisen.id}>
              <p className="text-lg font-extrabold">{taisen.title}</p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssg" prefetch={false}>
        <a className="my-3 text-xs"> Link to ssg</a>
      </Link>
      <Link href="/isr" prefetch={false}>
        <a className="mb-3 text-xs"> Link to isr</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
        Route to ssg
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push('/isr')}>
        Route to isr
      </button>
    </Layout>
  )
}

export default Ssr
