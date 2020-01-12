import React, { ReactElement } from 'react'

import DeleteButton from '../../components/ActionButton/DeleteButton'
import EditButton from '../../components/ActionButton/EditButton'
import Moment from 'react-moment'

const TripTable = (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          {/* <th style={{ width: '2%' }}></th> */}
          <th style={{ width: '10%' }}>Alias</th>
          <th style={{ width: '10%' }}>Routes</th>
          <th style={{ width: '10%' }}>Departure</th>
          <th style={{ width: '14%' }}>DepartureTime</th>
          <th style={{ width: '10%' }}>Destination</th>
          <th style={{ width: '14%' }}>ArrivalTime</th>
          <th style={{ width: '10%' }}>Vehicle</th>
          <th style={{ width: '5%' }}>Driver</th>
          <th style={{ width: '5%' }}>Datetime</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.list.length > 0 ? (
          props.list.map(
            (doc: any): ReactElement => (
              <tr key={doc.id}>
                {/* <td></td> */}
                <td>{doc.alias}</td>
                <td>{doc.routes}</td>
                <td>
                  {doc.departureAddress}
                  <br />
                  {doc.departureLatitude}
                  <br />
                  {doc.departureLongitude}
                </td>
                <td>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {doc.departureDatetime}
                  </Moment>
                </td>
                <td>
                  {doc.destinationAddress}
                  <br />
                  {doc.destinationLatitude}
                  <br />
                  {doc.destinationLongitude}
                </td>
                <td>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {doc.estimatedArrivalTime}
                  </Moment>
                </td>
                <td>
                  {doc.vehicleName}
                  <br />
                  {doc.vehicleCapacity}
                  <br />
                  {doc.vehicleModel}
                  <br />
                  {doc.vehicleColor}
                  <br />
                  {doc.vehicleLicensePlate}
                  <br />
                  {doc.vehicleAmenities}
                </td>
                <td>
                  {doc.driverName}
                  <br />
                  {doc.driverPhone}
                </td>
                <td>
                  {/* {doc.createdAt && (
                                    <Moment format="YYYY-MM-DD HH:mm">
                                        {doc.createdAt.toDate()}
                                    </Moment>
                                )} */}

                  <br />
                  {/* {doc.updatedAt && (
                                    <Moment format="YYYY-MM-DD HH:mm">
                                        {doc.updatedAt.toDate()}
                                    </Moment>
                                )} */}
                </td>
                <td>
                  <EditButton proc={props.editDoc} doc={doc} />
                </td>
                <td>
                  <DeleteButton proc={props.deleteDoc} doc={doc} />
                </td>
              </tr>
            ),
          )
        ) : (
          <tr>
            <td colSpan={11}>No trip</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default TripTable
