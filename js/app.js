import { generateSPC } from "./encoder.js";
import { decodeSPC } from "./decoder.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("video");
const status = document.getElementById("status");

document.getElementById("generateBtn").onclick = () => {
  generateSPC(document.getElementById("textInput").value, ctx);
  status.innerText = "Generated";
};

document.getElementById("decodeBtn").onclick = () => {
  document.getElementById("output").innerText = decodeSPC(canvas);
};

document.getElementById("saveBtn").onclick = () => {
  let a = document.createElement("a");
  a.download = "spc.png";
  a.href = canvas.toDataURL();
  a.click();
};

document.getElementById("uploadBtn").onclick = () => {
  let file = document.getElementById("fileInput").files[0];
  if (!file) return;

  let img = new Image();
  img.onload = () => {
    ctx.drawImage(img,0,0,256,256);
    document.getElementById("output").innerText = decodeSPC(canvas);
  };
  img.src = URL.createObjectURL(file);
};

document.getElementById("cameraBtn").onclick = async () => {
  video.style.display="block";
  let stream = await navigator.mediaDevices.getUserMedia({video:true});
  video.srcObject = stream;
  scan();
};

function scan(){
  ctx.drawImage(video,0,0,256,256);
  let t = decodeSPC(canvas);
  if(t) document.getElementById("output").innerText = t;
  requestAnimationFrame(scan);
}