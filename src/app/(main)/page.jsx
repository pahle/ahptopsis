import { Container } from '@/components/Container'

export default function Home() {

  return (
    <div className="py-10 pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Dashboard
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        <Container>
          <div className="flex justify-between gap-4 py-10 sm:py-12">
            <div className="w-full bg-red-500">
              <p>a</p>
              <p>a</p>
              <p>a</p>
              <p>a</p>
            </div>
            <p className="w-full bg-red-500">a</p>
          </div>
        </Container>
      </div>
      
    </div>
  )
}