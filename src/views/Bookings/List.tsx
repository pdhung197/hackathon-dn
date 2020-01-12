import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
// @material-ui/core components
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

import usePagination from 'firestore-pagination-hook'
import LoadButton from '../../components/ActionButton/LoadButton'
import { Booking } from '../../types'

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
  const datastore = db.collection('bookings')

  // const classes = useStyles()
  const { classes } = props

  const [list, setList] = useState<Booking[]>([])

  const deleteDoc = (id: string): void => {
    setList(list.filter((doc: any): any => doc.id !== id))
    datastore.doc(id).delete()
  }

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
    setList(items.map((doc: any): any => ({ ...doc.data(), id: doc.id })))
  }, [items])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Booking List</h4>
            <p className={classes.cardCategoryWhite}>
              You can view booking info.
            </p>
          </CardHeader>
          <CardBody>
            <div className="container">
              <div className="flex-row">
                <div className="flex-large">
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
                      <h2>View bookings</h2>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}></GridItem>
                  </GridContainer>

                  <Table list={list} deleteDoc={deleteDoc} />
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
