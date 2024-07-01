import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCalendarHandler, useCalendarState } from '../hooks';

import { headerStyles } from './style';

export interface HeaderProps {
    label?: string;
    dayNames?: string[];
    containerStyle?: ViewStyle;
    monthFormat?(date: Date): string;
    onPressLeft?(): void;
    onPressRight?(): void;
    onPressMonth?(): void;
}

export default function Header({
    dayNames = ['일', '월', '화', '수', '목', '금', '토'],
    containerStyle,
    monthFormat,
    onPressMonth,
    onPressLeft,
    onPressRight,
}: HeaderProps) {
    // hooks
    const { maxDate, minDate, selectedDate } = useCalendarState();
    const { subMonth, addMonth } = useCalendarHandler();

    // conditions
    const isPossibleNextMonth = maxDate ? selectedDate.isBefore(maxDate, 'month') : true;
    const isPossiblePrevMonth = minDate ? selectedDate.isAfter(minDate, 'month') : true;
    const isSameYear = dayjs().year() === selectedDate.year();
    const label = monthFormat
        ? monthFormat(selectedDate.toDate())
        : isSameYear
          ? selectedDate.format('MM월')
          : selectedDate.format('YY년 MM월');

    // functions
    const handlePressPrevMonth = useCallback(() => {
        if (!isPossiblePrevMonth) {
            return;
        }

        if (onPressLeft) {
            onPressLeft();
        } else {
            subMonth();
        }
    }, [isPossiblePrevMonth, onPressLeft, subMonth]);

    const handlePressNextMonth = useCallback(() => {
        if (!isPossibleNextMonth) {
            return;
        }

        if (onPressRight) {
            onPressRight();
        } else {
            addMonth();
        }
    }, [isPossibleNextMonth, onPressRight, addMonth]);

    // styles
    const headerWrapperStyle = useMemo(() => [containerStyle, headerStyles.wrapper], [containerStyle]);

    return (
        <View style={headerWrapperStyle}>
            <View style={headerStyles.iconContainer}>
                <TouchableOpacity onPress={handlePressPrevMonth}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressMonth}>
                    <Text>{label}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressNextMonth}>
                    <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <DayNames dayNames={dayNames} />
        </View>
    );
}

const DayNames = React.memo(({ dayNames }: { dayNames: string[] }) => {
    return (
        <View style={headerStyles.dayNameWrapper}>
            {dayNames.map((dayName) => (
                <View key={dayName} style={headerStyles.dayName}>
                    <Text>{dayName}</Text>
                </View>
            ))}
        </View>
    );
});
