const descendingComparator = (
  a,
  b,
  orderBy,
) => {
  if (orderBy === undefined) {
    return 0
  }
  const floatA = parseFloat(a[orderBy].value)
  const floatB = parseFloat(b[orderBy].value)
  if (isNaN(floatA) || isNaN(floatB)) {
    return `${b[orderBy].value}`.localeCompare(`${a[orderBy].value}`)
  }
  return floatB - floatA
}

export const getComparator = (
  order,
  orderBy,
) => order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy)

export const stableSort = (
  array,
  comparator,
) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}
