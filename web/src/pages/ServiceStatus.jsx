import React from 'react'
import {
  connect,
} from 'react-redux'
import {
  makeStyles,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Title from 'components/Title'
import pageStyles from 'stylesheets/pages'
import { getServiceStatusMessage, getWhoami } from 'selectors/servicestatus'

const useStyles = makeStyles((theme) => ({
  ...pageStyles(theme),
}))

export const ServiceStatus = ({
  health,
  whoami,
}) => {
  const classes = useStyles()
  return (
    <Grid
        container
        spacing={3}
        justify="center"
      >
      <Grid
          sm={4}
          item
        >
        <Paper className={classes.paper}>
          <Title>Service Status</Title>
          <Typography paragraph variant="body2">Welcome, {whoami}!</Typography>
          <Typography paragraph variant="body2">Current weather forecast: Good</Typography>
          <Typography paragraph variant="body2">Blood Pressure: {health}</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export const mapStateToProps = (state, ownProps) => ({
  health: getServiceStatusMessage(state),
  whoami: getWhoami(state),
})

export const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceStatus)
