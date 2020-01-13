import React, { ReactElement } from 'react'

import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'
import EditButton from '../../components/ActionButton/ReviewEditButton'

import { NavigationProps } from 'react-hooks-helper'

const ReviewForm = ({ setForm, formData, navigation, addDoc }: any) => {
  const {
    alias,
    routes,
    departureDatetime,
    estimatedArrivalDatetime,

    stations,

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

  // 'info',0
  // 'stations',1
  // 'vehicle',2
  // 'driver',3
  // 'review',4
  // 'confirmation',5

  const addTrip = () => {
    addDoc(formData)
    go(5)
  }

  return (
    <div className="form">
      <h2>Trip Review</h2>

      <h3>
        Alias, Routes, Date and time
        <EditButton proc={() => go(0)} />
      </h3>
      <div>{`${alias}`}</div>
      <div>{routes}</div>
      <div>{`${departureDatetime}`}</div>
      {'~'}
      <div>{`${estimatedArrivalDatetime}`}</div>

      <h3>
        Stations
        <EditButton proc={() => go(1)} />
      </h3>

      <table>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>No</th>
            <th style={{ width: '20%' }}>name</th>
            <th style={{ width: '20%' }}>Address</th>
            <th style={{ width: '20%' }}>Latitude</th>
            <th style={{ width: '20%' }}>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {stations.length > 0 ? (
            stations.map(
              (doc: any, idx: number): ReactElement => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.addr}</td>
                  <td>{doc.lat}</td>
                  <td>{doc.lng}</td>
                </tr>
              ),
            )
          ) : (
            <tr>
              <td colSpan={5}>No stations</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>
        Vehicle
        <EditButton proc={() => go(2)} />
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
        <EditButton proc={() => go(3)} />
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
