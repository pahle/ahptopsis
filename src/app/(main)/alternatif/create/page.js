'use client'

import { createAlternatif } from '@/utils/query'
import React from 'react'
import { Container } from '@/components/Container'
import Link from 'next/link'

const initialValue = {
  name: '',
  harga: 0,
  merk: 'Terkenal',
  shade: 0,
  ketahanan: 0,
  coverage: 'Cukup satu kali pengaplikasian',
  jenisKulit: 'Semua jenis kulit',
}

const CreateAlternatif = () => {
  const [form, setForm] = React.useState(initialValue)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createAlternatif(form)
    setForm(initialValue)
    history.back()
  }

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            name="harga"
            id="harga"
            value={form.harga}
            onChange={handleChange}
            className="w-full rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="merk">Merk</label>
          <select
            name="merk"
            id="merk"
            className="w-full rounded-lg border-2 border-gray-400 p-2"
            value={form.merk}
            onChange={handleChange}
          >
            <option value="Terkenal">Terkenal</option>
            <option value="Cukup terkenal">Cukup terkenal</option>
            <option value="Kurang terkenal">Kurang terkenal</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="shade">Shade</label>
          <input
            type="number"
            name="shade"
            id="shade"
            value={form.shade}
            onChange={handleChange}
            className="w-full rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="ketahanan">Ketahanan</label>
          <input
            type="number"
            name="ketahanan"
            id="ketahanan"
            value={form.ketahanan}
            onChange={handleChange}
            className="w-full rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="coverage">Coverage</label>
          <select
            name="coverage"
            id="coverage"
            className="w-full rounded-lg border-2 border-gray-400 p-2"
            value={form.coverage}
            onChange={handleChange}
          >
            <option value="Cukup satu kali pengaplikasian">
              Cukup satu kali pengaplikasian
            </option>
            <option value="Perlu beberapa kali pengaplikasian">
              Perlu beberapa kali pengaplikasian
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="jenisKulit">Jenis Kulit</label>
          <select
            name="jenisKulit"
            id="jenisKulit"
            className="w-full rounded-lg border-2 border-gray-400 p-2"
            value={form.jenisKulit}
            onChange={handleChange}
          >
            <option value="Semua jenis kulit">Semua jenis kulit</option>
            <option value="Oily, Kombinasi">Oily, Kombinasi</option>
            <option value="Dry, Kombinasi">Dry, Kombinasi</option>
            <option value="Dry">Dry</option>
            <option value="Oily">Oily</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-24 self-center rounded-lg bg-blue-300 p-2"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const CreateAlternatifPage = () => {
  return (
    <div className="py-10 pb-12 pt-16">
      <Container>
        <div className='grid grid-cols-3 items-center'>
          <Link
            className="text-xl font-semibold leading-7 text-pink-500"
            href="/alternatif"
          >
            {'<'} Kembali
          </Link>
          <h1 className="text-center text-4xl font-bold leading-7 text-slate-900 flex-grow">
            Tambah Alternatif
          </h1>
        </div>
      </Container>
      <div className="mt-12 divide-y divide-slate-100 lg:border-t lg:border-slate-100">
        <Container>
          <CreateAlternatif />
        </Container>
      </div>
    </div>
  )
}

export default CreateAlternatifPage
