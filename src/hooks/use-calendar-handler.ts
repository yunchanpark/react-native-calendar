import { useCallback, useContext, useEffect, useMemo } from 'react';

import { CalendarsActionsContext } from '../contexts';

type UseCalendarHandlerProps = {
    date?: string;
    minDate?: string;
    maxDate?: string;
};

export default function useCalendarHandler(props?: UseCalendarHandlerProps) {
    const dispatch = useContext(CalendarsActionsContext);

    if (dispatch === null) {
        throw new Error('Calendar Provider를 감싸주세요');
    }

    useEffect(() => {
        if (props?.date) {
            dispatch({ type: 'INIT_DATE', date: props.date, maxDate: props.maxDate, minDate: props.minDate });
        }
    }, [dispatch, props?.date, props?.maxDate, props?.minDate]);

    const addMonth = useCallback(() => {
        dispatch({ type: 'ADD_MONTH' });
    }, [dispatch]);

    const subMonth = useCallback(() => {
        dispatch({ type: 'SUB_MONTH' });
    }, [dispatch]);

    /**
     * @param date: formate 'YYYY-MM-DD'
     */
    const setDate = useCallback(
        (date: string) => {
            dispatch({ type: 'SET_DATE', date });
        },
        [dispatch],
    );

    return useMemo(
        () => ({
            addMonth,
            subMonth,
            setDate,
        }),
        [addMonth, subMonth, setDate],
    );
}
