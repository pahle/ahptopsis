import React from 'react'
import { Container } from '@/components/Container'
import { AHP } from '@/utils/calculation'
import { editKriteria } from '@/utils/query'
import Link from 'next/link'

const Kriteria = async () => {
  const ahp = await AHP()

  return (
    <div className="flex w-full flex-col items-center">
      <form action={editKriteria} className="mt-12 flex w-full gap-4">
        <select
          name="kriteria"
          id="kriteria"
          className="w-full rounded-lg border border-gray-400 p-2"
        >
          <option value="HM">Harga terhadap Merk</option>
          <option value="HS">Harga terhadap Shade</option>
          <option value="HK">Harga terhadap Ketahanan</option>
          <option value="HC">Harga terhadap Coverage</option>
          <option value="HJ">Harga terhadap Jenis Kulit</option>
          <option value="MS">Merk terhadap Shade</option>
          <option value="MK">Merk terhadap Ketahanan</option>
          <option value="MC">Merk terhadap Coverage</option>
          <option value="MJ">Merk terhadap Jenis Kulit</option>
          <option value="SK">Shade terhadap Ketahanan</option>
          <option value="SC">Shade terhadap Coverage</option>
          <option value="SJ">Shade terhadap Jenis Kulit</option>
          <option value="KC">Ketahanan terhadap Coverage</option>
          <option value="KJ">Ketahanan terhadap Jenis Kulit</option>
          <option value="CJ">Coverage terhadap Jenis Kulit</option>
        </select>
        <select
          name="bobot"
          id="bobot"
          className="w-full rounded-lg border border-gray-400 p-2"
        >
          <option value={1 / 5}>1/5 Strong Unimportance</option>
          <option value={1 / 4}>1/4 Strong to Moderate Unimportance</option>
          <option value={1 / 3}>1/3 Moderate Unimportance</option>
          <option value={1 / 2}>1/2 Moderate to Low Unimportance</option>
          <option value={1}>1 Equal Importance</option>
          <option value={2}>2 Equal to Moderate Importance</option>
          <option value={3}>3 Moderate Importance</option>
          <option value={4}>4 Moderate to Strong Importance </option>
          <option value={5}>5 Strong Importance</option>
        </select>
        <button
          type="submit"
          className="w-24 self-center rounded-lg border border-pink-500 p-2 text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
        >
          Submit
        </button>
      </form>
      <section className="mt-12 w-full">
        <h2>Tabel Perbandingan Kriteria</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Kriteria</th>
              <th>Harga</th>
              <th>Merk</th>
              <th>Shade</th>
              <th>Ketahanan</th>
              <th>Coverage</th>
              <th>Jenis Kulit</th>
            </tr>
          </thead>
          <tbody>
            {ahp.tabel.map((row, index) => (
              <tr key={index}>
                <td>
                  {
                    [
                      'Harga',
                      'Merk',
                      'Shade',
                      'Ketahanan',
                      'Coverage',
                      'Jenis Kulit',
                    ][index]
                  }
                </td>
                {row.map((column, index) => (
                  <td key={index}>{column.toFixed(4).replace(/\.?0+$/, '')}</td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-300">
              <td>Jumlah Bobot</td>
              {ahp.jumlahBobot.map((bobot, index) => (
                <td key={index}>{bobot}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <div className="flex w-full justify-between gap-4">
          <div className="w-full rounded-lg border border-gray-400 px-3 py-2">
            <h2>Uji Konsistensi</h2>

            <p>λ max = {ahp.lambdaMax}</p>
            <p>CI = {ahp.consistencyIndex}</p>
            <p>CR = {ahp.consistencyRatio}</p>
          </div>
          <div className="w-full rounded-lg border border-gray-400 px-3 py-2">
            <h2>Hasil</h2>

            {ahp.konsisten ? (
              <p className="text-green-500">Konsisten</p>
            ) : (
              <p className="text-red-500">
                Tidak Konsisten
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

const KriteriaPage = () => {
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
            Kriteria
          </h1>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <Container>
          <Kriteria />
        </Container>
      </div>
    </div>
  )
}

export default KriteriaPage
