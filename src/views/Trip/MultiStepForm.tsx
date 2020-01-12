import React from 'react'
import { useForm, useStep, UseStepParams } from 'react-hooks-helper'

import InfoForm from './InfoForm'
import DepartureForm from './DepartureForm'
import DestinationForm from './DestinationForm'
import VehicleForm from './VehicleForm'
import DriverForm from './DriverForm'
import ReviewForm from './ReviewForm'
import ConfirmationForm from './ConfirmationForm'

const steps = [
  'info',
  'departure',
  'destination',
  'vehicle',
  'driver',
  'review',
  'confirmation',
]

export default ({ addDoc, initialFormState }: any) => {
  const [formData, setForm] = useForm(initialFormState)
  const { step, navigation } = useStep({
    initialStep: 0,
    steps,
  })

  const triggerSetForm = (name: string, value: string) => {
    let e = {
      target: {
        name: name,
        value:
          name === 'vehicleState' || name === 'vehicleColumn'
            ? parseInt(value)
            : value.toString(),
      },
    }
    setForm(e)
  }

  const props = { formData, setForm, triggerSetForm, navigation, addDoc }

  switch (step) {
    case 0: //'info':
      return <InfoForm {...props} />
    case 1: //'departure':
      return <DepartureForm {...props} />
    case 2: //'destination':
      return <DestinationForm {...props} />
    case 3: //'vehicle':
      return <VehicleForm {...props} />
    case 4: //'driver':
      return <DriverForm {...props} />
    case 5: //'review':
      return <ReviewForm {...props} />
    case 6: //'confirmation':
      return <ConfirmationForm {...props} />
    default:
      return null
  }
}
