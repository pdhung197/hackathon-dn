import React from 'react'
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core/styles'

import DeleteButton from 'components/ActionButton/DeleteButton'
import EditButton from 'components/ActionButton/EditButton'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

const VehicleTable = props => {
    const classes = useStyles()
    return (
        <table>
            <thead>
                <tr>
                    {/* <th>Id</th> */}
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>LicensePlate</th>
                    <th>Amenities</th>
                    <th>Attach</th>
                    <th>Status</th>
                    <th>Datetime</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.list.length > 0 ? (
                    props.list.map(doc => (
                        <tr key={doc.id}>
                            {/* <td>{doc.id}</td> */}
                            <td>{doc.name}</td>
                            <td>
                                {doc.capacity}/{doc.row}
                                {doc.column}
                            </td>
                            <td>{doc.model}</td>
                            <td>{doc.color}</td>
                            <td>{doc.licensePlate}</td>
                            <td>{doc.amenities}</td>
                            <td>
                                <a href={doc.attachUrl} target={'_blank'}>
                                    {doc.attachName}
                                </a>
                            </td>
                            <td>
                                {doc.state == 0
                                    ? 'Ready'
                                    : doc.state == 1
                                    ? 'Settled'
                                    : doc.state == 2
                                    ? 'Traveling'
                                    : 'Broken'}
                            </td>
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
                                <DeleteButton
                                    proc={props.deleteDoc}
                                    doc={doc}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={11}>No vehicles</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default VehicleTable
