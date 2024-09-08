'use server'

import prisma from './prismaClient'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const editUserKriteria = async (value) => {

  const criteriaArray = []

  if (value.get('H')) criteriaArray.push('H')
  if (value.get('M')) criteriaArray.push('M')
  if (value.get('S')) criteriaArray.push('S')
  if (value.get('K')) criteriaArray.push('K')
  if (value.get('C')) criteriaArray.push('C')
  if (value.get('J')) criteriaArray.push('J')


    try {
      await prisma.user.update({
        where: {
          id: parseInt(cookies().get('id').value),
        },
        data: {
          kriteria: criteriaArray,
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      prisma.$disconnect()
    }

    redirect('/kriteria')

} 

export const dataKriteria = async () => {
  try {
    const query = await prisma.user.findFirst({
      where: {
        id: parseInt(cookies().get('id').value),
      },
    })
    return query
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
}

export const editKriteria = async (value) => {
  const kriteria = value.get('kriteria')
  const bobot = value.get('bobot')

  // Correct way to dynamically set the key
  const data = {
    [kriteria]: parseFloat(bobot),
  }

  try {
    await prisma.user.update({
      where: {
        id: parseInt(cookies().get('id').value),
      },
      data: data,
    })
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
  redirect('/kriteria')
}

export const dataAlternatif = async () => {
  try {
    const query = await prisma.alternatif.findMany()
    return query
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
}

export const createAlternatif = async (value) => {
  const data = {
    name: value.name,
    harga: parseInt(value.harga),
    merk: value.merk,
    shade: parseInt(value.shade),
    ketahanan: parseInt(value.ketahanan),
    coverage: value.coverage,
    jenisKulit: value.jenisKulit,
  }
  try {
    const queryCreate = await prisma.alternatif.create({
      data: data,
    })
    return queryCreate
  } catch (error) {
    console.error(error)
  }
}

export const detailAlternatif = async (id) => {
  try {
    const query = await prisma.alternatif.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        reviews: true,
      },
    })
    return query
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
}

export const editAlternatif = async (value) => {
  try {
    const query = await prisma.alternatif.update({
      where: {
        id: value.id,
      },
      data: {
        name: value.name,
        harga: parseInt(value.harga),
        merk: value.merk,
        shade: parseInt(value.shade),
        ketahanan: parseInt(value.ketahanan),
        coverage: value.coverage,
        jenisKulit: value.jenisKulit,
      },
    })
    return query
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
  redirect('/alternatif')
}

export const deleteAlternatif = async (id) => {
  try {
    await prisma.alternatif.delete({
      where: {
        id: parseInt(id),
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const dataReview = async () => {
  try {
    const query = await prisma.review.findMany({
      include: {
        user: {
          select: {
            username: true,
            role: true,
          },
        },
        alternatif: {
          select: {
            name: true,
            harga: true,
            merk: true,
          },
        },
      },
    })
    return query
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
}

export const findReview = async (id) => {
  try {
    const query = await prisma.review.findMany({
      where: {
        alternatifId: parseInt(id),
      },
      include: {
        user: {
          select: {
            username: true,
            role: true,
          },
        },
        alternatif: {
          select: {
            name: true,
            harga: true,
            merk: true,
          },
        },
      },
    })
    return query
  } catch (error) {
    console.error(error)
  } finally {
    prisma.$disconnect()
  }
}

export const createReview = async (value) => {
  const data = {
    alternatifId: parseInt(value.alternatifId),
    userId: parseInt(cookies().get('id').value),
    review: value.review,
    rating: parseInt(value.rating),
  }
  try {
    const queryCreate = await prisma.review.create({
      data: data,
    })
    return queryCreate
  } catch (error) {
    console.error(error)
  }
}

export const findUser = async (value) => {
  try {
    const query = await prisma.user.findFirst({
      where: {
        id: parseInt(value),
      },
    })
    return query
  } catch (error) {
    console.error(error)
  }
}
