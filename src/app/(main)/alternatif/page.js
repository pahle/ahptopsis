import React from 'react'
import { Topsis } from '@/utils/calculation'
import { Container } from '@/components/Container'
import DeleteButton from './DeleteButton'
import Link from 'next/link'
import { cookies } from 'next/headers'

const Alternatif = async () => {
  const topsis = await Topsis()

  return (
    <div className="flex w-full flex-col items-center">
      <section className="mt-12">
        <h2>Tabel Alternatif</h2>
        <table className="object-contain text-center [&>*>*>*]:border-2 [&>*>*>*]:p-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Merk</th>
              <th>Shade</th>
              <th>Ketahanan</th>
              <th>Coverage</th>
              <th>Jenis Kulit</th>
              <th colSpan={3}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {topsis.tabelDataAwal.map((data, indexData) => (
              <tr key={indexData}>
                <td>{indexData + 1}</td>
                {data.slice(1).map((item, index) => (
                  <td key={index}>{index === 5 ? `${item} Jam` : item}</td>
                ))}
                <td>
                  <Link
                    href={`/alternatif/${data[0]}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Detail
                  </Link>
                </td>
                {cookies().get('session').value == 'admin' && (
                  <>
                    <td className="relative whitespace-nowrap text-center text-sm font-medium">
                      <Link
                        href={`/alternatif/edit?id=${data[0]}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <DeleteButton id={data[0]} />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

const AlternatifPage = () => {
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
            Alternatif
          </h1>
          <div className='w-full text-end'>
          {cookies().get('session').value == 'admin' && (
            <Link
              href="/alternatif/create"
              className="text-xl font-semibold leading-7 text-pink-500"
            >
              Tambah +
            </Link>
          )}
          </div>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <Container>
          <Alternatif />
        </Container>
      </div>
    </div>
  )
}

export default AlternatifPage
