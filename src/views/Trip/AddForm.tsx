import React from 'react'
import { useForm, useStep, UseStepParams } from 'react-hooks-helper'

import InfoForm from './InfoForm'
import StationsForm from './StationsForm'
import VehicleForm from './VehicleForm'
import DriverForm from './DriverForm'
import ReviewForm from './ReviewForm'
import ConfirmationForm from './ConfirmationForm'

const steps = [
  'info',
  'stations',
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

  const triggerStationsForm = (value: any[]) => {
    let e = {
      target: {
        name: 'stations',
        value: value,
      },
    }
    setForm(e)
  }

  const props = {
    formData,
    setForm,
    triggerSetForm,
    triggerStationsForm,
    navigation,
    addDoc,
  }

  switch (step.toString()) {
    case 'info':
      return <InfoForm {...props} />
    case 'stations':
      return <StationsForm {...props} />
    case 'vehicle':
      return <VehicleForm {...props} />
    case 'driver':
      return <DriverForm {...props} />
    case 'review':
      return <ReviewForm {...props} />
    case 'confirmation':
      return <ConfirmationForm {...props} />
    default:
      return <>{step}</>
  }
}
