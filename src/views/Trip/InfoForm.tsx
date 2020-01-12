import React from 'react'

import FormItem from './FormItem'
import PrevButton from '../../components/ActionButton/PrevButton'
import NextButton from '../../components/ActionButton/NextButton'
const DestinationForm = ({ setForm, formData, navigation }: any) => {
  const { alias, routes } = formData
  const { previous, next } = navigation

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

      <div className="navigation">
        <NextButton proc={next} />
      </div>
    </div>
  )
}

export default DestinationForm
