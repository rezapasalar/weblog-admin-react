import { useSelector, useDispatch } from 'react-redux'
import { setIsShowSidebar } from '../../../store/slices/global'
import HamburgerSvg from '../../global/svg/hamburger'

export default function Hamburger () {

    const {isShowSidebar} = useSelector(state => state.global)

    const dispatch = useDispatch()

    return (
        <div className="flex items-center text-gray-600 dark:text-gray-100">
            <HamburgerSvg onClick={() => dispatch(setIsShowSidebar(!isShowSidebar))} className="w-9 h-9 ml-3 cursor-pointer" />
            <span className="text-xl select-none">پنل مدیریت</span>
        </div>
    )
}