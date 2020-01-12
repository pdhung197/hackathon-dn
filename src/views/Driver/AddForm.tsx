import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Uploader from '../../components/Uploader/Uploader'

import AddButton from '../../components/ActionButton/AddButton'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))
const AddForm = (props: any) => {
  const initialFormState = {
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    attachName: '',
    attachUrl: '',
    state: 0,
  }
  const [doc, setDoc] = useState(initialFormState)
  const [state, setState] = useState(0)
  const classes = useStyles()
  const handleInputChange = (event: any): void => {
    const { name, value } = event.target
    setDoc({ ...doc, [name]: value })
  }

  const handleAttachChange = (data: any): void => {
    if (!data || !data.metaData) return
    setDoc({
      ...doc,
      attachName: data.metaData.name,
      attachUrl: data.downloadUrl,
    })
  }

  const handleStateChange = (event: any): void => {
    setState(event.target.value)
    setDoc({ ...doc, ['state']: parseInt(event.target.value) })
  }

  const addProc = (event: any): void => {
    event.preventDefault()
    if (!doc.name || !doc.email || !doc.phone || !doc.password) return

    props.addDoc(doc)
    setDoc(initialFormState)
  }
  return (
    <form>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={doc.name}
        onChange={handleInputChange}
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={doc.email}
        onChange={handleInputChange}
      />
      <label>Phone</label>
      <input
        type="text"
        name="phone"
        value={doc.phone}
        onChange={handleInputChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={doc.password}
        onChange={handleInputChange}
      />

      <label>State</label>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select value={state} onChange={handleStateChange}>
          <MenuItem value={'0'}>Ready</MenuItem>
          <MenuItem value={'1'}>Settled</MenuItem>
          <MenuItem value={'2'}>Traveling</MenuItem>
        </Select>
      </FormControl>

      <label>Attach</label>
      <Uploader dir={'drivers'} proc={handleAttachChange} />

      <AddButton title={'Add Driver'} proc={addProc} />
    </form>
  )
}

export default AddForm
