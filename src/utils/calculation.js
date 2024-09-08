import { dataKriteria, dataAlternatif } from '@/utils/query'

const reshapeArray = (array) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]))
}

export const AHP = async () => {
  const kriteria = await dataKriteria()

  const filteredKriteria = ['H', 'S', 'K', 'C', 'J']

  const kriteriaNames = {
    H: 'Harga',
    M: 'Merk',
    S: 'Shade',
    K: 'Ketahanan',
    C: 'Coverage',
    J: 'Jenis Kulit',
  }

  const filteredKriteriaNames = filteredKriteria.map((kriteria) => {
    return kriteriaNames[kriteria]
  })

  console.log(filteredKriteriaNames)

  const kombinasiKriteria = []
  for (let i = 0; i < filteredKriteria.length; i++) {
    for (let j = i + 1; j < filteredKriteria.length; j++) {
      kombinasiKriteria.push(filteredKriteria[i] + filteredKriteria[j])
    }
  }

  // Inisialisasi tabel perbandingan secara dinamis
  const tabelPerbandingan = []

  // Loop untuk membuat tabel perbandingan
  for (let i = 0; i < filteredKriteria.length; i++) {
    const row = [] // Inisialisasi baris kosong

    for (let j = 0; j < filteredKriteria.length; j++) {
      if (i === j) {
        // Jika baris dan kolom sama, isi dengan 1 (nilai diagonal)
        row.push(1)
      } else {
        // Gabungkan kode kriteria untuk mengambil nilai dari objek `kriteria`
        const key =
          i < j
            ? filteredKriteria[i] + filteredKriteria[j]
            : filteredKriteria[j] + filteredKriteria[i]

        const value = kriteria[key] // Ambil nilai dari objek kriteria

        // Jika key ditemukan, masukkan nilai kriteria, jika tidak, masukkan 1/nilai yang sudah ada
        row.push(i < j ? value : 1 / value)
      }
    }

    tabelPerbandingan.push(row) // Masukkan baris ke tabel
  }

  // console.log(tabelPerbandingan)

  // const tabelPerbandingan = [
  //   [1, kriteria.HM, kriteria.HS, kriteria.HK, kriteria.HC, kriteria.HJ],
  //   [1 / kriteria.HM, 1, kriteria.MS, kriteria.MK, kriteria.MC, kriteria.MJ],
  //   [
  //     1 / kriteria.HS,
  //     1 / kriteria.MS,
  //     1,
  //     kriteria.SK,
  //     kriteria.SC,
  //     kriteria.SJ,
  //   ],
  //   [
  //     1 / kriteria.HK,
  //     1 / kriteria.MK,
  //     1 / kriteria.SK,
  //     1,
  //     kriteria.KC,
  //     kriteria.KJ,
  //   ],
  //   [
  //     1 / kriteria.HC,
  //     1 / kriteria.MC,
  //     1 / kriteria.SC,
  //     1 / kriteria.KC,
  //     1,
  //     kriteria.CJ,
  //   ],
  //   [
  //     1 / kriteria.HJ,
  //     1 / kriteria.MJ,
  //     1 / kriteria.SJ,
  //     1 / kriteria.KJ,
  //     1 / kriteria.CJ,
  //     1,
  //   ],
  // ]

  const reshapedTabelPerbandingan = reshapeArray(tabelPerbandingan)

  const jumlahBobot = reshapedTabelPerbandingan.map((column) => {
    return parseFloat(
      column
        .reduce((a, b) => a + b, 0)
        .toFixed(4)
        .replace(/\.?0+$/, ''),
    )
  })

  const normalisasi = reshapedTabelPerbandingan.map((column, index) => {
    return column.map((column) => {
      return parseFloat(
        (column / jumlahBobot[index]).toFixed(4).replace(/\.?0+$/, ''),
      )
    })
  })

  const reshapeNormalisasi = reshapeArray(normalisasi)

  const bobotPrioritas = reshapeNormalisasi.map((column, index) => {
    return parseFloat(
      (column.reduce((a, b) => a + b, 0) / column.length).toFixed(4),
    )
  })

  const consistency = reshapedTabelPerbandingan.map((column, index) => {
    return column.map((column) => {
      return parseFloat(
        (column * bobotPrioritas[index]).toFixed(4).replace(/\.?0+$/, ''),
      )
    })
  })

  const reshapeConsistency = reshapeArray(consistency)

  // console.log(reshapeConsistency);

  const sumConsistency = reshapeConsistency.map((column) => {
    return parseFloat(column.reduce((a, b) => a + b, 0).toFixed(4))
  })

  // console.log(sumConsistency);

  const consistencyMeasures = sumConsistency.map((column, index) => {
    return parseFloat((column / bobotPrioritas[index]).toFixed(4))
  })

  // console.log(consistencyMeasures);

  const lambdaMax = parseFloat(
    (
      consistencyMeasures.reduce((a, b) => a + b, 0) /
      consistencyMeasures.length
    ).toFixed(4),
  )

  // console.log(lambdaMax);

  const consistencyIndex = parseFloat(
    (
      (lambdaMax - consistencyMeasures.length) /
      (consistencyMeasures.length - 1)
    ).toFixed(4),
  )

  // console.log(consistencyIndex);

  const consistencyRatio = parseFloat((consistencyIndex / 1.24).toFixed(4))

  // console.log(consistencyRatio);

  // CR < 10 % = konsisten
  return {
    kriteria: filteredKriteriaNames,
    tabel: tabelPerbandingan,
    jumlahBobot: jumlahBobot,
    normalisasi: reshapeArray(normalisasi),
    bobotPrioritas: bobotPrioritas,
    consistency: reshapeArray(consistency),
    sumConsistency: sumConsistency,
    consistencyMeasures: consistencyMeasures,
    lambdaMax: lambdaMax,
    consistencyIndex: consistencyIndex,
    consistencyRatio: consistencyRatio,
    konsisten: consistencyRatio < 0.1,
  }
}

