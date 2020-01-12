import React from 'react'

import DeleteButton from '../../components/ActionButton/DeleteButton'
import EditButton from '../../components/ActionButton/EditButton'

const RiderTable = (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          {/* <th>Id</th> */}
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Datetime</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.list.length > 0 ? (
          props.list.map((doc: any) => (
            <tr key={doc.id}>
              {/* <td>{doc.id}</td> */}
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.phone}</td>
              <td>
                {/* <Moment format="YYYY-MM-DD HH:mm">
                                    {doc.createdAt && doc.createdAt.toDate()}
                                </Moment> */}
                <br />
                {/* <Moment format="YYYY-MM-DD HH:mm">
                                    {doc.updatedAt && doc.updatedAt.toDate()}
                                </Moment> */}
              </td>
              <td>
                <EditButton proc={props.editDoc} doc={doc} />
              </td>
              <td>
                <DeleteButton proc={props.deleteDoc} doc={doc} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No passengers</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default RiderTable
