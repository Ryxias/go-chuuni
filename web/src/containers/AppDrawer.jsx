import React from 'react'
import PropTypes from 'prop-types'
import {
  connect,
} from 'react-redux'
import {
  makeStyles
} from '@material-ui/core/styles'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import GavelIcon from '@material-ui/icons/Gavel'
import SearchIcon from '@material-ui/icons/Search'
import ComputerIcon from '@material-ui/icons/Computer'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PetsIcon from '@material-ui/icons/Pets'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import HomeIcon from '@material-ui/icons/Home'
import Divider from '@material-ui/core/Divider'
import {
  Link as RouterLink,
} from 'react-router'
import Typography from '@material-ui/core/Typography'
import BugReportIcon from '@material-ui/icons/BugReport'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import CallMadeIcon from '@material-ui/icons/Callmade'
import ListIcon from '@material-ui/icons/List'
// import ScreenShareIcon from '@material-ui/icons/ScreenShare'
// import DataUsageIcon from '@material-ui/icons/DataUsage'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
// import ChatIcon from '@material-ui/icons/Chat'

import {
  getIsDrawerOpen,
} from 'selectors/ui'
import {
  getCurrentPath,
} from 'selectors/routing'
import {
  closeDrawer as closeDrawerAction,
  openDrawer as openDrawerAction,
} from 'actions/ui'
import {
  HOME_PAGE,
  HOME_ABOUT_PAGE,
  SERVICE_STATUS_PAGE,
} from 'constants/navigation'

export const drawerWidth = 300

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  navIcon: {
    marginLeft: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
}))

export const NestingListItemComponent = ({
  rootPath,
  currentPath,
  classes,
  isOpen,
  isDrawerOpen,
  children,
  title,
  icon,
  closeDrawer,
  openDrawer,
}) => {
  const isActivePath = currentPath.slice(0, rootPath.length).join('/') === rootPath.join('/')
  const [
    open,
    setOpen,
  ] = React.useState(isOpen || isActivePath)
  const handleClick = () => {
    if (isDrawerOpen) {
      setOpen(!open)
    } else {
      openDrawer()
      setOpen(true)
    }
  }
  return (
    <React.Fragment>
      <ListItem
          button
          onClick={handleClick}
          selected={!isDrawerOpen && isActivePath}
        >
        {(icon && !isDrawerOpen) && (
          <Tooltip
              title={<Typography>{title}</Typography>}
              placement="right"
              arrow
            >
            <ListItemIcon className={classes.navIcon}>
              {icon}
            </ListItemIcon>
          </Tooltip>
        )}
        {(icon && isDrawerOpen) && (
          <ListItemIcon className={classes.navIcon}>
            {icon}
          </ListItemIcon>
        )}
        <ListItemText primary={<Typography component="div">{title}</Typography>} />
        {isDrawerOpen && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItem>
      <Collapse
          in={isDrawerOpen && open}
          timeout="auto"
          unmountOnExit
        >
        <List
            component="div"
            disablePadding
          >
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

NestingListItemComponent.defaultProps = {
  isOpen: false,
  isDrawerOpen: false,
  rootPath: [],
}

const NestingListItem = connect((state, ownProps) => ({
  isDrawerOpen: getIsDrawerOpen(state, ownProps),
  currentPath: getCurrentPath(state, ownProps),
}), {
  openDrawer: openDrawerAction,
  closeDrawer: closeDrawerAction,
})(NestingListItemComponent)

export const NavLinkComponent = ({
  currentPath,
  isDrawerOpen,
  classes,
  to = '/',
  nested = false,
  text,
  rightIcon,
  icon,
  component = RouterLink,
  ...restProps
}) => {
  const toSplit = to.split('/').slice(1)
  const selected = toSplit.join('/') === currentPath.slice(0, toSplit.length).join('/')
  return (
    <ListItem
        button
        className={classnames({ [classes.nested]: nested })}
        {...{
          to,
          component,
          selected,
        }}
        {...restProps}
      >
      {(!isDrawerOpen && icon) && (
        <Tooltip
            title={<Typography>{text}</Typography>}
            placement="right"
            arrow
          >
          <ListItemIcon className={classes.navIcon}>
            {icon}
          </ListItemIcon>
        </Tooltip>
      )}
      {(isDrawerOpen && icon) && (
        <ListItemIcon className={classes.navIcon}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText primary={text} />
      {(isDrawerOpen && rightIcon) && rightIcon}
    </ListItem>
  )
}

const NavLink = connect((state, ownProps) => ({
  isDrawerOpen: getIsDrawerOpen(state, ownProps),
  currentPath: getCurrentPath(state, ownProps),
}), {
})(NavLinkComponent)

const AppDrawer = ({
  closeDrawer,
  isDrawerOpen,
  hasAuth,
}) => {
  const classes = useStyles()
  return (
    <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
        }}
        open={isDrawerOpen}
      >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <NestingListItem
            icon={<HomeIcon />}
            title="Home"
            {...{
              classes,
            }}
            rootPath={[HOME_PAGE]}
          >
          <NavLink
              {...{
                classes,
              }}
              to={`/${HOME_ABOUT_PAGE}`}
              text="About"
              nested
          />
        </NestingListItem>
        <NestingListItem
            icon={<ComputerIcon />}
            title="Machines"
            rootPath={['/ab']}
            {...{
              classes,
            }}
          >
          <NavLink
              {...{
                classes,
              }}
              icon={<SearchIcon />}
              to={`/a`}
              text="Search for Machine"
              nested
          />
          <NavLink
              {...{
                classes,
              }}
              icon={<ListIcon />}
              to={`/a`}
              text="List of Machines"
              nested
          />
        </NestingListItem>
        <NestingListItem
            icon={<PetsIcon />}
            title="AAAAAA"
            {...{
              classes,
            }}
            rootPath={['/']}
          >
          <NavLink
              {...{
                classes,
              }}
              icon={<GavelIcon />}
              to={`/rrr`}
              text="????"
              nested
          />
        </NestingListItem>
        <NavLink
            {...{
              classes,
            }}
            to={`/${SERVICE_STATUS_PAGE}`}
            text="Service Status"
            icon={<BugReportIcon />}
        />
      </List>
      <Divider />
      <List>
        <NavLink
            {...{
              classes,
            }}
            component="a"
            href="https://google.com"
            target="_blank"
            text="Google"
            icon={<FastfoodIcon />}
            rightIcon={<CallMadeIcon />}
        />
      </List>
    </Drawer>
  )
}

AppDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
}

export const mapStateToProps = (state, ownProps) => ({
  isDrawerOpen: getIsDrawerOpen(state, ownProps),
})

export const mapDispatchToProps = {
  closeDrawer: closeDrawerAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer)
