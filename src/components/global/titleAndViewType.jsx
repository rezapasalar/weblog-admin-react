import { GridViewSvg, DataSetSvg } from './svg'

export default function TitleAndViewType ({title, viewType, changeViewType}) {
    return (
        <div className="flex items-center">
            <h4 className="text-2xl font-semibold text-gray-500 dark:text-gray-100 ml-3 select-none">{title}</h4>
            <GridViewSvg onClick={() => changeViewType(true)} viewType={viewType} className="h-7 w-7 ml-1" />
            <DataSetSvg onClick={() => changeViewType(false)} viewType={viewType} className="h-7 w-7" />
        </div>
    )
}