import React, { useCallback, useMemo } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCalendarHandler, useCalendarState } from '../hooks';
import { dayjs } from '../utilities';

import { headerStyles } from './style';

export interface HeaderProps {
    locale: string | undefined;
    label?: string;
    containerStyle?: ViewStyle;
    monthFormatTemplate?: string;
    onPressLeft?(): void;
    onPressRight?(): void;
    onPressMonth?(): void;
}

export default function Header({
    locale = 'en',
    containerStyle,
    monthFormatTemplate,
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
    const label = monthFormatTemplate
        ? selectedDate.locale(locale).format(monthFormatTemplate)
        : selectedDate.locale(locale).format('MMMM YYYY');

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
            <View style={headerStyles.dayNameWrapper}>
                {dayjs()
                    .localeData()
                    .weekdaysShort()
                    .map((dayName) => (
                        <View key={dayName} style={headerStyles.dayName}>
                            <Text>{dayName}</Text>
                        </View>
                    ))}
            </View>
        </View>
    );
}
