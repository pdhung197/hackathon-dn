import React, { useState, useEffect } from 'react'

import FormItem from './FormItem'
import StatesDropdown from './StatesDropdown'

import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import firebase from '../../firebase'
import TextField from '@material-ui/core/TextField'

import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import Button from '@material-ui/core/Button'

import PrevButton from 'components/ActionButton/PrevButton'
import NextButton from 'components/ActionButton/NextButton'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const DriverForm = ({ setForm, triggerSetForm, formData, navigation }) => {
    const { driverId, driverName, driverPhone, driverEmail } = formData
    const { previous, next } = navigation

    const classes = useStyles()
    const [currentDriver, setCurrentDriver] = useState({
        driverId,
        driverName,
        driverPhone,
        driverEmail,
    })

    const handleCurrentDriverChange = event => {
        const newDriver = event.target.value
        setCurrentDriver(newDriver)

        triggerSetForm('driverId', newDriver.id)
        triggerSetForm('driverName', newDriver.name)
        triggerSetForm('driverPhone', newDriver.phone)
        triggerSetForm('driverEmail', newDriver.email)
    }

    const db = firebase.firestore()
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await db
                .collection('drivers')
                .where('state', '==', 0)
                .get()
            setDrivers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [])

    return (
        <div className="form">
            <h2>Driver</h2>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <label>Select Vehicle</label>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <Select
                            value={currentDriver}
                            onChange={handleCurrentDriverChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {drivers.map(v => {
                                return <MenuItem value={v}>{v.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormItem
                        label="State"
                        value={
                            currentDriver.state == 0 ? 'Ready' : 'Not available'
                        }
                        readOnly
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <FormItem
                        label="Name"
                        value={currentDriver.name}
                        readOnly
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormItem
                        label="Email"
                        value={currentDriver.email}
                        readOnly
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormItem
                        label="Phone"
                        value={currentDriver.phone}
                        readOnly
                    />
                </Grid>
            </Grid>

            <div className="navigation">
                <PrevButton proc={previous} />
                <NextButton proc={next} />
            </div>
        </div>
    )
}

export default DriverForm
