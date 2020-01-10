import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { StateMachineProvider, createStore } from 'little-state-machine'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
// import Table from "components/Table/Table"
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'

import firebase from '../../firebase'
import Table from './Table'
import EditForm from './EditForm'

import { useStep, useForm } from 'react-hooks-helper'

import MultiStepForm from './MultiStepForm'
import usePagination from 'firestore-pagination-hook'
import LoadButton from 'components/ActionButton/LoadButton'

createStore({
  data: {},
})

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
}

const useStyles = makeStyles(styles)

const TripList = history => {
  const db = firebase.firestore()
  const datastore = db.collection('trips')

  const classes = useStyles()
  const [list, setList] = useState([])

  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = usePagination(datastore.orderBy('updatedAt', 'desc'), {
    limit: 5,
  })

  useEffect(() => {
    setList(items.map(doc => ({ ...doc.data(), id: doc.id })))
  }, [items])

  const addDoc = doc => {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    setList([...list, doc])
    const res_doc = addSeats(doc)
    datastore.add(res_doc).then(ref => {
      console.log('new trip added with this id: ', ref.id)

      db.collection('vehicles')
        .doc(doc.vehicleId)
        .update({ state: 1 })
      db.collection('drivers')
        .doc(doc.driverId)
        .update({ state: 1 })
    })
  }

  const addSeats = doc => {
    // add seats array
    let row_st = 65
    let row_ed = 78 //N, doc.vehicleRow.charCodeAt(0)
    let column = 4 //doc.vehicleColumn

    for (let r = row_st; r <= row_ed; r++) {
      for (let c = 1; c <= column; c++) {
        // let book_obj = {
        //     seatId: String.fromCharCode(r) + c,
        //     state: 0, //0:available, 1:selected, 2:booked
        //     riderId: '',
        // }
        // doc.bookings.push(book_obj)

        let seatId = String.fromCharCode(r) + c
        let book_obj = {
          seatState: 0, //0:available, 1:selected, 2:booked
          // riderId: '',
          // riderName: '',
        }
        doc.bookings[seatId] = book_obj
      }
    }

    console.log(doc)

    return doc
  }

  const deleteDoc = id => {
    setList(list.filter(doc => doc.id !== id))
    datastore.doc(id).delete()
  }

  const [editing, setEditing] = useState(false)

  const initialFormState = {
    alias: '',
    routes: '',
    departureAddress: '',
    departureLatitude: 0,
    departureLongitude: 0,
    departureDatetime: new Date(),
    destinationAddress: '',
    destinationLatitude: 0,
    destinationLongitude: 0,
    estimatedArrivalTime: new Date(),

    vehicleId: '',
    vehicleName: '',
    vehicleCapacity: 0,
    vehicleModel: '',
    vehicleColor: '',
    vehicleLicensePlate: '',
    vehicleAmenities: '',
    vehicleRow: '',
    vehicleColumn: 0,
    vehicleState: 0,

    driverId: '',
    driverName: '',
    driverPhone: '',
    driverEmail: '',

    createdAt: null,
    updatedAt: null,

    bookings: {},
  }

  const [currentDoc, setCurrentDoc] = useState(initialFormState)

  const editDoc = doc => {
    setEditing(true)
    setCurrentDoc({
      id: doc.id,
      alias: doc.alias,
      routes: doc.routes,
      departureAddress: doc.departureAddress,
      departureLatitude: doc.departureLatitude,
      departureLongitude: doc.departureLongitude,
      departureDatetime: doc.departureDatetime,
      destinationAddress: doc.destinationAddress,
      destinationLatitude: doc.destinationLatitude,
      destinationLongitude: doc.destinationLongitude,
      estimatedArrivalTime: doc.estimatedArrivalTime,

      vehicleId: doc.vehicleId,
      vehicleName: doc.vehicleName ? doc.vehicleName : null,
      vehicleCapacity: doc.vehicleCapacity,
      vehicleModel: doc.vehicleModel,
      vehicleColor: doc.vehicleColor,
      vehicleLicensePlate: doc.vehicleLicensePlate,
      vehicleAmenities: doc.vehicleAmenities,
      vehicleRow: doc.vehicleRow,
      vehicleColumn: doc.vehicleColumn,
      vehicleState: doc.vehicleState,

      driverId: doc.driverId,
      driverName: doc.driverName ? doc.driverName : null,
      driverPhone: doc.driverPhone ? doc.driverPhone : null,
      driverEmail: doc.driverEmail ? doc.driverEmail : null,
      bookings: doc.bookings,

      createdAt: doc.createdAt ? doc.createdAt : null,
      updatedAt: doc.updatedAt ? doc.updatedAt : null,
    })
  }

  const updateDoc = updatedDoc => {
    setEditing(false)
    setList(list.map(doc => (doc.id === updatedDoc.id ? updatedDoc : doc)))

    updatedDoc.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    datastore.doc(updatedDoc.id).set(updatedDoc)
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Trip List</h4>
            <p className={classes.cardCategoryWhite}>
              You can add, remove and edit trip info.
            </p>
          </CardHeader>
          <CardBody>
            {/* <button onClick={addTrip}>Add new trip</button> */}

            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                  {editing ? (
                    <div>
                      <h2>Edit trip</h2>
                      <EditForm
                        editing={editing}
                        setEditing={setEditing}
                        currentDoc={currentDoc}
                        updateDoc={updateDoc}
                      />
                    </div>
                  ) : (
                    <MultiStepForm
                      addDoc={addDoc}
                      initialFormState={initialFormState}
                    />
                  )}
                </div>
                <div>
                  <h2>Trip List</h2>
                  <Table list={list} editDoc={editDoc} deleteDoc={deleteDoc} />
                  {loading && <div>Loading...</div>}
                  {hasMore && !loadingMore && <LoadButton proc={loadMore} />}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default TripList
