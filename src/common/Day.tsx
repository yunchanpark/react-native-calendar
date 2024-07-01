import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import type { DateType, DotStyle, MarkingStyle } from '../types';

export interface DayProps {
    date: DateType;
    markingStyle?: MarkingStyle;
    dotStyle?: DotStyle;
    onPress?(): void;
}

export default function Day({ date, markingStyle, dotStyle, onPress }: DayProps) {
    return (
        <Animated.View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} style={styles.dayContainer}>
                <View style={[markingStyle, styles.circle, styles.markingBase]}>
                    <Text>{date.date}</Text>
                </View>
                <View style={[styles.circle, dotStyle]} />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 50,
        maxHeight: 50,
    },
    circle: {
        borderRadius: 9999,
    },
    markingBase: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        gap: 5,
    },
});
