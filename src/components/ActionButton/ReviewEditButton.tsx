import React, { ReactElement } from 'react'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/EditOutlined'

const ActionButton = (props: any): ReactElement => {
  return (
    <Fab color="secondary" aria-label="edit" size="small">
      <EditIcon onClick={props.proc} />
    </Fab>
  )
}

export default ActionButton
