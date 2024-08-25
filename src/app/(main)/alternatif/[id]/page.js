import React from 'react'
import { detailAlternatif, findReview } from '@/utils/query'
import { Container } from '@/components/Container'
import Link from 'next/link'

const StarIcon = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      className="size-6"
    >
      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  )
}

const DetailAlternatif = async ({ params }) => {
  const review = await findReview(params.id)

  const alternatif = await detailAlternatif(params.id)

  return (
    <DetailAlternatifPage>
      <div className="mx-auto mt-12">
        <div>
          <h2 className="text-3xl font-bold leading-7 text-slate-900">
            {alternatif.name}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-xl font-semibold leading-6 text-slate-900">
              Rp. {alternatif.harga}
            </h3>
            <table className="text-slate-900">
              <tbody>
                <tr>
                  <td>Merk</td>
                  <td>:</td>
                  <td>{alternatif.merk}</td>
                </tr>
                <tr>
                  <td>Shade</td>
                  <td>:</td>
                  <td>{alternatif.shade}</td>
                </tr>
                <tr>
                  <td>Ketahanan</td>
                  <td>:</td>
                  <td>{alternatif.ketahanan} Jam</td>
                </tr>
                <tr>
                  <td>Coverage</td>
                  <td>:</td>
                  <td>{alternatif.coverage}</td>
                </tr>
                <tr>
                  <td>Jenis Kulit</td>
                  <td>:</td>
                  <td>{alternatif.jenisKulit}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold leading-6 text-slate-900">
                Review
              </h3>
              {review.length != 0 && <div>{review.length} Reviews</div>}
            </div>
            <div className='flex flex-col'>
              {review.length != 0 ? (
                review.map((item, index) => (
                  <div
                    key={index}
                    className="mt-4 flex flex-col gap-4 rounded-lg border p-4 text-slate-900"
                  >
                    <div className="text-lg font-semibold">
                      {item.user.username}
                    </div>
                    <div>{item.createdAt.toDateString()}</div>
                    <div>{item.review}</div>
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((rating, index) => (
                        <StarIcon
                          key={index}
                          fill={rating < item.rating ? '#fde047' : 'gray'}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>Belum ada review</div>
              )}
              <Link className='text-center w-full mt-4 text-lg font-bold' href={`/review/create?id=${params.id}`}>Tambah review +</Link>
            </div>
          </div>
        </div>
      </div>
    </DetailAlternatifPage>
  )
}

const DetailAlternatifPage = ({ children }) => {
  return (
    <div className="py-10 pb-12 pt-16">
      <Container>
        <div className="grid grid-cols-3 items-center">
          <Link
            className="text-xl font-semibold leading-7 text-pink-500"
            href="/alternatif"
          >
            {'<'} Kembali
          </Link>
          <h1 className="text-center text-4xl font-bold leading-7 text-slate-900">
            Detail Alternatif
          </h1>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default DetailAlternatif
