import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Taisen } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/isr invoked')
  const { data: taisen } = await supabase
    .from('taisen')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { taisen }, revalidate: 5 }
}
type StaticProps = {
  taisen: Taisen[]
}

const Isr: NextPage<StaticProps> = ({ taisen }) => {
  const router = useRouter()
  return (
    <Layout title="対戦 (ISR)">
      <p className="mb-3 text-indigo-500">現在対戦中 (ISR)</p>
      <ul className="mb-3">
        {taisen.map((taisen) => {
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

export default Isr
