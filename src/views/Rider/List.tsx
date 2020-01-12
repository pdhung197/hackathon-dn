import React, { useState, useEffect } from 'react'
import { createStyles } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import firebase from '../../firebase'
import AddForm from './AddForm'
import EditForm from './EditForm'
import Table from './Table'

import usePagination from 'firestore-pagination-hook'
import LoadButton from '../../components/ActionButton/LoadButton'
import { Rider } from '../../types'

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

// const useStyles = makeStyles(styles)

function Page(props: any) {
  const db = firebase.firestore()
  const datastore = db.collection('riders')

  // const classes = useStyles()
  const { classes } = props

  const [list, setList] = useState<Rider[]>([])

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

  const addDoc = (doc: any): void => {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp()

    setList([...list, doc])

    datastore.add(doc)
  }

  const deleteDoc = (id: string): void => {
    setList(list.filter(doc => doc.id !== id))
    datastore.doc(id).delete()
  }

  const [editing, setEditing] = useState(false)
  const initialFormState = {
    id: null,
    name: '',
    email: '',
    phone: '',
    createdAt: null,
    updatedAt: null,
  }
  const [currentDoc, setCurrentDoc] = useState(initialFormState)

  const editDoc = (doc: any): void => {
    setEditing(true)
    setCurrentDoc({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      createdAt: doc.createdAt ? doc.createdAt : null,
      updatedAt: doc.updatedAt ? doc.updatedAt : null,
    })
  }

  const updateDoc = (updatedDoc: any): void => {
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
            <h4 className={classes.cardTitleWhite}>Passenger List</h4>
            <p className={classes.cardCategoryWhite}>
              You can add, remove and edit passenger info.
            </p>
          </CardHeader>
          <CardBody>
            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                  {editing ? (
                    <div>
                      <h2>Edit passenger</h2>
                      <EditForm
                        editing={editing}
                        setEditing={setEditing}
                        currentDoc={currentDoc}
                        updateDoc={updateDoc}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2>Add passenger</h2>
                      <AddForm addDoc={addDoc} />
                    </div>
                  )}
                </div>
                <div className="flex-large">
                  <h2>View passenger</h2>
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
