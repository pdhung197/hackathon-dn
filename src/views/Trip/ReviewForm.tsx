import React from 'react'

import FormItem from './FormItem'

import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/EditOutlined'
import PrevButton from 'components/ActionButton/PrevButton'
import NextButton from 'components/ActionButton/NextButton'
import EditButton from 'components/ActionButton/ReviewEditButton'
const ReviewForm = ({ setForm, formData, navigation, addDoc }) => {
    const {
        alias,
        routes,
        departureAddress,
        departureLatitude,
        departureLongitude,
        departureDatetime,
        destinationAddress,
        destinationLatitude,
        destinationLongitude,
        estimatedArrivalTime,

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

        driverId,
        driverName,
        driverPhone,
        driverEmail,
    } = formData

    const { go, previous } = navigation

    const addTrip = () => {
        addDoc(formData)
        go('confirmation')
    }

    return (
        <div className="form">
            <h2>Trip Review</h2>

            <h3>
                Alias, Routes
                <EditButton proc={() => go('info')} />
            </h3>
            <div>{`${alias}`}</div>
            <div>{routes}</div>

            <h3>
                Departure
                <EditButton proc={() => go('departure')} />
            </h3>
            <div>{`${departureAddress}`}</div>
            <div>{departureLatitude}</div>
            <div>{departureLongitude}</div>
            <div>{`${departureDatetime}`}</div>

            <h3>
                Destination
                <EditButton proc={() => go('destination')} />
            </h3>
            <div>{`${destinationAddress}`}</div>
            <div>{destinationLatitude}</div>
            <div>{destinationLongitude}</div>
            <div>{`${estimatedArrivalTime}`}</div>

            <h3>
                Vehicle
                <EditButton proc={() => go('vehicle')} />
            </h3>
            <div>{vehicleName}</div>
            <div>{vehicleCapacity}</div>
            <div>{vehicleModel}</div>
            <div>{vehicleColor}</div>
            <div>{vehicleLicensePlate}</div>
            <div>{`${vehicleAmenities}`}</div>
            <div>{vehicleRow}</div>
            <div>{vehicleColumn}</div>

            <h3>
                Driver
                <EditButton proc={() => go('driver')} />
            </h3>
            <div>{driverName}</div>
            <div>{driverEmail}</div>
            <div>{driverPhone}</div>

            <div className="navigation">
                <PrevButton proc={previous} />
                <NextButton proc={addTrip} title={'Confirm'} />
            </div>
        </div>
    )
}

export default ReviewForm
