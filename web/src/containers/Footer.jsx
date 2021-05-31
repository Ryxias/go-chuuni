import React from 'react'
import {
  connect,
} from 'react-redux'
import {
  Link as RouterLink,
} from 'react-router'
import {
  withStyles,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export const styles = theme => ({
  footer: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
})

export const Footer = ({
  classes,
  hasAuth,
}) => (
  <footer className={classes.footer}>
    <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      >
      {'Made by '}
      <Link
          color="primary"
          to="/"
          component={RouterLink}
        >
        {'Chuuni'}
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  </footer>
)

Footer.propTypes = {
}

export const mapStateToProps = (state, ownProps) => ({
})

export const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer))
