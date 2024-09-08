import React from 'react'
import { AHP, Topsis } from '@/utils/calculation'
import { Container } from '@/components/Container'
import Link from 'next/link'

const Perhitungan = async () => {
  const ahp = await AHP()

  const topsis = await Topsis()

  return (
    <div className="my-12 flex flex-col items-center text-center">
      <h1 className="text-2xl font-semibold">AHP</h1>
      <section className="mt-12 w-full">
        <h2 className="text-start">Tabel Perbandingan Kriteria</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Kriteria</th>
              {ahp.tabel.map((item, index) => (
                <th key={index}>
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
                </th>
              ))}
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
        <h2 className="text-start">Normalisasi Tabel Perbandingan Kriteria</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Kriteria</th>
              {ahp.tabel.map((item, index) => (
                <th key={index}>
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
                </th>
              ))}
              <th className="bg-slate-300">Bobot Prioritas</th>
            </tr>
          </thead>
          <tbody>
            {ahp.normalisasi.map((row, index) => (
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
                {ahp.bobotPrioritas[index] && (
                  <td className="bg-slate-300">
                    {ahp.bobotPrioritas[index].toFixed(4).replace(/\.?0+$/, '')}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Tabel Consistency</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Kriteria</th>
              {ahp.tabel.map((item, index) => (
                <th key={index}>
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
                </th>
              ))}
              <th className="bg-slate-300">Sum</th>
              <th className="bg-slate-300">Bobot Prioritas</th>
              <th className="bg-slate-300">Consistency Measures (Sum / BP)</th>
            </tr>
          </thead>
          <tbody>
            {ahp.consistency.map((row, index) => (
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
                <td className="bg-slate-300">
                  {ahp.sumConsistency[index].toFixed(4).replace(/\.?0+$/, '')}
                </td>
                <td className="bg-slate-300">
                  {ahp.bobotPrioritas[index].toFixed(4).replace(/\.?0+$/, '')}
                </td>
                <td className="bg-slate-300">
                  {ahp.consistencyMeasures[index]
                    .toFixed(4)
                    .replace(/\.?0+$/, '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Consistency</h2>
        <div className="flex w-full justify-between gap-4">
          <div className="w-full rounded-lg border border-gray-400 px-3 py-2">
            <h2>Uji Konsistensi</h2>
            <div className="flex items-center justify-center">
              <table>
                <tbody>
                  <tr>
                    <td>λ max</td>
                    <td>=</td>
                    <td className="text-start">Total CM / Total Kriteria</td>
                    {/* <p>λ max = Total CM / Total Kriteria {ahp.lambdaMax}</p> */}
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">
                      {ahp.consistencyMeasures.reduce((a, b) => a + b, 0)} / 6
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">{ahp.lambdaMax}</td>
                  </tr>
                  <tr>
                    <td>CI</td>
                    <td>=</td>
                    <td className="text-start">
                      (λ max - Total Kriteria) / (Total Kriteria - 1)
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">
                      ({ahp.lambdaMax} - 6) / (6 - 1)
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">{ahp.consistencyIndex}</td>
                  </tr>
                  <tr>
                    <td>RI</td>
                    <td>=</td>
                    <td className="text-start">
                      Nilai Random Index 6 Kriteria
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">1.24</td>
                  </tr>
                  <tr>
                    <td>CR</td>
                    <td>=</td>
                    <td className="text-start">CI / RI</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">
                      {ahp.consistencyIndex} / 1.24
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>=</td>
                    <td className="text-start">{ahp.consistencyRatio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full rounded-lg border border-gray-400 px-3 py-2">
            <h2>Hasil</h2>
            {ahp.konsisten ? (
              <p className="s text-green-500">Konsisten</p>
            ) : (
              <p className="text-red-500">Tidak Konsisten</p>
            )}
          </div>
        </div>
      </section>

      <h1 className="mt-12 text-2xl font-semibold">Topsis</h1>
      <section className="mt-12 w-full">
        <h2 className="text-start">Tabel Alternatif</h2>
        <table className="object-contain text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Merk</th>
              <th>Shade</th>
              <th>Ketahanan</th>
              <th>Coverage</th>
              <th>Jenis Kulit</th>
            </tr>
          </thead>
          <tbody>
            {topsis.tabelDataAwal.map((data, indexData) => (
              <tr key={indexData}>
                {data.slice(1).map((item, index) => (
                  <td key={index}>{index === 5 ? `${item} Jam` : item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Tabel Konversi Alternatif</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Alternatif</th>
              <th>Harga</th>
              <th>Merk</th>
              <th>Shade</th>
              <th>Ketahanan</th>
              <th>Coverage</th>
              <th>Jenis Kulit</th>
            </tr>
          </thead>
          <tbody>
            {topsis.tabelData.map((row, index) => (
              <tr key={index}>
                {topsis.tabelDataAwal[index] && (
                  <td>{topsis.tabelDataAwal[index][1]}</td>
                )}
                {row.map((column, index) => (
                  <td key={index}>{column}</td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-300">
              <td>Denominator</td>
              {topsis.denominator.map((column, index) => (
                <td key={index}>{column.toFixed(4).replace(/\.?0+$/, '')}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Normalisasi Alternatif</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr className="bg-slate-300">
              <th>Bobot Prioritas</th>
              {ahp.bobotPrioritas.map((bobot, index) => (
                <th key={index}>{bobot.toFixed(4).replace(/\.?0+$/, '')}</th>
              ))}
            </tr>
            <tr>
              <th>Alternatif</th>
              <th>Harga</th>
              <th>Merk</th>
              <th>Shade</th>
              <th>Ketahanan</th>
              <th>Coverage</th>
              <th>Jenis Kulit</th>
            </tr>
          </thead>
          <tbody>
            {topsis.normalisasiTopsis.map((row, index) => (
              <tr key={index}>
                {topsis.tabelDataAwal[index] && (
                  <td>{topsis.tabelDataAwal[index][1]}</td>
                )}
                {row.map((column, index) => (
                  <td key={index}>{column}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Normalisasi Bobot Alternatif</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Alternatif</th>
              <th>Harga</th>
              <th>Merk</th>
              <th>Shade</th>
              <th>Ketahanan</th>
              <th>Coverage</th>
              <th>Jenis Kulit</th>
            </tr>
          </thead>
          <tbody>
            {topsis.normalisasiBobot.map((row, index) => (
              <tr key={index}>
                {topsis.tabelDataAwal[index] && (
                  <td>{topsis.tabelDataAwal[index][1]}</td>
                )}
                {row.map((column, index) => (
                  <td key={index}>{column}</td>
                ))}
              </tr>
            ))}
            <tr className="bg-slate-300">
              <td>Ideal Positif</td>
              {topsis.idealPositif.map((column, index) => (
                <td key={index}>{column.toFixed(4).replace(/\.?0+$/, '')}</td>
              ))}
            </tr>
            <tr className="bg-slate-300">
              <td>Ideal Negatif</td>
              {topsis.idealNegatif.map((column, index) => (
                <td key={index}>{column.toFixed(4).replace(/\.?0+$/, '')}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Distance Positif & Negatif</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Alternatif</th>
              <th>Distance Positif</th>
              <th>Distance Negatif</th>
            </tr>
          </thead>
          <tbody>
            {topsis.tabelDataAwal.map((data, index) => (
              <tr key={index}>
                <td>{data[1]}</td>
                <td>
                  {topsis.distancePositif[index]
                    .toFixed(4)
                    .replace(/\.?0+$/, '')}
                </td>
                <td>
                  {topsis.distanceNegatif[index]
                    .toFixed(4)
                    .replace(/\.?0+$/, '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2 className="text-start">Ranking Cushion</h2>
        <table className="w-full [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Performance Score</th>
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
