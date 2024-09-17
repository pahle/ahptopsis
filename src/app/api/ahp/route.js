import { NextResponse } from 'next/server';

// Handle POST request
export async function POST(request) {
  try {
    const { matrix } = await request.json();

    if (!matrix) {
      return NextResponse.json({ message: 'Matrix data is required' }, { status: 400 });
    }

    const n = matrix.length;

    // Step 1: Calculate column sums for normalization
    const columnSum = matrix[0].map((_, colIndex) => matrix.reduce((sum, row) => sum + row[colIndex], 0));

    // Step 2: Normalize the matrix (Tabel Normalisasi)
    const normalizedMatrix = matrix.map(row =>
      row.map((val, index) => (val / columnSum[index]).toFixed(4))
    );

    // Step 3: Calculate priority vector (weights) from normalized matrix
    const priorityVector = normalizedMatrix.map(row =>
      (row.reduce((sum, val) => sum + parseFloat(val), 0) / n).toFixed(4)
    );

    // Step 4: Calculate WS vector (Tabel WS) from original matrix and priority vector
    const wsVector = matrix.map(row =>
      row.reduce((sum, val, index) => sum + val * priorityVector[index], 0).toFixed(4)
    );

    // Step 5: Calculate CV vector (Konsistensi Vektor CV)
    const cvVector = wsVector.map((val, index) =>
      (val / priorityVector[index]).toFixed(4)
    );

    // Step 6: Calculate lambda max
    const lambdaMax = (cvVector.reduce((sum, val) => sum + parseFloat(val), 0) / n).toFixed(4);

    // Step 7: Calculate Consistency Index (CI)
    const ci = ((lambdaMax - n) / (n - 1)).toFixed(4);

    // Step 8: Calculate Consistency Ratio (CR)
    const ri = 1.49; // RI value for n = 10
    const cr = (ci / ri).toFixed(4);

    // Step 9: Return all tables in the response
    return NextResponse.json({
      tabelHarga: matrix,
      tabelNormalisasi: normalizedMatrix,
      tabelWS: wsVector,
      tabelCV: cvVector,
      priorityVector,
      lambdaMax: parseFloat(lambdaMax),
      ci: parseFloat(ci),
      cr: parseFloat(cr),
      isConsistent: cr < 0.1
    });

  } catch (error) {
    return NextResponse.json({ message: 'Error processing the request' }, { status: 500 });
  }
}
