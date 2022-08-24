import { memo } from 'react'
import PropTypes from 'prop-types'

function ErrorElement ({message}) {
    return <small className="text-red-500">{message}</small>
}

ErrorElement.propTypes = {
    message: PropTypes.any.isRequired
}

export default memo(ErrorElement)