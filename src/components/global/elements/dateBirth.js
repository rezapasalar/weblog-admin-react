import {  useEffect, useState  } from 'react'
import LabelElement from './label'
import SelectElement from './select'
import {  getCurrentPersianYear  } from '../../../modules/helperFunctions'

const DataBirthElement = ({value, label, selected = null, errors, inputHandler}) => {
    const days = [], months = [], years = []

    const [data, setData] = useState({days: [], months: [], years: []})

    useEffect(() => {
        [...Array(31).keys()].forEach(item => days.push({value: item + 1, label: item + 1}));
        ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'].forEach(item => months.push({value: item, label: item}));
        [...Array(Number(getCurrentPersianYear('en')) - 1300 + 1).keys()].reverse().forEach(item => years.push({value: 1300 + item, label: 1300 + item}));

        setData({days, months, years})
    }, [])

    return (
        <div className="mb-5">
            <LabelElement text={label} />

            <div className="grid grid-cols-3 gap-3">
                <SelectElement keyname="day" type="number" value={value.day} options={data.days} selected={selected?.day} inputHandler={inputHandler} placeholder="روز" />
                <SelectElement keyname="month" value={value.month} options={data.months} selected={selected?.month} inputHandler={inputHandler} placeholder="ماه" />
                <SelectElement keyname="year" type="number" value={value.year} options={data.years} selected={selected?.year} inputHandler={inputHandler} placeholder="سال" />
            </div>
            
            <small className="text-red-500">{'day' in errors || 'month' in errors || 'year' in errors ? 'فرمت تاریخ نامعتبر است' : ''}</small>
        </div>
    )
}

export default DataBirthElement