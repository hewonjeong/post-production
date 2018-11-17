export default ({ video, audio, text }) => getLastEnd(video)

export const getLastEnd = (object = {}) => {
  const values = Object.values(object).map(o => o.end)
  return values.length ? Math.max(...values) : 0
}
