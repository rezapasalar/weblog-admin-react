import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom'
import { setIsShowSidebar } from '../../../store/slices/global'
import { DashboardSvg, UsersSvg, ArticleSvg, TodoSvg } from '../../global/svg'

export default function Sidebar () {

    const {isShowSidebar} = useSelector(state => state.global)

    const dispatch = useDispatch()

    const sidebarRef = useRef(null)

    useEffect(() => {
        isShowSidebar ? sidebarRef.current.classList.add('!mr-0') : sidebarRef.current.classList.remove('!mr-0')
    }, [isShowSidebar])

    const setClasses = (isActive) => {
        let classes = 'flex items-center w-full space-x-reverse space-x-2 rounded-lg p-2 text-gray-500 dark:text-gray-100 hover:bg-gray-300/40 hover:dark:bg-gray-800 transition-colors duration-300 select-none focus:outline-none'
        classes += isActive && ' !bg-indigo-600 !dark:bg-gray-700 !text-white'
        return classes
    }

    const closeSidebarHandler = () => {
        if (window.matchMedia('only screen and (max-width: 1024px)').matches) dispatch(setIsShowSidebar(false))
    }

    return (
        <aside ref={sidebarRef} className="w-[18rem] h-full fixed top-[60px] -mr-[300px] duration-500 z-[999] bg-gray-200 dark:bg-gray-900 text-white flex flex-column justify-between">
            <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto mt-6">
                <NavLink onClick={closeSidebarHandler} to="/admin/dashboard" className={({isActive}) => setClasses(isActive)}>
                    <DashboardSvg className="h-5 w-5" />
                    <span>داشبورد</span>
                </NavLink>

                <NavLink onClick={closeSidebarHandler} to="/admin/users" className={({isActive}) => setClasses(isActive)}>
                    <UsersSvg className="h-5 w-5" />
                    <span>کاربران</span>
                </NavLink>

                <NavLink onClick={closeSidebarHandler} to="/admin/articles" className={({isActive}) => setClasses(isActive)}>
                    <ArticleSvg className="h-5 w-5" />
                    <span>مقالات</span>
                </NavLink>

                <NavLink onClick={closeSidebarHandler} to="/admin/todos" className={({isActive}) => setClasses(isActive)}>
                    <TodoSvg className="h-5 w-5" />
                    <span>کارها</span>
                </NavLink>
            </div>
        </aside>
    )
}