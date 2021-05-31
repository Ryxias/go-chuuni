import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useBackdropStyles = makeStyles({
  root: {
    zIndex: 999,
  },
})

const useRootStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

const useCardStyles = makeStyles(theme => ({
  card: {
    margin: '-20px',
    top: '50%',
    left: '50%',
    position: 'relative',
    zIndex: '9999',
    display: 'inline-block',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const LoadingIndicator = () => {
  const backdropClasses = useBackdropStyles()
  const rootClasses = useRootStyles()
  const cardClasses = useCardStyles()
  return (
    <div className={rootClasses.root}>
      <Backdrop
          open
          classes={backdropClasses}
      />
      <Card className={cardClasses.card}>
        <CardContent className={cardClasses.cardContent}>
          <Typography
              variant="h5"
              color="textPrimary"
              gutterBottom
            >
            Loading
          </Typography>
          <CircularProgress color="primary" />
        </CardContent>
      </Card>
    </div>
  )
}

LoadingIndicator.propTypes = {
}

export default LoadingIndicator
