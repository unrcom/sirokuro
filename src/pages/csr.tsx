import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { Taisen } from '../types/types'
import { Layout } from '../components/Layout'

const Csr: NextPage = () => {
  const [taisen, setTaisen] = useState<Taisen[]>([])
  useEffect(() => {
    const getTaisen = async () => {
      const { data: taisen } = await supabase
        .from('taisen')
        .select('*')
        .order('created_at', { ascending: true })
      setTaisen(taisen as Taisen[])
    }
    getTaisen()
  }, [])

  return (
    <Layout title="対戦 (SSG + CSR)">
      <p className="mb-3 text-blue-500">現在対戦中 (SSG + CSR)</p>
      <ul className="mb-3">
        {taisen.map((taisen) => {
          return (
            <li key={taisen.id}>
              <p className="text-lg font-extrabold">{taisen.title}</p>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Csr
