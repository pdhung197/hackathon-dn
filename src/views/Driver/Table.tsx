import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DeleteButton from 'components/ActionButton/DeleteButton'
import EditButton from 'components/ActionButton/EditButton'

import Moment from 'react-moment'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

const DriverTable = props => {
    const classes = useStyles()
    return (
        <table>
            <thead>
                <tr>
                    {/* <th>Id</th> */}
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>

                    <th>Datetime</th>
                    <th>Attach</th>
                    <th>State</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.list.length > 0 ? (
                    props.list.map(doc => (
                        <tr key={doc.id}>
                            {/* <td>{doc.id}</td> */}
                            <td>{doc.name}</td>
                            <td>{doc.email}</td>
                            <td>{doc.phone}</td>
                            <td>
                                {/* {doc.createdAt && (
                                    <Moment format="YYYY-MM-DD HH:mm">
                                        {doc.createdAt.toDate()}
                                    </Moment>
                                )} */}
                                <br />
                                {/* <Moment format="YYYY-MM-DD HH:mm">
                                    {doc.updatedAt && doc.updatedAt.toDate()}
                                </Moment> */}
                            </td>
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
                                    : 'Traveling'}
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
                        <td colSpan={8}>No drivers</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DriverTable
