import { bitsToText, checkParity } from "./utils.js";

const SIZE = 256;
const RADII = [5,10,15,20,25,30,35,40,45,50,55,60];

function smooth(img) {
  let copy = new Uint8ClampedArray(img.data);

  for (let y = 1; y < SIZE - 1; y++) {
    for (let x = 1; x < SIZE - 1; x++) {

      let sum = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          let i = ((y+dy)*SIZE + (x+dx)) * 4;
          sum += copy[i];
        }
      }

      let avg = sum / 9;
      let i = (y*SIZE + x) * 4;

      img.data[i] = img.data[i+1] = img.data[i+2] = avg;
    }
  }
}

function findCenter(img) {
  let sumX = 0, sumY = 0, total = 0;

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let i = (y*SIZE + x) * 4;
      let v = img.data[i];

      sumX += x * v;
      sumY += y * v;
      total += v;
    }
  }

  return { x: sumX/total, y: sumY/total };
}

function radialEnergy(img, r, center) {
  let energy = 0, count = 0;

  for (let a = 0; a < 360; a += 2) {
    let ang = a * Math.PI / 180;

    let x = Math.floor(center.x + r*Math.cos(ang));
    let y = Math.floor(center.y + r*Math.sin(ang));

    if (x>=0 && y>=0 && x<SIZE && y<SIZE) {
      let i = (y*SIZE + x) * 4;
      energy += img.data[i];
      count++;
    }
  }

  return energy / count;
}

export function decodeSPC(canvas) {
  const ctx = canvas.getContext("2d");
  let img = ctx.getImageData(0,0,SIZE,SIZE);

  let max = 0;

  for (let i = 0; i < img.data.length; i += 4) {
    let avg = (img.data[i]+img.data[i+1]+img.data[i+2])/3;
    img.data[i]=img.data[i+1]=img.data[i+2]=avg;
    if (avg > max) max = avg;
  }

  smooth(img);

  let threshold = max * 0.35;
  let center = findCenter(img);

  let bits = "";

  for (let r of RADII) {
    let e = radialEnergy(img, r, center);
    bits += e > threshold ? '1' : '0';
  }

  if (!checkParity(bits)) return "❌ Error";

  return bitsToText(bits.slice(0,-1));
}