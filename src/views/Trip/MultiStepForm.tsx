import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'

import InfoForm from './InfoForm'
import DepartureForm from './DepartureForm'
import DestinationForm from './DestinationForm'
import VehicleForm from './VehicleForm'
import DriverForm from './DriverForm'
import ReviewForm from './ReviewForm'
import ConfirmationForm from './ConfirmationForm'

const steps = [
    { id: 'info' },
    { id: 'departure' },
    { id: 'destination' },
    { id: 'vehicle' },
    { id: 'driver' },
    { id: 'review' },
    { id: 'confirmation' },
]

export default ({ addDoc, initialFormState }) => {
    const [formData, setForm] = useForm(initialFormState)
    const { step, navigation } = useStep({ initialStep: 0, steps })
    const { id } = step

    const triggerSetForm = (name, value) => {
        let e = {
            target: {
                name: name,
                value:
                    name == 'vehicleState' || name == 'vehicleColumn'
                        ? parseInt(value)
                        : value.toString(),
            },
        }
        setForm(e)
    }

    const props = { formData, setForm, triggerSetForm, navigation, addDoc }

    switch (id) {
        case 'info':
            return <InfoForm {...props} />
        case 'departure':
            return <DepartureForm {...props} />
        case 'destination':
            return <DestinationForm {...props} />
        case 'vehicle':
            return <VehicleForm {...props} />
        case 'driver':
            return <DriverForm {...props} />
        case 'review':
            return <ReviewForm {...props} />
        case 'confirmation':
            return <ConfirmationForm {...props} />
        default:
            return null
    }
}
