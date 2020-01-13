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

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/AddOutlined'

import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

import DeleteButton from '../../components/ActionButton/DeleteButton'
import EditButton from '../../components/ActionButton/EditButton'

import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'
import { usePosition, PositionOptions } from 'use-position'

const StationsForm = ({
  setForm,
  triggerSetForm,
  triggerStationsForm,
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

  const { stations } = formData
  const { previous, next } = navigation

  const [stationsList, setStationsList] = useState(stations)

  const initialCurrentStation = {
    id: '',
    name: '',
    addr: '',
    lat: latitude,
    lng: longitude,
  }

  const stationNameRef = useRef<HTMLInputElement>(null)
  const stationAddressRef = useRef<HTMLInputElement>(null)
  const stationLatitudeRef = useRef<HTMLInputElement>(null)
  const stationLongitudeRef = useRef<HTMLInputElement>(null)

  const proc = (address: string, lat: number, lng: number) => {
    if (null !== stationAddressRef.current)
      stationAddressRef.current.value = address
    if (null !== stationLatitudeRef.current)
      stationLatitudeRef.current.value = lat.toString()
    if (null !== stationLongitudeRef.current)
      stationLongitudeRef.current.value = lng.toString()

    setCurrentStation({
      id: lat + '' + lng,
      name: '',
      addr: address,
      lat,
      lng,
    })
    // triggerSetForm('departureAddress', address)
    // triggerSetForm('departureLatitude', lat)
    // triggerSetForm('departureLongitude', lng)
  }

  useEffect(() => {}, [stationsList])

  useLayoutEffect(() => {})

  const [currentStation, setCurrentStation] = useState(initialCurrentStation)

  const [editing, setEditing] = useState<boolean>(false)

  const editStation = (doc: any) => {
    setEditing(true)
    setCurrentStation({
      id: doc.id,
      name: doc.name,
      addr: doc.addr,
      lat: doc.lat,
      lng: doc.lng,
    })
  }

  const deleteStation = (id: string): void => {
    setStationsList(stationsList.filter((doc: any): boolean => doc.id !== id))
    triggerStationsForm(stationsList)
  }

  return (
    <div className="form">
      <h2>Add stations</h2>

      <GridContainer>
        <GridItem xs={3} sm={3} md={3}>
          <FormItem
            readOnly
            label="Latitude"
            value={currentStation.lat}
            onChange={setForm}
            ref={stationLatitudeRef}
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3}>
          <FormItem
            readOnly
            label="Longitude"
            value={currentStation.lng}
            onChange={setForm}
            ref={stationLongitudeRef}
          />
        </GridItem>
        <GridItem xs={6} sm={6} md={6}>
          <FormItem
            readOnly
            label="Address"
            value={currentStation.addr}
            onChange={setForm}
            ref={stationAddressRef}
          />
        </GridItem>
      </GridContainer>

      <div style={{ margin: '0 0 50px' }}>
        {latitude && longitude && (
          <Map
            proc={proc}
            simple={false}
            google={google}
            center={{ lat: latitude, lng: longitude }}
            height="300px"
            zoom={15}
          />
        )}
      </div>

      <GridContainer>
        <GridItem xs={2} sm={2} md={2}>
          {'station name'}
        </GridItem>
        <GridItem xs={7} sm={7} md={7}>
          <input type="text" ref={stationNameRef} />
        </GridItem>
        <GridItem xs={3} sm={3} md={3}>
          <Fab color="secondary" aria-label="edit" size="small">
            <AddIcon
              onClick={() => {
                if (
                  stationNameRef.current &&
                  stationNameRef.current.value === ''
                ) {
                  alert('Input station name!')
                  return
                }
                if (
                  stationNameRef.current &&
                  stationNameRef.current.value !== ''
                )
                  currentStation.name = stationNameRef.current.value

                if (editing === true)
                  setStationsList(
                    stationsList.filter((doc: any): boolean =>
                      doc.id === currentStation.id ? currentStation : doc,
                    ),
                  )
                else
                  setStationsList([
                    ...stationsList.filter(
                      (doc: any): boolean => doc.id !== currentStation.id,
                    ),
                    currentStation,
                  ])

                triggerStationsForm(stationsList)

                setEditing(false)
              }}
            />
          </Fab>
        </GridItem>
      </GridContainer>

      <div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>No</th>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '20%' }}>Address</th>
              <th style={{ width: '20%' }}>Latitude</th>
              <th style={{ width: '20%' }}>Longitude</th>
              <th colSpan={2}>Actions</th>
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
                    <td>
                      <EditButton proc={editStation} doc={doc} />
                    </td>
                    <td>
                      <DeleteButton proc={deleteStation} doc={doc} />
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td colSpan={7}>No stations</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="navigation">
        <PrevButton proc={previous} />
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default StationsForm
