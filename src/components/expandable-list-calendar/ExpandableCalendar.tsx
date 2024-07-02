import type { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { Header } from '../../common';
import type { DateType, ScrollToIndex } from '../../types/calendar';
import { Calendar, type CalendarProps } from '../calendar';
import { WeekCalendar, type WeekCalendarProps } from '../week-calendar';

import AgendaList from './AgendaList';
import type { AgendaListProps, ExpandableCalendarProps } from './types';
import useExpandableAnimation from './use-expandable-animation';

export default function ExpandableCalendar<TData>({
    calendarProps: { onChangeMonth, ...calendarRest },
    listProps,
    locale,
    onPressLeft,
    onPressMonth,
    onPressRight,
}: ExpandableCalendarProps<TData>) {
    // refs
    const weekCalendarRef = useRef<FlashList<DateType[]>>(null);

    // functions
    const handleScrollToIndexWeekCalendar = useCallback((scrollProps: ScrollToIndex) => {
        weekCalendarRef.current?.scrollToIndex(scrollProps);
    }, []);

    // hooks
    const {
        calendarGesture,
        calendarHeight,
        calendarAnimatedStyle,
        listAnimatedStyle,
        weekAnimatedStyle,
        openCalendar,
        closeCalendar,
        handleGetLayoutHeight,
        handleChangeCalendarTranslateY,
        handleDayPress,
    } = useExpandableAnimation(
        useMemo(
            () => ({
                onChangeMonth: onChangeMonth,
                onScrollToIndexWeekCalendar: handleScrollToIndexWeekCalendar,
            }),
            [onChangeMonth, handleScrollToIndexWeekCalendar],
        ),
    );

    // styles
    const weekCalendarWrapperStyle = useMemo(() => [styles.weekWrapper, weekAnimatedStyle], [weekAnimatedStyle]);
    const calendarHeightStyle = useMemo(() => [{ height: calendarHeight }, styles.wrapper], [calendarHeight]);
    const calendarWrapperStyle = useMemo(() => [styles.calendarWrapper, calendarAnimatedStyle], [calendarAnimatedStyle]);
    const listWrapperStyle = useMemo(() => [styles.listWrapper, listAnimatedStyle], [listAnimatedStyle]);

    // props
    const calendarComponentProps = useMemo<CalendarProps>(
        () => ({
            locale,
            date: calendarRest.date,
            minDate: calendarRest.minDate,
            maxDate: calendarRest.maxDate,
            markedDates: calendarRest.markedDates,
            hideHeader: true,
            onPressDay: handleDayPress,
        }),
        [locale, calendarRest.date, calendarRest.markedDates, calendarRest.maxDate, calendarRest.minDate, handleDayPress],
    );

    const weekCalendarProps = useMemo<WeekCalendarProps>(
        () => ({
            locale,
            markedDates: calendarRest?.markedDates,
            hideHeader: true,
            onChangePage: handleChangeCalendarTranslateY,
        }),
        [locale, calendarRest?.markedDates, handleChangeCalendarTranslateY],
    );

    const listComponentProps = useMemo<AgendaListProps<TData>>(
        () => ({
            ...listProps,
            openCalendar: openCalendar,
            closeCalendar: closeCalendar,
        }),
        [listProps, openCalendar, closeCalendar],
    );

    return (
        <View style={styles.wrapper} onLayout={handleGetLayoutHeight}>
            <Header locale={locale} onPressMonth={onPressMonth} onPressLeft={onPressLeft} onPressRight={onPressRight} />
            <GestureDetector gesture={calendarGesture}>
                <View style={calendarHeightStyle}>
                    <Animated.View style={calendarWrapperStyle}>
                        <Calendar {...calendarComponentProps} />
                    </Animated.View>
                    <Animated.View style={weekCalendarWrapperStyle}>
                        <WeekCalendar ref={weekCalendarRef} {...weekCalendarProps} />
                    </Animated.View>
                </View>
            </GestureDetector>
            <Animated.View style={listWrapperStyle}>
                <AgendaList<TData> {...listComponentProps} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
    },
    listWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    weekWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 30,
    },
    calendarWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});
