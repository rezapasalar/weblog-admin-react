import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsShowSidebar } from '../../../../store/slices/global'
import DropDownItemElement from './item'
import swal from '../../../../modules/sweetAlert'
import { MoreSvg, ProfileSvg, SettingSvg, LogoutSvg } from '../../../global/svg'

export default function DropDown () {

    const dispatch = useDispatch()

    const navigation = useNavigate()
    
    const [isShow, setIsShow] = useState(false)

    const dropDownRef = useRef(null)

    const clickOutsideHandler = ({target}) => dropDownRef.current && !dropDownRef.current.contains(target) ? setIsShow(false) : null

    useEffect(() => {
        if (window.matchMedia('only screen and (max-width: 1024px)').matches) dispatch(setIsShowSidebar(false))
    }, [isShow])

    useEffect(() => {
        document.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('auth')
        swal.toast('success', 'خروج با موفقیت انجام شد')
        navigation('/auth/login')
    }

    const redirect = (to) => {
        setIsShow(false)
        navigation(to)
    }

    return (
        <div ref={dropDownRef} className="relative">

            <MoreSvg onClick={() => setIsShow(!isShow)} className="h-[1.4rem] w-[1.4rem] text-gray-500 dark:text-gray-100 cursor-pointer" />

            <div onClick={() => setIsShow(false)} className={`${isShow ? 'block' : 'hidden'} fixed inset-0 top-[60px] animate-slow-200  bg-gray-500/50 dark:bg-gray-900/50`}></div>

            <div className={`${isShow ? 'block' : 'hidden'} origin-top-left absolute left-2 top-5 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300/80 dark:ring-gray-700/70 focus:outline-none animate-slow-200`}>
                <DropDownItemElement position="top" onClick={() => redirect('/admin/profile')}>
                    <ProfileSvg className="h-5 w-5" />
                    <span>پروفایل</span>
                </DropDownItemElement>

                <DropDownItemElement onClick={() => redirect('/admin/setting')}>
                    <SettingSvg className="h-5 w-5"  />
                    <span>تنظیمات</span>
                </DropDownItemElement>

                <DropDownItemElement position="bottom" onClick={logoutHandler}>
                    <LogoutSvg className="h-5 w-5" />
                    <span>خروج</span>
                </DropDownItemElement>
            </div>
            
        </div>
    )
}