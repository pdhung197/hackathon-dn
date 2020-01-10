import React, { ReactElement } from 'react'

import Button from '@material-ui/core/Button'
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined'

const ActionButton = (props: any): ReactElement => {
  return (
    <Button variant="outlined" color="secondary" onClick={props.proc}>
      <RotateLeftOutlinedIcon />
      Load More
    </Button>
  )
}

export default ActionButton
