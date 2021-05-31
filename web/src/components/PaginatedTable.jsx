import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TablePagination from '@material-ui/core/TablePagination'
import {
  makeStyles,
} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import Title from 'components/Title'
import {
  stableSort,
  getComparator,
} from 'utils/sort'

const useStyles = makeStyles(theme => ({
  actionContainer: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(0.5),
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
  progressContainer: {
    flex: 1,
    alignContent: 'center',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  tableTitle: {
    marginBottom: theme.spacing(1),
  },
}))

const EnhancedTableHead = ({
  columns,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ title, key }, index) => (
          <TableCell
              sortDirection={orderBy === index ? order : false}
              key={key}
            >
            <TableSortLabel
                active={orderBy === index}
                direction={orderBy === index ? order : 'asc'}
                onClick={createSortHandler(index)}
              >
              {title}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired).isRequired,
  order: PropTypes.oneOf([
    'asc',
    'desc',
  ]).isRequired,
  orderBy: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
}

const PaginatedTable = ({
  title,
  columns,
  rows,
  isLoading,
  errors,
  rowsPerPage: defaultRowsPerPage,
}) => {
  const classes = useStyles()
  const [
    order,
    setOrder,
  ] = React.useState('asc')
  const [
    orderBy,
    setOrderBy,
  ] = React.useState()
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const [
    rowsPerPage,
    setRowsPerPage,
  ] = React.useState(defaultRowsPerPage)
  const [
    page,
    setPage,
  ] = React.useState(0)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  return (
    <Grid container>
      <Grid
          item
          xs={12}
          className={classes.tableTitle}
        >
        <Title>{title}</Title>
      </Grid>
      {isLoading && (
        <Grid
            item
            xs={12}
          >
          <div className={classes.progressContainer}>
            <CircularProgress
                color="inherit"
                size={16}
            />
          </div>
        </Grid>
      )}
      {errors.length !== 0 && errors.map((error) => (
        <Grid
            item
            xs={12}
          >
          <Typography color="error">{error}</Typography>
        </Grid>
      ))}
      <Grid
          item
          xs={12}
        >
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
                {...{
                  columns,
                  orderBy,
                  order,
                }}
                onRequestSort={handleSortRequest}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {row.map((value, key) => (
                      <TableCell {...{ key }}>{value.content}</TableCell>
                    ))}
                  </TableRow>
              ))}
              {(false && emptyRows > 0) && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid
          item
          xs={12}
        >
        <TablePagination
            rowsPerPageOptions={[1, 3, 5, 10, 25]}
            component="div"
            count={rows.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            {...{
              page,
              rowsPerPage,
            }}
        />
      </Grid>
    </Grid>
  )
}

PaginatedTable.propTypes = {
  title: PropTypes.string.isRequired,
  errors: PropTypes.array,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rowsPerPage: PropTypes.number,
}

PaginatedTable.defaultProps = {
  isLoading: false,
  errors: [],
  rowsPerPage: 5,
}

export default PaginatedTable
