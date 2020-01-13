import React, { useRef, useState } from 'react'

import FormItem from './FormItem'

import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'

const DestinationForm = ({
  setForm,
  triggerSetForm,
  formData,
  navigation,
}: any) => {
  const { alias, routes, departureDatetime } = formData
  const { previous, next } = navigation

  const departureDatetimeRef = useRef<HTMLInputElement>(null)

  const [selectedDate, handleDateChange] = useState(departureDatetime)

  const changeDate = (newDate: any) => {
    handleDateChange(newDate)
    setTimeout(() => {
      // document.getElementsByName('departureDatetime')[0].value = newDate

      if (null !== departureDatetimeRef.current)
        departureDatetimeRef.current.value = newDate
      triggerSetForm('departureDatetime', newDate)
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

      <label>Datetime</label>

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

      <div className="navigation">
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default DestinationForm
