import { generateSPC } from "./encoder.js";
import { decodeSPC } from "./decoder_fft.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.getElementById("generateBtn").onclick = () => {
  const text = document.getElementById("textInput").value;
  generateSPC(text, ctx);
};

document.getElementById("decodeBtn").onclick = () => {
  const text = decodeSPC(canvas);
  document.getElementById("output").innerText = text;
};
