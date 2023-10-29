import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/ru'

dayjs.extend(weekday)
dayjs.extend(isLeapYear)
dayjs.locale('ru')

export default dayjs
