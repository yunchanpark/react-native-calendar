import type { Dayjs } from 'dayjs';

import type { DateType } from '../types';

import dayjs from './dayjs-config';

const WEEK_DAYS = 7;

export function getMonthDaysArray(date: string) {
    const currentDate = dayjs(date);
    const startOfMonth = currentDate.startOf('month');
    const startDayOfWeek = startOfMonth.day();
    const daysInMonth = currentDate.daysInMonth();
    const remainingDays =
        (startDayOfWeek + daysInMonth) % WEEK_DAYS !== 0 ? WEEK_DAYS - ((startDayOfWeek + daysInMonth) % WEEK_DAYS) : 0;
    const totalDays = startDayOfWeek + daysInMonth + remainingDays;

    const monthDaysArray = [];
    const startDate = startOfMonth.subtract(startDayOfWeek, 'day');
    for (let i = 0; i < totalDays; i++) {
        monthDaysArray.push(_formatDate(startDate.add(i, 'day')));
    }

    return monthDaysArray;
}

export function getMonthWeeksArray(date: string) {
    const monthDaysArray = getMonthDaysArray(date);

    const monthWeeksArray = [];
    for (let i = 0; i < monthDaysArray.length; i += WEEK_DAYS) {
        monthWeeksArray.push(monthDaysArray.slice(i, i + WEEK_DAYS));
    }

    return monthWeeksArray;
}

export function getMonthWeekInfo(currentDate: Dayjs) {
    return {
        weekCountInMonth: _getWeekCountInMonth(currentDate),
        selectedWeekNumber: _getWeekNumber(currentDate),
    };
}

function _formatDate(day: Dayjs): DateType {
    return {
        dayString: day.format('YYYY-MM-DD'),
        year: day.year(),
        month: day.month() + 1,
        date: day.date(),
    };
}

function _getWeekCountInMonth(date: Dayjs) {
    return _getWeekNumber(date.endOf('month'));
}

function _getWeekNumber(date: Dayjs) {
    const currentDate = date.date();
    const startOfMonth = date.startOf('month');
    const startDayOfWeek = startOfMonth.day();
    const weekNumber = Math.floor((startDayOfWeek - 1 + currentDate) / 7) + 1;

    return weekNumber;
}
