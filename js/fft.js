export function fft2D(matrix) {
  const N = matrix.length;

  let real = [], imag = [];

  for (let i = 0; i < N; i++) {
    real[i] = [];
    imag[i] = [];
    for (let j = 0; j < N; j++) {
      real[i][j] = matrix[i][j];
      imag[i][j] = 0;
    }
  }

  // Simple DFT (slow but works)
  let out = [];

  for (let u = 0; u < N; u++) {
    out[u] = [];
    for (let v = 0; v < N; v++) {
      let sum = 0;

      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          let angle = -2 * Math.PI * ((u*x + v*y)/N);
          sum += matrix[x][y] * Math.cos(angle);
        }
      }

      out[u][v] = Math.abs(sum);
    }
  }

  return out;
}
