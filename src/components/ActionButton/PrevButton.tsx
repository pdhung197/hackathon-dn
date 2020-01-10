import React, { ReactElement } from 'react'
import Button from '@material-ui/core/Button'

import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'

const ActionButton = (props: any): ReactElement => {
  return (
    <Button variant="outlined" color="secondary" onClick={props.proc}>
      <ChevronLeftOutlinedIcon />
      Prev
    </Button>
  )
}

export default ActionButton
