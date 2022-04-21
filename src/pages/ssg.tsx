import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Taisen } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
  const { data: taisens } = await supabase
    .from('taisen')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { taisens } }
}

type StaticProps = {
  taisens: Taisen[]
}

const Ssg: NextPage<StaticProps> = ({ taisens }) => {
  const router = useRouter()
  return (
    <Layout title="対戦 (SSG)">
      <p className="mb-3 text-blue-500">現在対戦中 (SSG)</p>
      <ul className="mb-3">
        {taisens.map((taisen) => {
          return (
            <li key={taisen.id}>
              <p className="text-lg font-extrabold">{taisen.title}</p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs"> Link to ssr</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to ssr
      </button>
    </Layout>
  )
}

export default Ssg
