import { StyleSheet } from 'react-native';

import type { DotStyle, MarkingStyle } from '../types';

const markingStyle: MarkingStyle = {
    backgroundColor: '#E0E0E0FF',
};

const dotStyle: DotStyle = {
    width: 5,
    height: 5,
    backgroundColor: '#1E8B68FF',
};

const dayStyle = StyleSheet.create({
    wrapper: {
        width: '14.28%',
        height: 50,
    },
});

const headerStyles = StyleSheet.create({
    wrapper: {
        zIndex: 1,
        backgroundColor: '#FFFFFFFF',
        height: 100,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayNameWrapper: {
        flexDirection: 'row',
    },
    dayName: {
        flex: 1,
        alignItems: 'center',
    },
});

export { dayStyle, dotStyle, headerStyles, markingStyle };
