import React, { ReactElement, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const ActionButton = (props: any): ReactElement => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={event => props.proc(event)}
      >
        <AddOutlinedIcon />
        {props.title}
      </Button>
    </div>
  )
}

export default ActionButton
