import { Container } from '@/components/Container'
import Link from 'next/link'

// Data you provided (hardcoded directly for display)
const data = {
  tabel: [
    [1, 1, 4, 3, 2, 4, 1, 3, 4, 1], // Skintific
    [1, 1, 4, 3, 2, 4, 1, 3, 4, 1], // Somethinc Hooman
    [0.25, 0.25, 1, 0.5, 0.5, 1, 0.25, 2, 1, 0.25], // Instaperfect
    [0.333333333, 0.333333333, 2, 1, 0.5, 2, 0.333333333, 1, 2, 0.333333333], // Salsa
    [0.5, 0.5, 2, 2, 1, 2, 0.5, 2, 2, 0.5], // Wardah
    [0.25, 0.25, 1, 0.5, 0.5, 1, 0.25, 0.5, 1, 0.25], // Barenbliss
    [1, 1, 4, 3, 2, 4, 1, 3, 4, 1], // The Originote
    [0.333333333, 0.333333333, 2, 1, 0.5, 2, 0.333333333, 1, 2, 0.333333333], // True to Skin
    [0.25, 0.25, 1, 0.5, 0.5, 1, 0.25, 0.5, 1, 0.25], // Goute
    [1, 1, 4, 3, 2, 4, 1, 3, 4, 1], // E
  ],

  tabelNama: [
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
  ],
}

const reshapeArray = (array) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]))
}

const jumlahBobot = data.tabel[0].map((_, index) => {
  return data.tabel
    .reduce((acc, row) => acc + row[index], 0)
    .toFixed(4)
    .replace(/\.?0+$/, '')
})

const reshapedTabelPerbandingan = reshapeArray(data.tabel)

const normalisasi = reshapedTabelPerbandingan.map((column, index) => {
  return column.map((column) => {
    return parseFloat(
      (column / jumlahBobot[index]).toFixed(4).replace(/\.?0+$/, ''),
    )
  })
})

const reshapeNormalisasi = reshapeArray(normalisasi)

console.log(normalisasi)

export const weight = reshapeNormalisasi.map((row, index) => {
  return row
    .reduce((acc, val) => acc + val / 10, 0)
    .toFixed(4)
    .replace(/\.?0+$/, '')
})

console.log(weight)
function UjiHarga() {
  return (
    <div className="flex w-full flex-col items-center">
      <section className="mt-12 w-full">
        <h2>Tabel Perbandingan Harga</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Harga</th>
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
            {data.tabel.map((row, index) => (
              <tr key={index}>
                <td>{data.tabelNama[index]}</td>
                {row.map((column, index) => (
                  <td key={index}>{column.toFixed(4).replace(/\.?0+$/, '')}</td>
                ))}
              </tr>
            ))}
            {/* jumlah bobot */}
            <tr>
              <td>Jumlah</td>
              {data.tabel[0].map((column, index) => (
                <td key={index}>
                  {data.tabel
                    .reduce((acc, row) => acc + row[index], 0)
                    .toFixed(4)
                    .replace(/\.?0+$/, '')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-12 w-full">
        <h2>Tabel Normalisasi</h2>
        <table className="w-full text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>Harga</th>
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
              <th>W</th>
            </tr>
          </thead>
          <tbody>
            {reshapeNormalisasi.map((row, index) => (
              <tr key={index}>
                <td>{data.tabelNama[index]}</td>
                {row.map((column, index) => (
                  <td key={index}>{column}</td>
                ))}
                <td>{weight[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

const UjiHargaPage = () => {
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
            Uji Kriteria Coverage
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
        <Container>
          <UjiHarga />
        </Container>
      </div>
    </div>
  )
}

export default UjiHargaPage
