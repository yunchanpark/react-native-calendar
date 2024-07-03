import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import type { DateType, DotStyle, MarkingStyle } from '../types';

export interface DayProps {
    date: DateType;
    markingStyle?: MarkingStyle;
    dotStyle?: DotStyle;
    textColor?: string;
    onPress?(): void;
}

export default function Day({ date, markingStyle, dotStyle, textColor, onPress }: DayProps) {
    return (
        <Animated.View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} style={styles.dayContainer}>
                <View style={[markingStyle, styles.circle, styles.markingBase]}>
                    <Text style={{ color: textColor }}>{date.date}</Text>
                </View>
                <View
                    style={[
                        styles.circle,
                        {
                            backgroundColor: dotStyle?.backgroundColor,
                            width: dotStyle?.width ?? 5,
                            height: dotStyle?.height ?? 5,
                        },
                    ]}
                />
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
