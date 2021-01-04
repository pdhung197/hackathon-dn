import React, { ReactElement } from 'react'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'

const ActionButton = (props: any): ReactElement => {
  return (
    <Fab color="secondary" aria-label="delete" size="small">
      <DeleteIcon onClick={() => props.proc(props.doc.id)} />
    </Fab>
  )
}

export default ActionButton
