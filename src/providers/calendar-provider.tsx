import type { Dayjs } from 'dayjs';
import React, { useReducer, type PropsWithChildren } from 'react';

import { CalendarsActionsContext, CalendarsStateContext } from '../contexts';
import { calendarReducer } from '../reducer';
import type { CalendarState } from '../types';
import { dayjs, getMonthWeekInfo } from '../utilities';

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

export function withCalendarProvider<Props extends {} = {}>(Component: React.ComponentType<Props>) {
    return (props: Props) => (
        <CalendarProvider>
            <Component {...props} />
        </CalendarProvider>
    );
}

export function withCalendarProviderForwardRef<Ref = unknown, Props extends {} = {}>(
    Component: React.ComponentType<Props>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<Ref>> {
    return React.forwardRef((props: Props, ref) => (
        <CalendarProvider>
            <Component {...props} ref={ref} />
        </CalendarProvider>
    ));
}
