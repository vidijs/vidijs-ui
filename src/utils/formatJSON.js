export default function formatJSON(jsonString, indent) {
  if (!jsonString) return undefined;
  return JSON.stringify(JSON.parse(jsonString), null, indent || 2);
}
