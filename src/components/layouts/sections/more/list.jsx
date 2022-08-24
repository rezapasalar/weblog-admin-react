import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import MoreItem from './item'
import { SUCCESSFUL_LOGOUT } from '../../../../constants/responses'
import { getTheme } from '../../../../modules/helperFunctions'
import { ProfileSvg, SettingSvg, LogoutSvg } from '../../../global/svg'

export default function MoreList ({isShow, setIsShow}) {

    const navigation = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem('auth')
        toast.success(SUCCESSFUL_LOGOUT, {...getTheme()})
        navigation('/auth/login')
    }

    const redirect = (to) => {
        setIsShow(false)
        navigation(to)
    }

    return (
        <div className={`${isShow ? 'block' : 'hidden'} origin-top-left absolute left-2 top-5 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300/80 dark:ring-gray-700/70 focus:outline-none animate-slow-200`}>
            <MoreItem position="top" onClick={() => redirect('/admin/profile')}>
                <ProfileSvg className="h-5 w-5" />
                <span>پروفایل</span>
            </MoreItem>

            <MoreItem onClick={() => redirect('/admin/setting')}>
                <SettingSvg className="h-5 w-5"  />
                <span>تنظیمات</span>
            </MoreItem>

            <MoreItem position="bottom" onClick={logoutHandler}>
                <LogoutSvg className="h-5 w-5" />
                <span>خروج</span>
            </MoreItem>
        </div>
    )
}