function unitToSize(unit, sizes) {
  if (unit === undefined) return '';
  if (Number.isNaN(unit)) return '';
  if (unit === 0) return '0';
  const i = parseInt(Math.floor(Math.log(unit) / Math.log(1000)), 10);
  if (i === 0) return `${unit} ${sizes[i]})`;
  return `${(unit / (1000 ** i)).toFixed(1)} ${sizes[i]}`;
}

export default function bitsToSize(bitRate) {
  const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
  return unitToSize(bitRate, sizes);
}


export function bitRateToSize(bitRate) {
  const sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
  return unitToSize(bitRate, sizes);
}

export function freqToSize(bitRate) {
  const sizes = ['Hz', 'kHz', 'mHz', 'gHz', 'tHz'];
  return unitToSize(bitRate, sizes);
}
