import React, { useRef, useState } from 'react'

import FormItem from './FormItem'

import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'
import Grid from '@material-ui/core/Grid'

const DestinationForm = ({
  setForm,
  triggerSetForm,
  formData,
  navigation,
}: any) => {
  const {
    alias,
    routes,
    departureDatetime,
    estimatedArrivalDatetime,
  } = formData
  const { previous, next } = navigation

  const departureDatetimeRef = useRef<HTMLInputElement>(null)
  const estimatedArrivalDatetimeRef = useRef<HTMLInputElement>(null)

  const [selectedDate, handleDateChange] = useState(departureDatetime)
  const [selectedDate2, handleDateChange2] = useState(estimatedArrivalDatetime)

  const changeDate = (newDate: any) => {
    handleDateChange(newDate)
    setTimeout(() => {
      if (null !== departureDatetimeRef.current)
        departureDatetimeRef.current.value = newDate
      triggerSetForm('departureDatetime', newDate)
    }, 100)
  }

  const changeDate2 = (newDate: any) => {
    handleDateChange2(newDate)
    setTimeout(() => {
      if (null !== estimatedArrivalDatetimeRef.current)
        estimatedArrivalDatetimeRef.current.value = newDate
      triggerSetForm('estimatedArrivalDatetime', newDate)
    }, 100)
  }

  return (
    <div className="form">
      <h2>Alias</h2>

      <FormItem label="Alias" name="alias" value={alias} onChange={setForm} />
      <FormItem
        label="Routes"
        name="routes"
        value={routes}
        onChange={setForm}
      />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <label>DepartureDatetime</label>

          <input
            type="hidden"
            readOnly
            name="departureDatetime"
            value={departureDatetime}
            onChange={setForm}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker value={selectedDate} onChange={changeDate} />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <label>ArrivalDatetime</label>

          <input
            type="hidden"
            readOnly
            name="estimatedArrivalDatetime"
            value={estimatedArrivalDatetime}
            onChange={setForm}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker value={selectedDate2} onChange={changeDate2} />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <div className="navigation">
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default DestinationForm
