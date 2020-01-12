import React, { ReactElement, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Uploader from '../../components/Uploader/Uploader'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const EditForm = (props: any): ReactElement => {
  const [doc, setDoc] = useState(props.currentDoc)

  const handleInputChange = (event: any): void => {
    const { name, value } = event.target
    setDoc({ ...doc, [name]: value })
  }

  const handleInputNumberChange = (event: any): void => {
    const { name, value } = event.target
    setDoc({ ...doc, [name]: parseInt(value) })
  }

  const classes = useStyles()
  const [row, setRow] = useState(props.currentDoc.row)
  const [column, setColumn] = useState(props.currentDoc.column)
  const [state, setState] = useState(props.currentDoc.state)

  const [attachState, setAttachState] = useState(true)

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

  const handleAttachChange = (data: any): void => {
    if (!data || !data.metaData) return
    setDoc({
      ...doc,
      attachName: data.metaData.name,
      attachUrl: data.downloadUrl,
    })
    setAttachState(false)
  }

  useEffect(() => {
    setDoc(props.currentDoc)
    setRow(props.currentDoc.row)
    setColumn(props.currentDoc.column)
    setState(props.currentDoc.state)
  }, [props])

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateDoc(doc)
      }}
    >
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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

      <label>State</label>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select value={state} onChange={handleStateChange}>
          <MenuItem value={'0'}>Ready</MenuItem>
          <MenuItem value={'1'}>Settled</MenuItem>
          <MenuItem value={'2'}>Traveling</MenuItem>
          <MenuItem value={'3'}>Broken</MenuItem>
        </Select>
      </FormControl>

      <label>Attach</label>
      {attachState && (
        <a href={doc.attachUrl} target={'_blank'}>
          {doc.attachName}
        </a>
      )}
      <Uploader dir={'vehicles'} proc={handleAttachChange} />

      <button>Update Vehicle</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditForm
