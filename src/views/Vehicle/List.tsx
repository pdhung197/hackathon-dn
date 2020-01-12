import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import firebase from '../../firebase'
import Table from './Table'
import AddForm from './AddForm'
import EditForm from './EditForm'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import usePagination from 'firestore-pagination-hook'
import LoadButton from '../../components/ActionButton/LoadButton'
import { Vehicle } from '../../types'

const styles = createStyles({
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
    // fontWeight: '300',
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
})

function Page(props: any) {
  const db = firebase.firestore()
  const datastore = db.collection('vehicles')

  const { classes } = props

  const [list, setList] = useState<Vehicle[]>([])

  const addDoc = (doc: any): void => {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    setList([...list, doc])
    datastore.add(doc)
  }

  const deleteDoc = (id: any): void => {
    setList(list.filter(doc => doc.id !== id))
    datastore.doc(id).delete()
  }

  const [editing, setEditing] = useState(false)
  const initialFormState = {
    id: null,
    name: '',
    capacity: 0,
    model: '',
    color: '',
    licensePlate: '',
    amenities: '',
    row: '',
    column: 0,
    state: 0,
    attachName: '',
    attachUrl: '',
    createdAt: null,
    updatedAt: null,
  }
  const [currentDoc, setCurrentDoc] = useState(initialFormState)

  const editDoc = (doc: any): void => {
    setEditing(true)
    setCurrentDoc({
      id: doc.id,
      name: doc.name,
      capacity: doc.capacity,
      model: doc.model,
      color: doc.color,
      licensePlate: doc.licensePlate,
      amenities: doc.amenities,
      row: doc.row,
      column: doc.column,
      state: doc.state,
      attachName: doc.attachName ? doc.attachName : null,
      attachUrl: doc.attachUrl ? doc.attachUrl : null,

      createdAt: doc.createdAt ? doc.createdAt : null,
      updatedAt: doc.updatedAt ? doc.updatedAt : null,
    })
  }

  const updateDoc = (updatedDoc: any): void => {
    setEditing(false)
    setList(list.map(doc => (doc.id === updatedDoc.id ? updatedDoc : doc)))

    datastore.doc(updatedDoc.id).update(updatedDoc)
  }

  const [stateFilter, setStateFilter] = useState(-1)
  const handleStateFilterChange = (e: any): void => {
    setStateFilter(e.target.value)
  }

  const {
    loading,
    loadingError,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = usePagination(
    stateFilter == -1
      ? datastore.orderBy('updatedAt', 'desc')
      : datastore
          .where('state', '==', stateFilter)
          .orderBy('updatedAt', 'desc'),
    {
      limit: 5,
    },
  )

  useEffect(() => {
    setList(items.map(doc => ({ ...doc.data(), id: doc.id })))
  }, [items, stateFilter])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Vehicle List</h4>
            <p className={classes.cardCategoryWhite}>
              You can add, remove and edit vehicle info.
            </p>
          </CardHeader>
          <CardBody>
            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                  {editing ? (
                    <div>
                      <h2>Edit vehicle</h2>
                      <EditForm
                        editing={editing}
                        setEditing={setEditing}
                        currentDoc={currentDoc}
                        updateDoc={updateDoc}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2>Add vehicle</h2>
                      <AddForm addDoc={addDoc} />
                    </div>
                  )}
                </div>
                <div className="flex-large">
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
                      <h2>View vehicles</h2>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <Select
                        value={stateFilter}
                        onChange={handleStateFilterChange}
                      >
                        <MenuItem value={-1}>All</MenuItem>
                        <MenuItem value={0}>Ready</MenuItem>
                        <MenuItem value={1}>Settled</MenuItem>
                        <MenuItem value={2}>Traveling</MenuItem>
                        <MenuItem value={3}>Broken</MenuItem>
                      </Select>
                    </GridItem>
                  </GridContainer>

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

export default withStyles(styles)(Page)
