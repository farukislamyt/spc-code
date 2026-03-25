const SIZE = 256;
const RADII = [];

for (let i = 5; i <= 80; i += 5) {
  RADII.push(i); // 16+ bits now
}

export function generateSPC(text, ctx) {
  const bits = [...text]
    .map(c => c.charCodeAt(0).toString(2).padStart(8,'0'))
    .join('');

  let img = ctx.createImageData(SIZE, SIZE);

  for (let y=0;y<SIZE;y++){
    for(let x=0;x<SIZE;x++){

      let nx=(x/SIZE)*2-1;
      let ny=(y/SIZE)*2-1;

      let value=0;

      for(let i=0;i<bits.length && i<RADII.length;i++){
        if(bits[i]==='1'){
          let r=RADII[i];
          value += Math.sin(2*Math.PI*r*Math.sqrt(nx*nx+ny*ny));
        }
      }

      value=(value+1)/2;

      let idx=(y*SIZE+x)*4;
      let c=value*255;

      img.data[idx]=c;
      img.data[idx+1]=c;
      img.data[idx+2]=c;
      img.data[idx+3]=255;
    }
  }

  ctx.putImageData(img,0,0);
}
