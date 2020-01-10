import React, { ReactElement } from 'react'
import Button from '@material-ui/core/Button'
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'

const ActionButton = (props: any): ReactElement => {
  return (
    <Button variant="outlined" color="secondary" onClick={props.proc}>
      <ChevronRightOutlinedIcon />
      {props.title ? props.title : 'Next'}
    </Button>
  )
}

export default ActionButton
