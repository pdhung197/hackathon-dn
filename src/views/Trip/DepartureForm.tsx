import React, { useEffect, useMemo, useState } from 'react'

import FormItem from './FormItem'
import Map from '../Maps/Map'

import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'

import PrevButton from 'components/ActionButton/PrevButton'
import NextButton from 'components/ActionButton/NextButton'
import { usePosition } from 'use-position'

const DepartureForm = ({
  setForm,
  triggerSetForm,
  formData,
  navigation,
  google,
}) => {
  const settings = useMemo(() => {
    return { enableHighAccuracy: true }
  }, [])

  let { latitude, longitude, timestamp, accuracy, error } = usePosition(
    true,
    settings,
  )

  console.log('1111111111111', latitude, longitude)
  console.log('2222222222222', latitude, longitude)
  console.log('3333333333333', latitude, longitude)

  if (latitude === undefined) latitude = 18.5204
  if (longitude === undefined) longitude = 73.8567

  const {
    departureAddress,
    departureLatitude,
    departureLongitude,
    departureDatetime,
  } = formData
  const { previous, next } = navigation

  const [selectedDate, handleDateChange] = useState(departureAddress)

  const proc = (address, lat, lng) => {
    document.getElementsByName('departureAddress')[0].value = address
    document.getElementsByName('departureLatitude')[0].value = lat
    document.getElementsByName('departureLongitude')[0].value = lng

    triggerSetForm('departureAddress', address)
    triggerSetForm('departureLatitude', lat)
    triggerSetForm('departureLongitude', lng)
  }

  const changeDate = newDate => {
    handleDateChange(newDate)
    setTimeout(() => {
      document.getElementsByName('departureDatetime')[0].value = newDate
      triggerSetForm('departureDatetime', newDate)
    }, 100)
  }

  useEffect(() => {}, [latitude, longitude])

  return (
    <div className="form">
      <h2>Add stations</h2>

      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          <label>Datetime</label>

          <input
            type="hidden"
            readOnly
            name="departureDatetime"
            value={departureDatetime}
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
            name="departureLatitude"
            value={departureLatitude}
            onChange={setForm}
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          <FormItem
            readOnly
            label="Longitude"
            name="departureLongitude"
            value={departureLongitude}
            onChange={setForm}
          />
        </GridItem>
      </GridContainer>

      <div style={{ margin: '0 0 50px' }}>
        {latitude && longitude && (
          <Map
            proc={proc}
            simple={true}
            google={google}
            center={{ lat: latitude, lng: longitude }}
            height="300px"
            zoom={15}
          />
        )}
      </div>

      <FormItem
        readOnly
        label="Address"
        name="departureAddress"
        value={departureAddress}
        onChange={setForm}
      />

      <div className="navigation">
        <PrevButton proc={previous} />
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default DepartureForm
