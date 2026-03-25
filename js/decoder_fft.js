import { fft2D } from "./fft.js";
import { bitsToText } from "./utils.js";

const SIZE = 256;

export function decodeSPC(canvas) {
  const ctx = canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, SIZE, SIZE);

  let matrix = [];

  for (let y = 0; y < SIZE; y++) {
    let row = [];
    for (let x = 0; x < SIZE; x++) {
      let i = (y * SIZE + x) * 4;
      row.push(img.data[i]);
    }
    matrix.push(row);
  }

  const spectrum = fft2D(matrix);

  let bits = "";

  // Sample center outward
  const center = SIZE/2;

  for (let r = 5; r <= 80; r += 5) {
    let x = Math.floor(center + r);
    let y = Math.floor(center);

    let energy = spectrum[y][x];

    bits += energy > 10000 ? '1' : '0';
  }

  return bitsToText(bits);
}
