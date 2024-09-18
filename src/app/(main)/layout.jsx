import Link from 'next/link'
import { Container } from '@/components/Container'

import { Waveform } from '@/components/Waveform'

import ButtonLogOut from '@/components/ButtonLogOut'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function MainLayout({ children }) {
  if (!cookies().get('session')) {
    redirect('/landing')
  }
  return (
    <>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:border-t-0">
        <Waveform className="absolute left-0 top-0 -z-20 h-20 w-full" />
        <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
          <Container>
            <div className="flex justify-between">
              <Link
                className="text-2xl font-bold leading-7 text-slate-900"
                href="/"
              >
                AHP TOPSIS
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/kriteria">Kriteria</Link>
                <Link href="/alternatif">Alternatif</Link>
                <Link href="/perhitungan">Perhitungan</Link>
                {
                  cookies().get('role') === 'admin' ? (
                    <Link href="/uji-kriteria/harga">Uji Kriteria</Link>
                  ) : null
                }
                <ButtonLogOut />
              </div>
            </div>
          </Container>
        </div>
        <div className="relative">{children}</div>
      </main>
    </>
  )
}
