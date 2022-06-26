import { useEffect, useState } from 'react'
import GroupForm from './group'
import ColumnGridWrap from '../wraps/columnGrid'
import SelectElement from '../elements/select'
import { getCurrentPersianYear } from '../../../modules/helperFunctions'

export default function DateBirth ({label = '', value, inputHandler, error = ''}) {

    const days = [], months = [], years = []

    const [data, setData] = useState({days: [], months: [], years: []})

    useEffect(() => {
        [...Array(31).keys()].forEach(item => days.push({value: item + 1, label: item + 1}));
        ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'].forEach(item => months.push({value: item, label: item}));
        [...Array(Number(getCurrentPersianYear('en')) - 1300 + 1).keys()].reverse().forEach(item => years.push({value: 1300 + item, label: 1300 + item}));

        setData({days, months, years})
    }, [])

    return (
        <GroupForm label={label} error={error ? 'فرمت تاریخ معتبر نیست' : ''}>
            <ColumnGridWrap responsive="off" cols="3" gap="3" className="z-50">
                <SelectElement value={value.day} options={data?.days} type="number" onChange={({target: {value}}) => inputHandler('day', value, 'number')} placeholder="روز" />
                <SelectElement value={value.month} options={data?.months} onChange={({target: {value}}) => inputHandler('month', value)} placeholder="ماه" />
                <SelectElement value={value.year} options={data?.years} type="number" onChange={({target: {value}}) => inputHandler('year', value, 'number')} placeholder="سال" />
            </ColumnGridWrap>
        </GroupForm>
    )
}