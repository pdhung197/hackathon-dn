import React, { useState } from 'react'

import FormItem from './FormItem'

import Map from '../Maps/Map'

import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'
const DestinationForm = ({
  setForm,
  triggerSetForm,
  formData,
  navigation,
  google,
}: any) => {
  const {
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
    estimatedArrivalTime,
  } = formData
  const { previous, next } = navigation

  const [selectedDate, handleDateChange] = useState(destinationAddress)

  const proc = (address: any, lat: any, lng: any) => {
    // document.getElementsByName('destinationAddress')[0].value = address
    // document.getElementsByName('destinationLatitude')[0].value = lat
    // document.getElementsByName('destinationLongitude')[0].value = lng

    triggerSetForm('destinationAddress', address)
    triggerSetForm('destinationLatitude', lat)
    triggerSetForm('destinationLongitude', lng)
  }

  const changeDate = (newDate: any): void => {
    handleDateChange(newDate)
    setTimeout(() => {
      // document.getElementsByName('estimatedArrivalTime')[0].value = newDate

      triggerSetForm('estimatedArrivalTime', newDate)
    }, 100)
  }

  return (
    <div className="form">
      <h2>Destination</h2>

      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          <label>Estimated Arrival Time</label>

          <input
            type="hidden"
            readOnly
            name="estimatedArrivalTime"
            value={estimatedArrivalTime}
            onChange={setForm}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker value={selectedDate} onChange={changeDate} />
          </MuiPickersUtilsProvider>
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          <FormItem
            readOnly
            label="Latitude"
            name="destinationLatitude"
            value={destinationLatitude}
            onChange={setForm}
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          <FormItem
            readOnly
            label="Longitude"
            name="destinationLongitude"
            value={destinationLongitude}
            onChange={setForm}
          />
        </GridItem>
      </GridContainer>

      <div style={{ margin: '0 0 50px' }}>
        {
          // <Map
          //   proc={proc}
          //   simple={true}
          //   google={google}
          //   center={{ lat: 18.5204, lng: 73.8567 }}
          //   height="300px"
          //   zoom={15}
          // />
        }
      </div>

      <FormItem
        label="Address"
        name="destinationAddress"
        value={destinationAddress}
        onChange={setForm}
      />

      <div className="navigation">
        <PrevButton proc={previous} />
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default DestinationForm
