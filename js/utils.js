export function textToBits(text) {
  return [...text]
    .map(c => c.charCodeAt(0).toString(2).padStart(8,'0'))
    .join('');
}

export function bitsToText(bits) {
  let out = "";
  for (let i = 0; i < bits.length; i += 8) {
    let b = bits.substr(i, 8);
    if (b.length === 8)
      out += String.fromCharCode(parseInt(b, 2));
  }
  return out;
}

export function addParity(bits) {
  let ones = bits.split('').filter(b => b === '1').length;
  return bits + (ones % 2 === 0 ? '0' : '1');
}

export function checkParity(bits) {
  let data = bits.slice(0, -1);
  let parity = bits.slice(-1);

  let ones = data.split('').filter(b => b === '1').length;
  let expected = ones % 2 === 0 ? '0' : '1';

  return expected === parity;
}