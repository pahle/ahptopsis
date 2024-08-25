import React from 'react'
import { AHP, Topsis } from '@/utils/calculation'
import { Container } from '@/components/Container'
import Link from 'next/link'

const Perhitungan = async () => {
    const ahp = await AHP()
    const topsis = await Topsis()
  return (
    <div className="flex flex-col items-center text-center py-20">
      <section className="mt-12">
        <h2>Ranking Cushion</h2>
        <table className="[&>*>*>*]:border-2 [&>*>*>*]:p-4">
            <thead>
                <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Ranking</th>
                </tr>
            </thead>
            <tbody>
                {topsis.ranking.map((data, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.nama}</td>
                        <td>{data.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </section>
    </div>
  )
}

const PerhitunganPage = () => {
  return (
    <div className="py-10 pb-12 pt-16">
      <Container>
        <div className="grid grid-cols-3 items-center">
          <Link
            className="text-xl font-semibold leading-7 text-pink-500"
            href="/"
          >
            {'<'} Kembali
          </Link>
          <h1 className="text-center text-4xl font-bold leading-7 text-slate-900">
            Perhitungan
          </h1>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <Container>
          <Perhitungan />
        </Container>
      </div>
    </div>
  )
}

export default PerhitunganPage