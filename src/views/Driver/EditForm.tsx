import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'

import Uploader from 'components/Uploader/Uploader'
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))
const EditForm = props => {
    const [doc, setDoc] = useState(props.currentDoc)
    const [attachState, setAttachState] = useState(true)
    const [state, setState] = useState(props.currentDoc.state)
    const classes = useStyles()
    const handleInputChange = event => {
        const { name, value } = event.target
        setDoc({ ...doc, [name]: value })
    }

    useEffect(() => {
        setDoc(props.currentDoc)
    }, [props])

    const handleStateChange = event => {
        setState(event.target.value)
        setDoc({ ...doc, ['state']: parseInt(event.target.value) })
    }

    const handleAttachChange = data => {
        if (!data || !data.metaData) return
        setDoc({
            ...doc,
            attachName: data.metaData.name,
            attachUrl: data.downloadUrl,
        })
        setAttachState(false)
    }

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
            {attachState && (
                <a href={doc.attachUrl} target={'_blank'}>
                    {doc.attachName}
                </a>
            )}
            <Uploader dir={'drivers'} proc={handleAttachChange} />
            <button>Update Driver</button>
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
