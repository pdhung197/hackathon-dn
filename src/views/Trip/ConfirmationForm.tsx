import React from 'react'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import Button from '@material-ui/core/Button'

const ConfirmationForm = ({ navigation }: any) => {
  const { go } = navigation

  return (
    <div className="form">
      <h2>Success</h2>

      <div className="navigation">
        {/* <button onClick={()=>go("info")}>Finish</button> */}

        <Button variant="outlined" color="secondary" onClick={() => go('info')}>
          <CheckOutlinedIcon />
          Finish
        </Button>
      </div>
    </div>
  )
}

export default ConfirmationForm
