export function textToBits(text) {
  return [...text]
    .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

export function bitsToText(bits) {
  let out = "";
  for (let i = 0; i < bits.length; i += 8) {
    let byte = bits.substr(i, 8);
    if (byte.length === 8)
      out += String.fromCharCode(parseInt(byte, 2));
  }
  return out;
}
