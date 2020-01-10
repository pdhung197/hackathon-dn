import React from 'react'

import FormItem from './FormItem'
import StatesDropdown from './StatesDropdown'

import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import Button from '@material-ui/core/Button'
import PrevButton from 'components/ActionButton/PrevButton'
import NextButton from 'components/ActionButton/NextButton'
const DestinationForm = ({ setForm, formData, navigation }) => {
    const { alias, routes } = formData
    const { previous, next } = navigation

    return (
        <div className="form">
            <h2>Alias</h2>

            <FormItem
                label="Alias"
                name="alias"
                value={alias}
                onChange={setForm}
            />
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
