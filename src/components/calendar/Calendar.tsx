import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Day, Header, dayStyle, dotStyle, markingStyle, type HeaderProps } from '../../common';
import { useCalendarHandler, useCalendarState } from '../../hooks';
import type { DateType, MarkedDates } from '../../types';
import { getMonthDaysArray } from '../../utilities';

interface CalendarProps extends Pick<HeaderProps, 'onPressLeft' | 'onPressMonth' | 'onPressRight'> {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
    onPressDay?(dateString: string, index: number): void;
    onPressLeft?(): void;
    onPressRight?(): void;
}

function Calendar({
    date,
    dayNames,
    maxDate,
    minDate,
    markedDates,
    hideHeader,
    onPressDay,
    onPressLeft,
    onPressRight,
}: CalendarProps) {
    // variables
    const initData = useMemo(() => ({ date, maxDate, minDate }), [date, maxDate, minDate]);

    // refs
    const prevSelectedDayjs = useRef(dayjs(date));

    // hooks
    const calendarState = useCalendarState();
    const { setDate } = useCalendarHandler(initData);

    // states
    const [monthArray, setMonthArray] = useState(getMonthDaysArray(calendarState.selectedDateString));

    // effects
    useEffect(() => {
        if (!prevSelectedDayjs.current.isSame(calendarState.selectedDateString, 'month')) {
            prevSelectedDayjs.current = dayjs(calendarState.selectedDateString);
            setMonthArray(getMonthDaysArray(calendarState.selectedDateString));
        }
    }, [calendarState.selectedDateString]);

    // render functions
    const renderDay = useCallback(
        (dayInfo: DateType, index: number) => {
            const isSameDay = calendarState.selectedDate.isSame(dayInfo.dayString, 'day');
            const isSameMonth = calendarState.selectedDate.isSame(dayInfo.dayString, 'month');

            const currentDayjs = dayjs(dayInfo.dayString);
            const isDisableMaxDay = calendarState.maxDate ? currentDayjs.isAfter(calendarState.maxDate) : false;
            const isDisableMinDay = calendarState.minDate ? currentDayjs.isBefore(calendarState.minDate) : false;
            const isDisableDay = isDisableMaxDay || isDisableMinDay || !isSameMonth;

            const isDot = markedDates?.[dayInfo.dayString]?.marked;

            return isSameMonth ? (
                <View key={dayInfo.dayString} style={dayStyle.wrapper}>
                    <Day
                        key={dayInfo.dayString}
                        date={dayInfo}
                        markingStyle={isSameDay ? markingStyle : undefined}
                        dotStyle={isDot ? dotStyle : undefined}
                        onPress={
                            !isDisableDay
                                ? () => {
                                      onPressDay?.(dayInfo.dayString, index);
                                      setDate(dayInfo.dayString);
                                  }
                                : undefined
                        }
                    />
                </View>
            ) : (
                <View key={dayInfo.dayString} style={dayStyle.wrapper} />
            );
        },
        [calendarState.selectedDate, calendarState.maxDate, calendarState.minDate, markedDates, onPressDay, setDate],
    );

    return (
        <>
            {!hideHeader && <Header dayNames={dayNames} onPressLeft={onPressLeft} onPressRight={onPressRight} />}
            <View style={styles.wrapper}>{monthArray.map(renderDay)}</View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FFFFFFFF',
    },
});

export default memo(Calendar);