// BATAS

export const Topsis = async () => {
  // Ambil hasil dari AHP yang sudah dihitung secara dinamis
  const ahp = await AHP()

  // Ambil data alternatif
  const alternatif = await dataAlternatif()

  // Ubah data alternatif menjadi tabel awal
  const tabelDataAwal = alternatif.map(
    ({ id, name, harga, merk, shade, ketahanan, coverage, jenisKulit }) => [
      id,
      name,
      harga,
      merk,
      shade,
      ketahanan,
      coverage,
      jenisKulit,
    ],
  )

  // Konversi data berdasarkan aturan yang ditentukan
  function convertData(jsonData) {
    return jsonData.map((item) => {
      const harga =
        item.harga < 100000
          ? 1
          : item.harga >= 100000 && item.harga <= 150000
            ? 3
            : 5
      const merk =
        item.merk === 'Kurang terkenal'
          ? 1
          : item.merk === 'Cukup terkenal'
            ? 3
            : 5
      const shade =
        item.shade >= 3 && item.shade <= 7
          ? 1
          : item.shade >= 8 && item.shade <= 10
            ? 3
            : 5
      const ketahanan =
        item.ketahanan >= 1 && item.ketahanan <= 4
          ? 1
          : item.ketahanan > 4 && item.ketahanan <= 8
            ? 3
            : 5
      const coverage = item.coverage.includes('Cukup') ? 5 : 1
      const jenisKulit = item.jenisKulit.includes('Semua jenis kulit')
        ? 5
        : item.jenisKulit.includes('Kombinasi')
          ? 3
          : 1

      // Hanya return kolom yang sesuai dengan filteredKriteria
      return [harga, merk, shade, ketahanan, coverage, jenisKulit].slice(
        0,
        ahp.bobotPrioritas.length,
      )
    })
  }

  // Normalisasi tabel data dan reshape sesuai dengan jumlah kriteria dinamis
  const tabelData = reshapeArray(convertData(alternatif))

  // Hitung denominator (akar dari jumlah kuadrat kolom)
  const denominator = tabelData.map((column) => {
    return parseFloat(
      Math.sqrt(column.reduce((a, b) => a + b ** 2, 0)).toFixed(4),
    )
  })

  // Normalisasi tabel TOPSIS
  const normalisasiTopsis = tabelData.map((column, index) => {
    return column.map((column) => {
      return parseFloat(
        (column / denominator[index]).toFixed(4).replace(/\.?0+$/, ''),
      )
    })
  })

  // Pemberian bobot normalisasi berdasarkan bobot dari AHP
  const normalisasiBobot = normalisasiTopsis.map((column, index) => {
    return column.map((column) => {
      return parseFloat(
        (column * ahp.bobotPrioritas[index]).toFixed(4).replace(/\.?0+$/, ''),
      )
    })
  })

  // Hitung nilai ideal positif dan negatif
  const idealPositif = normalisasiBobot.map((column, index) => {
    return index === 0 ? Math.min(...column) : Math.max(...column)
  })

  const idealNegatif = normalisasiBobot.map((column, index) => {
    return index === 0 ? Math.max(...column) : Math.min(...column)
  })

  // Menghitung jarak ke solusi ideal positif dan negatif
  const reshapeNormalisasiBobot = reshapeArray(normalisasiBobot)

  const distancePositif = reshapeNormalisasiBobot.map((row) => {
    return Math.sqrt(
      row
        .map((value, index) => (value - idealPositif[index]) ** 2)
        .reduce((sum, val) => sum + val, 0),
    )
  })

  const distanceNegatif = reshapeNormalisasiBobot.map((row) => {
    return Math.sqrt(
      row
        .map((value, index) => (value - idealNegatif[index]) ** 2)
        .reduce((sum, val) => sum + val, 0),
    )
  })

  // Menghitung skor kinerja
  const performanceScore = distanceNegatif.map((column, index) => {
    return parseFloat(
      (column / (column + distancePositif[index]))
        .toFixed(4)
        .replace(/\.?0+$/, ''),
    )
  })

  // Ranking hasil berdasarkan skor kinerja
  const ranking = performanceScore
    .map((value, index) => {
      return {
        nama: alternatif[index].name,
        score: value,
      }
    })
    .sort((a, b) => b.score - a.score)

  return {
    tabelDataAwal: tabelDataAwal,
    tabelData: reshapeArray(tabelData),
    denominator: denominator,
    normalisasiTopsis: reshapeArray(normalisasiTopsis),
    normalisasiBobot: reshapeArray(normalisasiBobot),
    idealPositif: idealPositif,
    idealNegatif: idealNegatif,
    distancePositif: distancePositif,
    distanceNegatif: distanceNegatif,
    distance: distanceNegatif.map(
      (value, index) => value + distancePositif[index],
    ),
    performanceScore: performanceScore,
    ranking: ranking,
  }
}
