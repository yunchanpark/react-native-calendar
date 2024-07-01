import { useContext } from 'react';

import { CalendarsStateContext } from '../contexts';

export default function useCalendarState() {
    const state = useContext(CalendarsStateContext);

    if (state === null) {
        throw new Error('Calendar Provider를 감싸주세요.');
    }

    return state;
}
