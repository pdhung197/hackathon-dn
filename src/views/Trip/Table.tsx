import React, { ReactElement } from 'react'

import DeleteButton from '../../components/ActionButton/DeleteButton'
import EditButton from '../../components/ActionButton/EditButton'
import Moment from 'react-moment'

const TripTable = (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: '2%' }}>No</th>
          <th style={{ width: '10%' }}>Alias</th>
          <th style={{ width: '10%' }}>Routes</th>

          <th style={{ width: '40%' }}>Stations</th>

          <th style={{ width: '18%' }}>Date and time</th>

          <th style={{ width: '10%' }}>Vehicle</th>
          <th style={{ width: '5%' }}>Driver</th>
          <th style={{ width: '5%' }}></th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.list.length > 0 ? (
          props.list.map(
            (doc: any, idx: number): ReactElement => (
              <tr key={doc.id}>
                <td>{idx + 1}</td>
                <td>{doc.alias}</td>
                <td>{doc.routes}</td>
                <td>
                  {doc.stations && (
                    <table>
                      <tbody>
                        {doc.stations.length > 0 ? (
                          doc.stations.map(
                            (subdoc: any, idx: number): ReactElement => (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{subdoc.addr}</td>
                              </tr>
                            ),
                          )
                        ) : (
                          <tr>
                            <td colSpan={4}>No stations</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </td>
                <td>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {doc.departureDatetime}
                  </Moment>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {doc.estimatedArrivalDatetime}
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
            <td colSpan={10}>No trips</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default TripTable
