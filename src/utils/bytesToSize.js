function unitToSize(unit, sizes) {
  if (unit === undefined) return '';
  if (Number.isNaN(unit)) return '';
  if (unit === 0) return '0';
  let isNegative;
  let positiveUnit = unit;
  if (unit < 0) {
    isNegative = true;
    positiveUnit = -unit;
  }
  const i = parseInt(Math.floor(Math.log(positiveUnit) / Math.log(1024)), 10);
  if (i === 0) return `${unit} ${sizes[i]}`;
  return `${isNegative ? '-' : ''}${(unit / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

export default function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  return unitToSize(bytes, sizes);
}
