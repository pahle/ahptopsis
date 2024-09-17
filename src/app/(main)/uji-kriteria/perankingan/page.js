import { weight as weightHarga } from '../harga/page'
import { weight as weightMerk } from '../merk/page'
import { weight as weightShade } from '../shade/page'
import { weight as weightKetahanan } from '../ketahanan/page'
import { weight as weightCoverage } from '../coverage/page'
import { weight as weightJenisKulit } from '../jenis-kulit/page'
import Link from 'next/link'
import { Container } from '@/components/container'

const tabelNama = [
  'Skintific',
  'Somethinc',
  'Instaperfect',
  'Salsa',
  'Wardah',
  'Barenbliss',
  'Originote',
  'True to Skin',
  'Goute',
  'Esqa',
]

const rank = tabelNama.map((alternatif, index) => {
  return {
    alternatif,
    hasil: (
      parseFloat(weightHarga[index]) +
      parseFloat(weightMerk[index]) +
      parseFloat(weightShade[index]) +
      parseFloat(weightKetahanan[index]) +
      parseFloat(weightCoverage[index]) +
      parseFloat(weightJenisKulit[index])
    )
      .toFixed(4)
      .replace(/\.?0+$/, ''),
  }
})

rank.sort((a, b) => b.hasil - a.hasil)

console.log(rank)

const Perankingan = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 sm:px-6 md:max-w-7xl md:px-4 lg:px-0">
      <section className="mt-12 w-full">
        <h2>Ranking</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Bobot Gabungan</th>
              <th>Skintific</th>
              <th>Somethinc</th>
              <th>Instaperfect</th>
              <th>Salsa</th>
              <th>Wardah</th>
              <th>Barenbliss</th>
              <th>Originote</th>
              <th>True to Skin</th>
              <th>Goute</th>
              <th>Esqa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Harga</td>
              {weightHarga.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
            <tr>
              <td>Merk</td>
              {weightMerk.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
            <tr>
              <td>Shade</td>
              {weightShade.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
            <tr>
              <td>Ketahanan</td>
              {weightKetahanan.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
            <tr>
              <td>Coverage</td>
              {weightCoverage.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
            <tr>
              <td>Jenis Kulit</td>
              {weightJenisKulit.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
            <tr>
              <td>Jumlah</td>
              {weightHarga.map((column, index) => (
                <td key={index}>
                  {(
                    parseFloat(column) +
                    parseFloat(weightMerk[index]) +
                    parseFloat(weightShade[index]) +
                    parseFloat(weightKetahanan[index]) +
                    parseFloat(weightCoverage[index]) +
                    parseFloat(weightJenisKulit[index])
                  )
                    .toFixed(4)
                    .replace(/\.?0+$/, '')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
      <section className="mt-12 w-full">
        <h2>Hasil Perankingan</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Alternatif</th>
              <th>Hasil</th>
            </tr>
          </thead>
          <tbody>
            {rank.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.alternatif}</td>
                <td>{row.hasil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

const PerankinganPage = () => {
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
            Perankingan
          </h1>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="flex items-center justify-center gap-4">
          <Link href="/uji-kriteria/harga">Harga</Link>
          <Link href="/uji-kriteria/merk">Merk</Link>
          <Link href="/uji-kriteria/shade">Shade</Link>
          <Link href="/uji-kriteria/ketahanan">Ketahanan</Link>
          <Link href="/uji-kriteria/coverage">Coverage</Link>
          <Link href="/uji-kriteria/jenis-kulit">Jenis Kulit</Link>
          <Link href="/uji-kriteria/perankingan">Perankingan</Link>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <div>
          <Perankingan />
        </div>
      </div>
    </div>
  )
}

export default PerankinganPage
