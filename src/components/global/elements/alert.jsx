import PropTypes from 'prop-types'

function Alert ({children, variant = 'primary', toggleRounded = true, className: classes = ''}) {

    const styles = {
        primary: 'bg-indigo-100',
        danger: 'bg-red-100',
        success: 'bg-green-100',
        warning: 'bg-orange-100',
        secondary: 'bg-gray-100',
    }

    return (
        <div className={`${styles[variant]} ${toggleRounded ? 'md:rounded-lg' : 'rounded-lg'} dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-md p-4 ${classes}`}>
            {children}
        </div>
    )
}

Alert.propTypes = {
    children: PropTypes.any,
    variant: PropTypes.string,
    toggleRounded: PropTypes.bool,
    className: PropTypes.string
}

export default Alert