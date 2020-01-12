import React from 'react'
import Moment from 'react-moment'

import DeleteButton from '../../components/ActionButton/DeleteButton'

const BookingTable = (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          {/* <th>Id</th> */}
          <th>Rider</th>
          <th>Trip</th>
          <th>Driver</th>
          <th>Vehicle</th>
          <th>Seat</th>
          <th>Pickup</th>
          <th>Dropoff</th>
          <th>Datetime</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.list.length > 0 ? (
          props.list.map((doc: any) => (
            <tr key={doc.id}>
              {/* <td>{doc.id}</td> */}
              <td>{doc.riderName}</td>
              <td>{doc.tripAlias}</td>
              <td>{doc.driverName}</td>
              <td>{doc.vehicleName}</td>
              <td>{doc.seatId}</td>
              <td>
                {doc.pickupLatitude}
                <br />
                {doc.pickupLongitude}
              </td>
              <td>
                {doc.dropoffLatitude}
                <br />
                {doc.dropoffLongitude}
              </td>
              <td>
                <Moment format="YYYY-MM-DD HH:mm">
                  {doc.createdAt && doc.createdAt.toDate()}
                </Moment>
                <br />
                <Moment format="YYYY-MM-DD HH:mm">
                  {doc.updatedAt && doc.updatedAt.toDate()}
                </Moment>
              </td>
              <td>
                <DeleteButton proc={props.deleteDoc} doc={doc} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>No Bookings</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default BookingTable
