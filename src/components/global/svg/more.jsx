import { memo } from 'react'

export default memo(function More ({onClick = null, className: classes = ''}) {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className={`${classes}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
})