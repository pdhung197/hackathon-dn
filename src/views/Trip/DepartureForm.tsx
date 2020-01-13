import React, {
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'

import FormItem from './FormItem'
import Map from '../Maps/Map'

import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'
import { usePosition, PositionOptions } from 'use-position'

const DepartureForm = ({
  setForm,
  triggerSetForm,
  formData,
  navigation,
  google,
}: any): ReactElement => {
  const settings: PositionOptions = useMemo(() => {
    return { enableHighAccuracy: true, timeout: 15000, maximumAge: 15000 }
  }, [])

  let { latitude, longitude, timestamp, accuracy } = usePosition(true, settings)

  if (latitude === undefined) latitude = 18.5204
  if (longitude === undefined) longitude = 73.8567

  const { departureAddress, departureLatitude, departureLongitude } = formData
  const { previous, next } = navigation

  const departureAddressRef = useRef<HTMLInputElement>(null)
  const departureLatitudeRef = useRef<HTMLInputElement>(null)
  const departureLongitudeRef = useRef<HTMLInputElement>(null)

  const proc = (address: any, lat: any, lng: any) => {
    if (null !== departureAddressRef.current)
      departureAddressRef.current.value = address
    if (null !== departureLatitudeRef.current)
      departureLatitudeRef.current.value = lat
    if (null !== departureLongitudeRef.current)
      departureLongitudeRef.current.value = lng

    triggerSetForm('departureAddress', address)
    triggerSetForm('departureLatitude', lat)
    triggerSetForm('departureLongitude', lng)
  }

  useEffect(() => {}, [latitude, longitude])

  useLayoutEffect(() => {})

  return (
    <div className="form">
      <h2>Add stations</h2>

      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          <FormItem
            readOnly
            label="Latitude"
            name="departureLatitude"
            value={departureLatitude}
            onChange={setForm}
            ref={departureLatitudeRef}
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          <FormItem
            readOnly
            label="Longitude"
            name="departureLongitude"
            value={departureLongitude}
            onChange={setForm}
            ref={departureLongitudeRef}
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
        ref={departureAddressRef}
      />

      <div className="navigation">
        <PrevButton proc={previous} />
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default DepartureForm
