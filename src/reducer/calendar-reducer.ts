import type { CalendarActions, CalendarState, InitDate } from '../types';
import { dayjs, getMonthWeekInfo } from '../utilities';

export default function calendarReducer(state: CalendarState, actions: CalendarActions): CalendarState {
    switch (actions.type) {
        case 'SET_DATE':
            return setDate(state, actions.date);
        case 'ADD_MONTH':
            return changeMonth(state, 1);
        case 'SUB_MONTH':
            return changeMonth(state, -1);
        case 'INIT_DATE':
            return initDate(state, { date: actions.date, maxDate: actions.maxDate, minDate: actions.minDate });
    }
}

function changeMonth(state: CalendarState, months: number): CalendarState {
    const newSelectedDate = dayjs(state.selectedDate).add(months, 'month').endOf('month');
    const selectedDate =
        months > 0
            ? newSelectedDate.isAfter(state.maxDate)
                ? dayjs(state.maxDate)
                : newSelectedDate
            : newSelectedDate.isBefore(state.minDate)
              ? dayjs(state.minDate).endOf('month')
              : newSelectedDate;
    const selectedDateString = selectedDate.format('YYYY-MM-DD');

    return {
        ...state,
        selectedDate,
        selectedDateString,
        ...getMonthWeekInfo(selectedDate),
    };
}

function setDate(state: CalendarState, date: string): CalendarState {
    const selectedDate = dayjs(date);
    const selectedDateString = selectedDate.format('YYYY-MM-DD');

    return {
        ...state,
        selectedDate,
        selectedDateString,
        ...getMonthWeekInfo(selectedDate),
    };
}

function initDate(state: CalendarState, { date, maxDate, minDate }: Omit<InitDate, 'type'>): CalendarState {
    const selectedDate = dayjs(date);
    const selectedDateString = selectedDate.format('YYYY-MM-DD');

    return {
        ...state,
        selectedDate,
        maxDate,
        minDate,
        selectedDateString,
        ...getMonthWeekInfo(selectedDate),
    };
}
