import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Day, Header, dayStyle, dotStyle, markingStyle } from '../../common';
import { useCalendarHandler, useCalendarState } from '../../hooks';
import type { DateType } from '../../types';
import { dayjs, getMonthDaysArray, typedMemo } from '../../utilities';

import type { CalendarProps } from './types';

function Calendar({
    locale,
    date,
    maxDate,
    minDate,
    markedDates,
    hideHeader,
    monthFormatTemplate,
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

            const markedDate = markedDates?.[dayInfo.dayString];
            const isDot = markedDate?.marked;

            return isSameMonth ? (
                <View key={dayInfo.dayString} style={dayStyle.wrapper}>
                    <Day
                        key={dayInfo.dayString}
                        date={dayInfo}
                        markingStyle={isSameDay ? markingStyle : undefined}
                        dotStyle={isDot ? markedDate?.dotStyle ?? dotStyle : undefined}
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
            {!hideHeader && (
                <Header
                    locale={locale}
                    onPressLeft={onPressLeft}
                    onPressRight={onPressRight}
                    monthFormatTemplate={monthFormatTemplate}
                />
            )}
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

export default typedMemo(Calendar);
