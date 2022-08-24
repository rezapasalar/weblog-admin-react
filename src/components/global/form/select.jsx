import { memo } from 'react'
import PropTypes from 'prop-types'

import FormGroup from './group'
import SelectElement from '../elements/select'

function SelectForm ({label = '', value, options, keyname, type = 'string', error = '', inputHandler}) {
    return (
        <FormGroup label={label} error={error}>
            <SelectElement value={value} options={options} onChange={({target: {value}}) => inputHandler(keyname, value, type)}  />
        </FormGroup>
    )
}

SelectForm.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    options: PropTypes.array.isRequired,
    keyname: PropTypes.object.isRequired,
    type: PropTypes.string,
    error: PropTypes.string,
    inputHandler: PropTypes.func.isRequired,
}

export default memo(SelectForm)