import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { LocaleConfig, WeekCalendar, type MarkedDates } from 'react-native-calendar';

type Locale = 'ko' | 'en';

type LocaleMap = {
    [key in Locale]: Partial<ILocale>;
};

const localeMap: LocaleMap = {
    ko: {
        monthsShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
    },
    en: {
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    },
};

const MARKED_DATES: MarkedDates = {
    '2024-07-12': { marked: true },
    '2024-07-15': { marked: true },
    '2024-07-19': { marked: true },
    '2024-07-23': { marked: true },
    '2024-07-29': { marked: true },
    '2024-07-30': { marked: true },
    '2024-07-31': {
        marked: true,
        markingStyle: {
            backgroundColor: '#000000',
        },
        dotStyle: {
            backgroundColor: '#000000',
        },
    },
};

LocaleConfig('ko', localeMap.ko);

export default function App() {
    const today = useRef(dayjs().format('YYYY-MM-DD')).current;
    const [locale, setLocale] = useState<Locale>('ko');

    const handleLocaleToggle = () => {
        if (locale === 'ko') {
            LocaleConfig('en', localeMap.en);
            setLocale('en');
        } else {
            LocaleConfig('ko', localeMap.ko);
            setLocale('ko');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="언어 토글" onPress={handleLocaleToggle} />
            <WeekCalendar locale={locale} date={today} minDate="1997-01-01" maxDate="2030-12-01" markedDates={MARKED_DATES} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
