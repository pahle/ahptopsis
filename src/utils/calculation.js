import { dataKriteria, dataAlternatif } from "@/utils/query";

const reshapeArray = (array) => {
  return array[0].map((_, colIndex) =>
    array.map((row) => row[colIndex])
  );
};

export const AHP = async () => {
  const kriteria = await dataKriteria();

  const tabelPerbandingan = [
    [
      1,
      kriteria.HM,
      kriteria.HS,
      kriteria.HK,
      kriteria.HC,
      kriteria.HJ,
    ],
    [
      1 / kriteria.HM,
      1,
      kriteria.MS,
      kriteria.MK,
      kriteria.MC,
      kriteria.MJ,
    ],
    [
      1 / kriteria.HS,
      1 / kriteria.MS,
      1,
      kriteria.SK,
      kriteria.SC,
      kriteria.SJ,
    ],
    [
      1 / kriteria.HK,
      1 / kriteria.MK,
      1 / kriteria.SK,
      1,
      kriteria.KC,
      kriteria.KJ,
    ],
    [
      1 / kriteria.HC,
      1 / kriteria.MC,
      1 / kriteria.SC,
      1 / kriteria.KC,
      1,
      kriteria.CJ,
    ],
    [
      1 / kriteria.HJ,
      1 / kriteria.MJ,
      1 / kriteria.SJ,
      1 / kriteria.KJ,
      1 / kriteria.CJ,
      1,
    ],
  ];

  const reshapedTabelPerbandingan = reshapeArray(
    tabelPerbandingan
  );

  const jumlahBobot = reshapedTabelPerbandingan.map(
    (column) => {
      return parseFloat(
        column
          .reduce((a, b) => a + b, 0)
          .toFixed(4)
          .replace(/\.?0+$/, "")
      );
    }
  );

  const normalisasi = reshapedTabelPerbandingan.map(
    (column, index) => {
      return column.map((column) => {
        return parseFloat(
          (column / jumlahBobot[index])
            .toFixed(4)
            .replace(/\.?0+$/, "")
        );
      });
    }
  );

  const reshapeNormalisasi = reshapeArray(normalisasi);

  const bobotPrioritas = reshapeNormalisasi.map(
    (column, index) => {
      return parseFloat(
        (
          column.reduce((a, b) => a + b, 0) / column.length
        ).toFixed(4)
      );
    }
  );

  const consistency = reshapedTabelPerbandingan.map(
    (column, index) => {
      return column.map((column) => {
        return parseFloat(
          (column * bobotPrioritas[index])
            .toFixed(4)
            .replace(/\.?0+$/, "")
        );
      });
    }
  );

  const reshapeConsistency = reshapeArray(consistency);

  // console.log(reshapeConsistency);

  const sumConsistency = reshapeConsistency.map(
    (column) => {
      return parseFloat(
        column.reduce((a, b) => a + b, 0).toFixed(4)
      );
    }
  );

  // console.log(sumConsistency);

  const consistencyMeasures = sumConsistency.map(
    (column, index) => {
      return parseFloat(
        (column / bobotPrioritas[index]).toFixed(4)
      );
    }
  );

  // console.log(consistencyMeasures);

  const lambdaMax = parseFloat(
    (
      consistencyMeasures.reduce((a, b) => a + b, 0) /
      consistencyMeasures.length
    ).toFixed(4)
  );

  // console.log(lambdaMax);

  const consistencyIndex = parseFloat(
    (
      (lambdaMax - consistencyMeasures.length) /
      (consistencyMeasures.length - 1)
    ).toFixed(4)
  );

  // console.log(consistencyIndex);

  const consistencyRatio = parseFloat(
    (consistencyIndex / 1.24).toFixed(4)
  );

  // console.log(consistencyRatio);

  // CR < 10 % = konsisten
  return {
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
  };
};

// BATAS

