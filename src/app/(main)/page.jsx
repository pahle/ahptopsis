import { Container } from '@/components/Container'
import { findUser } from '@/utils/query'
import { cookies } from 'next/headers'
import { dataReview } from '@/utils/query'
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

export default async function Home() {
  const user = await findUser(cookies().get('id').value)

  const reviews = await dataReview()
  return (
    <div className="py-10 pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Selamat datang, {user.username}!
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        <Container>
          <h2 className="text-2xl font-bold leading-7 text-slate-900 mt-12">
            Review
          </h2>
          <div className="flex flex-col">
            {reviews.length != 0 ? (
              reviews.map((item, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-col gap-4 rounded-lg border p-4 text-slate-900"
                >
                  <div className='flex justify-between'>
                  {item.user.username}
                    <Link
                      href={`/alternatif/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {item.alternatif.name}
                    </Link>
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
          </div>
        </Container>
      </div>
    </div>
  )
}
