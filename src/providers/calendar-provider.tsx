import dayjs, { type Dayjs } from 'dayjs';
import React, { useReducer, type PropsWithChildren } from 'react';

import { CalendarsActionsContext, CalendarsStateContext } from '../contexts';
import { calendarReducer } from '../reducer';
import type { CalendarState } from '../types';
import { getMonthWeekInfo } from '../utilities';

const initializeState = (initDay: Dayjs): CalendarState => ({
    selectedDate: initDay,
    selectedDateString: initDay.format('YYYY-MM-DD'),
    maxDate: undefined,
    minDate: undefined,
    ...getMonthWeekInfo(initDay),
});

export default function CalendarProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(calendarReducer, initializeState(dayjs()));

    return (
        <CalendarsActionsContext.Provider value={dispatch}>
            <CalendarsStateContext.Provider value={state}>{children}</CalendarsStateContext.Provider>
        </CalendarsActionsContext.Provider>
    );
}
