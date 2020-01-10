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

const VehicleForm = ({ setForm, triggerSetForm, formData, navigation }) => {
    const {
        vehicleId,
        vehicleName,
        vehicleCapacity,
        vehicleModel,
        vehicleColor,
        vehicleLicensePlate,
        vehicleAmenities,
        vehicleRow,
        vehicleColumn,
        vehicleState,
    } = formData
    const { previous, next } = navigation

    const classes = useStyles()
    const [currentVehicle, setCurrentVehicle] = useState({
        vehicleId,
        vehicleName,
        vehicleCapacity,
        vehicleModel,
        vehicleColor,
        vehicleLicensePlate,
        vehicleAmenities,
        vehicleRow,
        vehicleColumn,
        vehicleState,
    })

    const handleCurrentVehicleChange = event => {
        const newVehicle = event.target.value
        setCurrentVehicle(newVehicle)

        triggerSetForm('vehicleId', newVehicle.id)
        triggerSetForm('vehicleName', newVehicle.name)
        triggerSetForm('vehicleCapacity', newVehicle.capacity)
        triggerSetForm('vehicleModel', newVehicle.model)
        triggerSetForm('vehicleColor', newVehicle.color)
        triggerSetForm('vehicleLicensePlate', newVehicle.licensePlate)
        triggerSetForm('vehicleAmenities', newVehicle.amenities)
        triggerSetForm('vehicleRow', newVehicle.row)
        triggerSetForm('vehicleColumn', newVehicle.column)
        triggerSetForm('vehicleState', 1) //newVehicle.state), settled state// may be not need
    }

    const db = firebase.firestore()
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await db
                .collection('vehicles')
                .where('state', '==', 0)
                .get()
            setVehicles(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [])

    return (
        <div className="form">
            <h2>Vehicle</h2>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <label>Select Vehicle</label>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <Select
                            value={currentVehicle}
                            onChange={handleCurrentVehicleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {vehicles.map(v => {
                                return <MenuItem value={v}>{v.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormItem
                        label="State"
                        value={
                            currentVehicle.state == 0
                                ? 'Ready'
                                : 'Not available'
                        }
                        readOnly
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormItem
                        label="Name"
                        value={currentVehicle.name}
                        readOnly
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormItem
                        label="Capacity"
                        value={currentVehicle.capacity}
                        readOnly
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormItem
                        label="Model"
                        value={currentVehicle.model}
                        readOnly
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormItem
                        label="Color"
                        value={currentVehicle.color}
                        readOnly
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormItem
                        label="Amenities"
                        value={currentVehicle.amenities}
                        readOnly
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormItem
                        label="LicensePlate"
                        value={currentVehicle.licensePlate}
                        readOnly
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormItem label="Row" value={currentVehicle.row} readOnly />
                </Grid>
                <Grid item xs={6}>
                    <FormItem
                        label="Column"
                        value={currentVehicle.column}
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

export default VehicleForm
