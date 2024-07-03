import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useMemo, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ExpandableCalendar, LocaleConfig, type MarkedDates } from 'react-native-calendar';

export type Title = {
    type: 'TITLE';
    label: string;
    dateString: string;
};

export type CalendarItem = {
    type: 'CALENDAR_ITEM';
    dateString: string;
    name: string;
};

export type CalendarFlashListItem = Title | CalendarItem;

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

const CALENDAR_LIST_DATA: CalendarFlashListItem[] = [
    { dateString: '2024-07-12', label: '12일 금요일', type: 'TITLE' },
    { dateString: '2024-07-12', name: 'Cameron Rath', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-12', name: 'Diana Bogan', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-12', name: 'Peggy Bergstrom', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-12', name: 'Mack Lemke', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-15', label: '15일 월요일', type: 'TITLE' },
    { dateString: '2024-07-15', name: 'Sonia Glover', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-15', name: 'Matthew Cassin', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-15', name: 'Rex Beier', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-12', name: 'Angel Waters', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-19', label: '19일 금요일', type: 'TITLE' },
    { dateString: '2024-07-19', name: 'Dr. Traci Boyle', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-23', label: '23일 화요일', type: 'TITLE' },
    { dateString: '2024-07-23', name: 'Mr. Francis Gusikowski', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-23', name: 'Juanita Gusikowski', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-23', name: 'Lisa Stoltenberg', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-23', name: 'Angelo Botsford', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-29', label: '29일 월요일', type: 'TITLE' },
    { dateString: '2024-07-29', name: 'Mark Bernhard', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-29', name: 'Gladys Bechtelar', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-30', name: 'Tabitha Crooks', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-30', label: '30일 화요일', type: 'TITLE' },
    { dateString: '2024-07-30', name: 'Jana Heller', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-31', label: '31일 수요일', type: 'TITLE' },
    { dateString: '2024-07-31', name: 'Shari Dooley', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-31', name: 'Marilyn Kreiger', type: 'CALENDAR_ITEM' },
    { dateString: '2024-07-31', name: 'Myrtle Kreiger', type: 'CALENDAR_ITEM' },
];

LocaleConfig('ko', localeMap.ko);

export default function App() {
    const today = useRef(dayjs().format('YYYY-MM-DD')).current;
    const [locale, setLocale] = useState<Locale>('ko');

    const estimatedItemSize = useMemo(() => (styles.titleWrapper.height + styles.itemWrapper.height) / 2, []);

    const renderItem: ListRenderItem<CalendarFlashListItem> = ({ item }) => {
        switch (item.type) {
            case 'TITLE':
                return (
                    <View style={styles.titleWrapper}>
                        <Text>{item.label}</Text>
                    </View>
                );
            case 'CALENDAR_ITEM':
                return (
                    <View style={styles.itemWrapper}>
                        <View style={styles.image} />
                        <Text>{item.name}</Text>
                    </View>
                );
        }
    };

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
            <ExpandableCalendar
                locale={locale}
                calendarProps={{
                    date: today,
                    minDate: '1997-01-01',
                    maxDate: '2030-12-01',
                    markedDates: MARKED_DATES,
                }}
                listProps={{
                    data: CALENDAR_LIST_DATA,
                    renderItem,
                    contentContainerStyle,
                    estimatedItemSize,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    titleWrapper: {
        height: 30,
        marginTop: 20,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        gap: 20,
    },
    image: {
        borderRadius: 9999,
        width: 40,
        height: 40,
        backgroundColor: '#BDBDBDFF',
    },
});

const contentContainerStyle: ContentStyle = {
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
};
