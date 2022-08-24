import PropTypes from 'prop-types'

function ButtonGroup ({children, align = 'left', className: classes = ''}) {
    return (
        <div className={`${align === 'left' ? 'justify-end' : 'justify-start'} flex items-center  space-x-reverse space-x-2 mt-8 ${classes}`}>
            {children}
        </div>
    )
}

ButtonGroup.propTypes = {
    children: PropTypes.node,
    align: PropTypes.string,
    className: PropTypes.string
}

export default ButtonGroup