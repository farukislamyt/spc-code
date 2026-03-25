import { bitsToText } from "./utils.js";

const SIZE = 256;
const RADII = [5, 10, 15, 20, 25, 30, 35, 40];

export function decodeSPC(canvas) {
  const ctx = canvas.getContext("2d");
  const img = ctx.getImageData(0, 0, SIZE, SIZE);

  let bits = "";

  for (let r of RADII) {
    let energy = 0;

    for (let a = 0; a < 360; a += 10) {
      let angle = a * Math.PI / 180;

      let x = Math.floor(SIZE/2 + r * Math.cos(angle));
      let y = Math.floor(SIZE/2 + r * Math.sin(angle));

      let idx = (y * SIZE + x) * 4;
      energy += img.data[idx];
    }

    bits += energy > 10000 ? '1' : '0';
  }

  return bitsToText(bits);
}
