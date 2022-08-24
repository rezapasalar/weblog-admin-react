import { memo } from 'react'

export default memo(function ({onClick = null, viewType = false, className: classes = ''}) {
    return <svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} className={`${viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} cursor-pointer duration-300 ${classes}`} fill="currentColor" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 330 330"><path id="XMLID_469_" d="M315,30H15C6.716,30,0,36.716,0,45v60v180c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V105V45  C330,36.716,323.284,30,315,30z M150,120v60H30v-60H150z M180,120h120v60H180V120z M30,210h120v60H30V210z M180,270v-60h120v60H180z  "/></svg>
})