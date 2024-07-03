import type { CalendarActions, CalendarState } from '../types';
import { dayjs, getMonthWeekInfo } from '../utilities';

import calendarReducer from './calendar-reducer';

describe('calendarReducer', () => {
    const initialState: CalendarState = {
        selectedDate: dayjs('2024-02-01'),
        selectedDateString: '2024-02-01',
        maxDate: '2024-12-31',
        minDate: '2024-01-01',
        weekCountInMonth: 4,
        selectedWeekNumber: 1,
    };

    test('should handle SET_DATE action', () => {
        const action: CalendarActions = {
            type: 'SET_DATE',
            date: '2024-03-15',
        };

        const newState = calendarReducer(initialState, action);

        expect(newState.selectedDateString).toBe('2024-03-15');
        expect(newState.selectedWeekNumber).toBe(getMonthWeekInfo(dayjs('2024-03-15')).selectedWeekNumber);
        expect(newState.weekCountInMonth).toBe(getMonthWeekInfo(dayjs('2024-03-15')).weekCountInMonth);
    });

    test('should handle ADD_MONTH action', () => {
        const action: CalendarActions = {
            type: 'ADD_MONTH',
        };

        const newState = calendarReducer(initialState, action);

        expect(newState.selectedDateString).toBe('2024-03-31');
        expect(newState.selectedWeekNumber).toBe(getMonthWeekInfo(dayjs('2024-03-31')).selectedWeekNumber);
        expect(newState.weekCountInMonth).toBe(getMonthWeekInfo(dayjs('2024-03-31')).weekCountInMonth);
    });

    test('should handle SUB_MONTH action', () => {
        const action: CalendarActions = {
            type: 'SUB_MONTH',
        };

        const newState = calendarReducer(initialState, action);

        expect(newState.selectedDateString).toBe('2024-01-31');
        expect(newState.selectedWeekNumber).toBe(getMonthWeekInfo(dayjs('2024-01-31')).selectedWeekNumber);
        expect(newState.weekCountInMonth).toBe(getMonthWeekInfo(dayjs('2024-01-31')).weekCountInMonth);
    });

    test('should handle INIT_DATE action', () => {
        const action: CalendarActions = {
            type: 'INIT_DATE',
            date: '2024-06-15',
            maxDate: '2024-12-31',
            minDate: '2024-01-01',
        };

        const newState = calendarReducer(initialState, action);

        expect(newState.selectedDateString).toBe('2024-06-15');
        expect(newState.selectedWeekNumber).toBe(getMonthWeekInfo(dayjs('2024-06-15')).selectedWeekNumber);
        expect(newState.weekCountInMonth).toBe(getMonthWeekInfo(dayjs('2024-06-15')).weekCountInMonth);
        expect(newState.maxDate).toBe('2024-12-31');
        expect(newState.minDate).toBe('2024-01-01');
    });
});
