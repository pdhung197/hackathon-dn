import React, { ReactElement } from 'react'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'

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
    <Fab color="secondary" aria-label="delete" size="small">
      <DeleteIcon onClick={() => props.proc(props.doc.id)} />
    </Fab>
  )
}

export default ActionButton
