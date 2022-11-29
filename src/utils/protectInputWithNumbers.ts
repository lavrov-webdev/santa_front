export default (val: string | number | undefined, withDot = true) => {
  if (typeof val === "string") val = parseFloat(val)
  
  return val;
}