export const Topsis = async () => {
  const ahp = await AHP(); 

  const alternatif = await dataAlternatif();

  const tabelDataAwal = alternatif.map(({ id, name, harga, merk, shade, ketahanan, coverage, jenisKulit }) => [
    id,
    name,
    harga,
    merk,
    shade,
    ketahanan,
    coverage,
    jenisKulit,
  ]);

  function convertData(jsonData) {
    // console.log(jsonData)
    return jsonData.map(item => {
      // console.log(item.harga)
      const harga = item.harga < 100000 ? 1 : item.harga >= 100000 && item.harga <= 150000 ? 3 : 5;
      const merk = item.merk === 'Kurang terkenal' ? 1 : item.merk === 'Cukup terkenal' ? 3 : 5;
      const shade = item.shade >= 3 && item.shade <= 7 ? 1 : item.shade >= 8 && item.shade <= 10 ? 3 : 5;
      const ketahanan = item.ketahanan >= 1 && item.ketahanan <= 4 ? 1 : item.ketahanan > 4 && item.ketahanan <= 8 ? 3 : 5;
      const coverage = item.coverage.includes('Cukup') ? 5 : 1;
      const jenisKulit = item.jenisKulit.includes('Semua jenis kulit') ? 5 : item.jenisKulit.includes('Kombinasi') ? 3 : 1;
  
      return [
        harga,
        merk,
        shade,
        ketahanan,
        coverage,
        jenisKulit
      ];
    });
  }

  // const columnHarga =       [5, 5, 3, 1, 1, 3, 1, 1, 1, 3];
  // const columnMerk =        [5, 5, 5, 3, 5, 5, 3, 3, 1, 5];
  // const columnShade =       [1, 5, 1, 1, 3, 3, 5, 1, 1, 5];
  // const columnKetahanan =   [5, 3, 3, 1, 3, 3, 3, 1, 5, 1];
  // const columnCoverage =    [5, 5, 5, 5, 5, 5, 5, 3, 5, 5];
  // const columnJenisKulit =  [5, 3, 5, 3, 5, 5, 5, 5, 5, 1];

  const tabelData = reshapeArray(convertData(alternatif));

  // console.log("Tabel Data:", tabelData);

  const denominator = tabelData.map((column) => {
    return parseFloat(
      Math.sqrt(
        column.reduce((a, b) => a + b ** 2, 0)
      ).toFixed(4)
    );
  });

  // console.log("Denominator:", denominator);

  const normalisasiTopsis = tabelData.map(
    (column, index) => {
      return column.map((column) => {
        return parseFloat(
          (column / denominator[index])
            .toFixed(4)
            .replace(/\.?0+$/, "")
        );
      });
    }
  );

  // console.log("Normalisasi:", normalisasiTopsis);

  const normalisasiBobot = normalisasiTopsis.map(
    (column, index) => {
      return column.map((column) => {
        return parseFloat(
          (column * ahp.bobotPrioritas[index])
            .toFixed(4)
            .replace(/\.?0+$/, ""),
        );
      });
    }
  );

  // console.log("Normalisasi Bobot:", normalisasiBobot);

  const idealPositif = normalisasiBobot.map((column, index) => {
    if (index === 0) {
      return Math.min(...column);
    } else {
      return Math.max(...column);
    }
  });

  // console.log("Ideal Positif:", idealPositif);

  const idealNegatif = normalisasiBobot.map((column, index) => {
    if (index === 0) {
      return Math.max(...column);
    } else {
      return Math.min(...column);
    }
  });

  // console.log("Ideal Negatif:", idealNegatif);

  const reshapeNormalisasiBobot = reshapeArray(
    normalisasiBobot
  );

  // console.log(
  //   "Reshape Normalisasi Bobot:",
  //   reshapeNormalisasiBobot
  // );


  const distancePositif = reshapeNormalisasiBobot.map(
    (row) => {
      return Math.sqrt(
        row
          .map(
            (value, index) =>
              (value - idealPositif[index]) ** 2
          )
          .reduce((sum, val) => sum + val, 0)
      );
    }
  );

  // console.log("Distance Positif:", distancePositif);

  const distanceNegatif = reshapeNormalisasiBobot.map(
    (row) => {
      return Math.sqrt(
        row
          .map(
            (value, index) =>
              (value - idealNegatif[index]) ** 2
          )
          .reduce((sum, val) => sum + val, 0)
      );
    }
  );

  // console.log("Distance Negatif:", distanceNegatif);

  const performanceScore = distanceNegatif.map(
    (column, index) => {
      return parseFloat(
        (column / (column + distancePositif[index]))
          .toFixed(4)
          .replace(/\.?0+$/, "")
      );
    }
  );

  // console.log("Performance Score:", performanceScore);

  const ranking = performanceScore
    .map((value, index) => {
      return {
        nama: alternatif[index].name,
        score: value,
      };
    })
    .sort((a, b) => b.score - a.score);

  // console.log("Ranking:", ranking);
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
    distance : distanceNegatif.map((value, index) => value + distancePositif[index]),
    performanceScore: performanceScore,
    ranking: ranking,
  };
};
