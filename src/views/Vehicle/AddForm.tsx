import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
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
  // let FieldValue = require('firebase-admin').firestore.FieldValue

  const initialFormState = {
    name: '',
    capacity: 0,
    model: '',
    color: '',
    licensePlate: '',
    amenities: '',
    row: '',
    column: 0,
    state: 0,
    attachName: '',
    attachUrl: '',
  }

  const [doc, setDoc] = useState(initialFormState)

  const handleInputChange = (event: any): void => {
    const { name, value } = event.target
    setDoc({ ...doc, [name]: value })
  }

  const handleInputNumberChange = (event: any): void => {
    const { name, value } = event.target
    setDoc({ ...doc, [name]: parseInt(value) })
  }

  const handleAttachChange = (data: any): void => {
    if (!data || !data.metaData) return
    setDoc({
      ...doc,
      attachName: data.metaData.name,
      attachUrl: data.downloadUrl,
    })
  }

  const classes = useStyles()
  const [row, setRow] = useState('')
  const [column, setColumn] = useState(0)
  const [state, setState] = useState(0)

  const handleRowChange = (event: any): void => {
    setRow(event.target.value)
    setDoc({ ...doc, ['row']: event.target.value })
  }

  const handleColumnChange = (event: any): void => {
    setColumn(event.target.value)
    setDoc({ ...doc, ['column']: parseInt(event.target.value) })
  }

  const handleStateChange = (event: any): void => {
    setState(event.target.value)
    setDoc({ ...doc, ['state']: parseInt(event.target.value) })
  }

  useEffect(() => {})

  const addProc = (event: any): void => {
    console.log(event)
    event.preventDefault()
    if (
      !doc.name ||
      !doc.capacity ||
      !doc.model ||
      !doc.color ||
      !doc.licensePlate ||
      !doc.amenities ||
      !doc.row ||
      !doc.column
    ) {
      console.log('error', doc)
      return
    }

    console.log('success', doc)

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
      <label>Capacity</label>
      <input
        type="number"
        name="capacity"
        value={doc.capacity}
        onChange={handleInputNumberChange}
      />
      <label>Model</label>
      <input
        type="text"
        name="model"
        value={doc.model}
        onChange={handleInputChange}
      />
      <label>Color</label>
      <input
        type="text"
        name="color"
        value={doc.color}
        onChange={handleInputChange}
      />
      <label>License Plate</label>
      <input
        type="text"
        name="licensePlate"
        value={doc.licensePlate}
        onChange={handleInputChange}
      />
      <label>Amenities</label>
      <input
        type="text"
        name="amenities"
        value={doc.amenities}
        onChange={handleInputChange}
      />

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label>Row</label>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select value={row} onChange={handleRowChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'C'}>C</MenuItem>
              <MenuItem value={'D'}>D</MenuItem>
              <MenuItem value={'E'}>E</MenuItem>
              <MenuItem value={'F'}>F</MenuItem>
              <MenuItem value={'G'}>G</MenuItem>
              <MenuItem value={'H'}>H</MenuItem>
              <MenuItem value={'I'}>I</MenuItem>
              <MenuItem value={'J'}>J</MenuItem>
              <MenuItem value={'K'}>K</MenuItem>
              <MenuItem value={'L'}>L</MenuItem>
              <MenuItem value={'M'}>M</MenuItem>
              <MenuItem value={'N'}>N</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <label>Column</label>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select value={column} onChange={handleColumnChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'4'}>4</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label>State</label>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select value={state} onChange={handleStateChange}>
              <MenuItem value={'0'}>Ready</MenuItem>
              <MenuItem value={'1'}>Settled</MenuItem>
              <MenuItem value={'2'}>Traveling</MenuItem>
              <MenuItem value={'3'}>Broken</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <label>Attach</label>
      <Uploader dir={'vehicles'} proc={handleAttachChange} />
      <AddButton title={'Add Vehicle'} proc={addProc} />
    </form>
  )
}

export default AddForm
