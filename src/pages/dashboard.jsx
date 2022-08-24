import { useEffect } from 'react'
import { UsersSvg, ArticleSvg, TodoSvg } from '../components/global/svg'

export default function DashboardPage () {

    useEffect(() => {
        document.title = 'داشبورد'
    }, [])
    
    return (
        <div className="animate-slow-1000">
            <h4 className="text-gray-500 dark:text-gray-100 text-2xl font-semibold mb-4">داشبورد</h4>

            <div className="grid md:grid-cols-4 gap-6">
                <div className="flex justify-between items-center text-gray-400 bg-gray-100 dark:bg-gray-900 border dark:border-0 border-gray-200 px-3 py-5 rounded-lg">
                    <div>
                        <div className="text-lg font-semibold mb-2">کاربران</div>
                        <div className="text-gray-500 dark:text-gray-200 text-center text-2xl font-bold">{Number(1255).toLocaleString('fa-IR')}</div>
                    </div>
                    
                    <UsersSvg className="h-7 w-7" />
                </div>

                <div className="flex justify-between items-center text-gray-400 bg-gray-100 dark:bg-gray-900 border dark:border-0 border-gray-200 px-3 py-5 rounded-lg">
                    <div>
                        <div className="text-lg font-semibold mb-2">مقالات</div>
                        <div className="text-gray-500 dark:text-gray-200 text-center text-2xl font-bold">{Number(3781).toLocaleString('fa-IR')}</div>
                    </div>
                    
                    <ArticleSvg className="h-7 w-7" />
                </div>

                <div className="flex justify-between items-center text-gray-400 bg-gray-100 dark:bg-gray-900 border dark:border-0 border-gray-200 px-3 py-5 rounded-lg">
                    <div>
                        <div className="text-lg font-semibold mb-2">کارها</div>
                        <div className="text-gray-500 dark:text-gray-200 text-center text-2xl font-bold">{Number(1202).toLocaleString('fa-IR')}</div>
                    </div>
                    
                    <TodoSvg className="h-7 w-7" />
                </div>
            </div>
        </div>
    )
}