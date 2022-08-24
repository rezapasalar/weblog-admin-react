import PropTypes from 'prop-types'
import { ColumnGridWrap, InputFormik } from '.'

function NameFamily ({cols = "2", gap = "3"}) {

    return (
        <ColumnGridWrap cols={cols} gap={gap}>
            <InputFormik name="name" />
            <InputFormik name="family" />
        </ColumnGridWrap>
    )
}

NameFamily.propTypes = {
    cols: PropTypes.string,
    gap: PropTypes.string,
}

export default NameFamily