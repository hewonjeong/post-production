export default timeline => Math.max(...Object.values(timeline).map(getLastEnd))

export const getLastEnd = (object = {}) => {
  const values = Object.values(object).map(o => o.end)
  return values.length ? Math.max(...values) : 0
}
