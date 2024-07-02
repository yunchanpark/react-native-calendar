import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useWindowDimensions, type LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { dayStyle, headerStyles } from '../../common';
import { useCalendarState } from '../../hooks';
import type { ScrollToIndex } from '../../types';

interface UseExpandableAnimationActions {
    onChangeMonth?(dateString: string): void;
    onScrollToIndexWeekCalendar(scrollProps: ScrollToIndex): void;
}

type UseExpandableAnimationProps = UseExpandableAnimationActions;

export default function useExpandableAnimation({ onScrollToIndexWeekCalendar, onChangeMonth }: UseExpandableAnimationProps) {
    const calendarState = useCalendarState();
    const dimensions = useWindowDimensions();

    // 주간,월간 캘린더와 리스트의 목표 위치 초기화
    const dayHeight = useMemo<number>(() => dayStyle.wrapper.height, []);
    const headerHeight = useMemo<number>(() => headerStyles.wrapper.height, []);
    const calendarHeight = useMemo<number>(
        () => dayHeight * calendarState.weekCountInMonth,
        [calendarState.weekCountInMonth, dayHeight],
    );
    const weekCalendarGoalTranslateY = useMemo<number>(
        () => dayHeight * (calendarState.selectedWeekNumber - 1),
        [calendarState.selectedWeekNumber, dayHeight],
    );
    const calendarGoalTranslateY = useMemo<number>(
        () => -dayHeight * (calendarState.selectedWeekNumber - 1),
        [calendarState.selectedWeekNumber, dayHeight],
    );
    const listMinTranslateY = useMemo<number>(() => headerHeight + dayHeight, [dayHeight, headerHeight]);
    const listGoalTranslateY = useMemo<number>(
        () => headerHeight + dayHeight * calendarState.weekCountInMonth,
        [calendarState.weekCountInMonth, dayHeight, headerHeight],
    );

    // 애니메이션 임시 저장 변수
    const startContext = {
        weekCalendarTranslateY: useSharedValue(dayHeight * (calendarState.selectedWeekNumber - 1)),
        weekPageIndex: useSharedValue(-1),
        calendarTranslateY: useSharedValue(0),
        listTranslateY: useSharedValue(listMinTranslateY),
        listHeight: useSharedValue(0),
        layoutHeight: useSharedValue(dimensions.height),
        changeWeekCalendarGoalTranslateY: useSharedValue(weekCalendarGoalTranslateY),
    };

    // 애니메이션 적용할 변수
    const applyContext = {
        weekCalendarZIndex: useSharedValue(1),
        weekCalendarTranslateY: useSharedValue(0),
        calendarZIndex: useSharedValue(0),
        calendarOpacity: useSharedValue(0),
        calendarTranslateY: useSharedValue(calendarGoalTranslateY),
        listTranslateY: useSharedValue(listMinTranslateY),
        listHeight: useSharedValue(500),
    };

    // 선택할 날 변경될 때마다 주간 캘린더 위치 초기화
    useEffect(() => {
        startContext.weekPageIndex.value = calendarState.selectedWeekNumber - 1;
        startContext.changeWeekCalendarGoalTranslateY.value = weekCalendarGoalTranslateY;
    }, [
        calendarState.selectedDateString,
        calendarState.selectedWeekNumber,
        weekCalendarGoalTranslateY,
        startContext.changeWeekCalendarGoalTranslateY,
        startContext.weekPageIndex.value,
        startContext.weekPageIndex,
    ]);

    // 달이 변했을 때, 위치 초기화
    const lastDate = useRef(calendarState.selectedDateString);
    const isNotSameMonth = !calendarState.selectedDate.isSame(lastDate.current, 'month');
    const isShowWeek = applyContext.weekCalendarZIndex.value === 1;

    useEffect(() => {
        if (isNotSameMonth) {
            onChangeMonth?.(calendarState.selectedDateString);
        }
    }, [calendarState.selectedDateString, isNotSameMonth, onChangeMonth]);

    if (isNotSameMonth) {
        lastDate.current = calendarState.selectedDateString;

        if (isShowWeek) {
            applyContext.calendarTranslateY.value = calendarGoalTranslateY;
            applyContext.listTranslateY.value = listMinTranslateY;
            startContext.weekPageIndex.value = -1;
            applyContext.weekCalendarTranslateY.value = withTiming(0);
            applyContext.listHeight.value = startContext.layoutHeight.value - headerHeight - dayHeight;
        } else {
            applyContext.weekCalendarTranslateY.value = dayHeight * (calendarState.selectedWeekNumber - 1);
            applyContext.listHeight.value = startContext.layoutHeight.value - headerHeight - calendarHeight;
        }

        if (applyContext.listTranslateY.value !== listGoalTranslateY && !isShowWeek) {
            applyContext.listTranslateY.value = listGoalTranslateY;
        }
    }

    // 캘린더 위에 접기 속도
    const initialUpSpeedPercent = useMemo(
        () => (calendarState.selectedWeekNumber - 1) / (calendarState.weekCountInMonth - 1),
        [calendarState.selectedWeekNumber, calendarState.weekCountInMonth],
    );

    const handleScrollToIndex = useCallback(() => {
        onScrollToIndexWeekCalendar({ index: calendarState.selectedWeekNumber - 1, animated: false });
    }, [calendarState.selectedWeekNumber, onScrollToIndexWeekCalendar]);

    // 캘린더 열기 애니메이션
    const openCalendar = useCallback(() => {
        'worklet';
        applyContext.listHeight.value = withTiming(startContext.layoutHeight.value - headerHeight - calendarHeight);
        applyContext.weekCalendarZIndex.value = 0;
        applyContext.calendarZIndex.value = 1;
        applyContext.listTranslateY.value = withTiming(listGoalTranslateY);
        applyContext.calendarTranslateY.value = withTiming(0);
        applyContext.weekCalendarTranslateY.value = withTiming(weekCalendarGoalTranslateY);
        startContext.changeWeekCalendarGoalTranslateY.value = weekCalendarGoalTranslateY;
        startContext.weekPageIndex.value = -1;
        applyContext.calendarOpacity.value = 1;
        runOnJS(handleScrollToIndex)();
    }, [
        applyContext.listHeight,
        applyContext.weekCalendarZIndex,
        applyContext.calendarZIndex,
        applyContext.listTranslateY,
        applyContext.calendarTranslateY,
        applyContext.weekCalendarTranslateY,
        applyContext.calendarOpacity,
        startContext.layoutHeight.value,
        startContext.changeWeekCalendarGoalTranslateY,
        startContext.weekPageIndex,
        headerHeight,
        calendarHeight,
        listGoalTranslateY,
        weekCalendarGoalTranslateY,
        handleScrollToIndex,
    ]);

    // 캘린더 닫기 애니메이션
    const closeCalendar = useCallback(() => {
        'worklet';
        applyContext.listHeight.value = withTiming(startContext.layoutHeight.value - headerHeight - dayHeight);
        applyContext.listTranslateY.value = withTiming(listMinTranslateY, {}, (isFinished) => {
            if (isFinished) {
                applyContext.calendarOpacity.value = 0;
                applyContext.weekCalendarZIndex.value = 1;
                applyContext.calendarZIndex.value = 0;
            }
        });
        applyContext.calendarTranslateY.value = withTiming(
            startContext.weekPageIndex.value === -1 ? calendarGoalTranslateY : -dayHeight * startContext.weekPageIndex.value,
        );
        applyContext.weekCalendarTranslateY.value = withTiming(0);
    }, [
        applyContext.calendarOpacity,
        applyContext.calendarTranslateY,
        applyContext.calendarZIndex,
        applyContext.listHeight,
        applyContext.listTranslateY,
        applyContext.weekCalendarTranslateY,
        applyContext.weekCalendarZIndex,
        calendarGoalTranslateY,
        dayHeight,
        headerHeight,
        listMinTranslateY,
        startContext.layoutHeight.value,
        startContext.weekPageIndex.value,
    ]);

    // 캘린더 제스쳐
    const calendarGesture = Gesture.Pan()
        .onStart(() => {
            startContext.listHeight.value = applyContext.listHeight.value;
            startContext.calendarTranslateY.value = applyContext.calendarTranslateY.value;
            startContext.listTranslateY.value = applyContext.listTranslateY.value;
            startContext.weekCalendarTranslateY.value = applyContext.weekCalendarTranslateY.value;
        })
        .onChange((event) => {
            const isDownSwipe = event.velocityY > 0;
            const upSpeedPercent =
                startContext.weekPageIndex.value === -1
                    ? initialUpSpeedPercent
                    : startContext.weekPageIndex.value / (calendarState.weekCountInMonth - 1);
            if (isDownSwipe) {
                applyContext.weekCalendarTranslateY.value = Math.max(
                    Math.min(
                        startContext.weekCalendarTranslateY.value + event.translationY * upSpeedPercent,
                        startContext.changeWeekCalendarGoalTranslateY.value,
                    ),
                    0,
                );
                applyContext.calendarTranslateY.value = Math.max(
                    Math.min(startContext.calendarTranslateY.value + event.translationY * upSpeedPercent, 0),
                    startContext.weekPageIndex.value === -1
                        ? calendarGoalTranslateY
                        : -dayHeight * startContext.weekPageIndex.value,
                );
                applyContext.listTranslateY.value = Math.min(
                    Math.max(startContext.listTranslateY.value + event.translationY, listMinTranslateY),
                    listGoalTranslateY,
                );

                applyContext.listHeight.value = Math.min(
                    Math.max(
                        startContext.listHeight.value - event.translationY,
                        startContext.layoutHeight.value - headerHeight - calendarHeight,
                    ),
                    startContext.layoutHeight.value - headerHeight - dayHeight,
                );
                applyContext.calendarOpacity.value =
                    (applyContext.listTranslateY.value - headerHeight - dayHeight) / (listGoalTranslateY - listMinTranslateY);
            } else {
                applyContext.weekCalendarTranslateY.value = Math.min(
                    Math.max(startContext.weekCalendarTranslateY.value + event.translationY * upSpeedPercent, 0),
                    startContext.changeWeekCalendarGoalTranslateY.value,
                );
                applyContext.calendarTranslateY.value = Math.min(
                    Math.max(
                        startContext.calendarTranslateY.value + event.translationY * upSpeedPercent,
                        startContext.weekPageIndex.value === -1
                            ? calendarGoalTranslateY
                            : -dayHeight * startContext.weekPageIndex.value,
                    ),
                    0,
                );
                applyContext.listTranslateY.value = Math.max(
                    Math.min(startContext.listTranslateY.value + event.translationY, listGoalTranslateY),
                    listMinTranslateY,
                );

                applyContext.listHeight.value = Math.max(
                    Math.min(
                        startContext.listHeight.value - event.translationY,
                        startContext.layoutHeight.value - headerHeight - dayHeight,
                    ),
                    startContext.layoutHeight.value - headerHeight - calendarHeight,
                );
            }

            applyContext.calendarOpacity.value =
                1 -
                -(applyContext.listTranslateY.value - headerHeight - calendarHeight) / (listGoalTranslateY - listMinTranslateY);
        })
        .onEnd((event) => {
            const isDownSwipe = event.velocityY > 0;
            if (isDownSwipe) {
                openCalendar();
            } else {
                closeCalendar();
            }
        });

    const handleDayPress = useCallback(
        (_dateString: string, index: number) => {
            const weekPageIndex = Math.floor(index / 7);
            startContext.weekPageIndex.value = weekPageIndex;
            startContext.changeWeekCalendarGoalTranslateY.value = dayHeight * weekPageIndex;

            if (applyContext.weekCalendarZIndex.value === 1) {
                applyContext.calendarTranslateY.value = -dayHeight * weekPageIndex;
            } else {
                applyContext.weekCalendarTranslateY.value = dayHeight * weekPageIndex;
            }
        },
        [
            applyContext.calendarTranslateY,
            applyContext.weekCalendarTranslateY,
            applyContext.weekCalendarZIndex.value,
            dayHeight,
            startContext.changeWeekCalendarGoalTranslateY,
            startContext.weekPageIndex,
        ],
    );

    // 주간 캘린더 스크롤 변경될 때마다, 월간 캘린더 위치 변경
    const handleChangeCalendarTranslateY = useCallback(
        (index: number) => {
            startContext.weekPageIndex.value = index;
            startContext.changeWeekCalendarGoalTranslateY.value = dayHeight * index;

            if (applyContext.weekCalendarZIndex.value === 1) {
                applyContext.calendarTranslateY.value = -dayHeight * index;
            }
        },
        [
            applyContext.calendarTranslateY,
            applyContext.weekCalendarZIndex.value,
            dayHeight,
            startContext.changeWeekCalendarGoalTranslateY,
            startContext.weekPageIndex,
        ],
    );

    // 초기 뷰 높이 구하기
    const handleGetLayoutHeight = useCallback(
        (event: LayoutChangeEvent) => {
            const height = event.nativeEvent.layout.height;
            startContext.layoutHeight.value = height;
            applyContext.listHeight.value = height - headerHeight - dayHeight;
        },
        [applyContext.listHeight, dayHeight, headerHeight, startContext.layoutHeight],
    );

    // 캘린더 애니메이션 스타일
    const calendarAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: applyContext.calendarOpacity.value,
            zIndex: applyContext.calendarZIndex.value,
            transform: [{ translateY: applyContext.calendarTranslateY.value }],
        }),
        [applyContext.calendarOpacity.value, applyContext.calendarZIndex.value, applyContext.calendarTranslateY.value],
    );

    // 주간 캘린더 애니메이션 스타일
    const weekAnimatedStyle = useAnimatedStyle(
        () => ({
            zIndex: applyContext.weekCalendarZIndex.value,
            transform: [{ translateY: applyContext.weekCalendarTranslateY.value }],
        }),
        [applyContext.weekCalendarZIndex.value, applyContext.weekCalendarTranslateY.value],
    );

    // 리스트 애니메이션 스타일
    const listAnimatedStyle = useAnimatedStyle(() => ({
        height: applyContext.listHeight.value,
        zIndex: 2,
        transform: [{ translateY: applyContext.listTranslateY.value }],
    }));

    return {
        calendarHeight,
        calendarGesture,
        calendarAnimatedStyle,
        weekAnimatedStyle,
        listAnimatedStyle,
        handleDayPress,
        openCalendar,
        closeCalendar,
        handleGetLayoutHeight,
        handleChangeCalendarTranslateY,
    };
}
