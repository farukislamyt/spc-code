const SIZE = 256;
const RADII = [5, 10, 15, 20, 25, 30, 35, 40];

export function generateSPC(text, ctx) {
  const bits = [...text]
    .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');

  let img = ctx.createImageData(SIZE, SIZE);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {

      let nx = (x / SIZE) * 2 - 1;
      let ny = (y / SIZE) * 2 - 1;

      let value = 0;

      for (let i = 0; i < bits.length && i < RADII.length; i++) {
        if (bits[i] === '1') {
          let r = RADII[i];
          value += Math.sin(2 * Math.PI * r * Math.sqrt(nx*nx + ny*ny));
        }
      }

      value = (value + 1) / 2;

      let idx = (y * SIZE + x) * 4;
      let color = value * 255;

      img.data[idx] = color;
      img.data[idx+1] = color;
      img.data[idx+2] = color;
      img.data[idx+3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
}
