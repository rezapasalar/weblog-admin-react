import { getCurrentPersianYear } from '../../../modules/helperFunctions'

export default function Footer () {
    return (
        <footer className="container-fluid bg-gray-100 dark:bg-gray-700 px-8 py-4 h-[60px]">
            <div className="container">
                <span className="text-gray-500 dark:text-white space-x-reverse space-x-2">
                    <span>{getCurrentPersianYear()}</span>
                    <span>تمامی حقوق محفوظ است</span>
                </span>
            </div>
        </footer>
    )
}