import React from 'react'
import Image from 'next/image'
import poster from '@/images/poster.png'

const Home = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex h-screen items-center justify-between">
        <div className="flex flex-col gap-4 tracking-wider w-1/2 ">
          <p className="text-slate-500">Welcome,</p>
          <h1 className="text-5xl font-semibold leading-[60px] text-slate-900">
            Sistem Pendukung
            <br />
            Keputusan
            <br />
            Pemilihan Cushion
          </h1>
          <p className="text-slate-500">
            Selamat datang di Sistem Pendukung Keputusan Pemilihan
            <br />
            Cushion, temukan cushion yang kamu cari disini!
          </p>
          <div className="mt-4 flex gap-8 font-semibold text-slate-500">
            <a
              href="/login"
              className="rounded-full border border-[#4D6181] px-4 py-2"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded-full border border-[#4D6181] px-4 py-2"
            >
              Register
            </a>
          </div>
        </div>
        <div className="w-1/2">
          <Image src={poster} />
        </div>
      </div>
    </div>
  )
}

export default Home
