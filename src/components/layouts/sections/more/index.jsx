import { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux'

import { setIsShowSidebar } from '../../../../store/slices/global'
import MoreSvg from '../../../global/svg/more'
const MoreList = lazy(() => import('./list'))

export default function More () {

    const dispatch = useDispatch()
    
    const [isShow, setIsShow] = useState(false)

    const dropDownRef = useRef(null)

    const clickOutsideHandler = ({target}) => (dropDownRef.current && !dropDownRef.current.contains(target)) && setIsShow(false)

    useEffect(() => {
        if (window.matchMedia('only screen and (max-width: 1024px)').matches) dispatch(setIsShowSidebar(false))
    }, [isShow])

    useEffect(() => {
        document.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [])

    const changeIsShow = useCallback(setIsShow, [])

    return (
        <div ref={dropDownRef} className="relative">

            <MoreSvg onClick={() => setIsShow(!isShow)} className="h-[1.4rem] w-[1.4rem] text-gray-500 dark:text-gray-100 cursor-pointer" />

            <div onClick={() => setIsShow(false)} className={`${isShow ? 'block' : 'hidden'} fixed inset-0 top-[60px] animate-slow-200  bg-gray-500/50 dark:bg-gray-900/50`}></div>

            {isShow && <Suspense><MoreList isShow={isShow} setIsShow={changeIsShow} /></Suspense>}
            
        </div>
    )
}