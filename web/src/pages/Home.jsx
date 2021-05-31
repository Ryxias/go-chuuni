import React from 'react'
import {
  connect,
} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import {
  makeStyles,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import Title from 'components/Title'
import pageStyles from 'stylesheets/pages'

const useStyles = makeStyles(theme => ({
  ...pageStyles(theme),
}))

export const Home = ({
  title,
}) => {
  const classes = useStyles()
  return (
    <Grid
        container
        spacing={3}
      >
      <Grid
          sm={12}
          item
        >
        <Paper className={classes.paper}>
          <Title>{title}</Title>
        </Paper>
      </Grid>
    </Grid>
  )
}

Home.propTypes = {
}

Home.defaultProps = {
}

export const mapStateToProps = (state, ownProps) => ({
  title: ownProps.route.title,
})

export const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
