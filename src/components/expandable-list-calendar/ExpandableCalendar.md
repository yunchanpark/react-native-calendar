# ExpandableCalendar

-   You can expand and collapse the calendar with natural gestures and animations.

## Usage

```tsx
import { ExpandableCalendar, LocaleConfig, type MarkedDates } from '@crawl-lab/';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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

const MARKED_DATES = {
    '2024-01-12': { marked: true },
    '2024-01-15': { marked: true },
    '2024-01-19': { marked: true },
    '2024-01-23': { marked: true },
    '2024-01-29': { marked: true },
    '2024-01-30': { marked: true },
    '2024-01-31': { marked: true },
};

const CALENDAR_LIST_DATA = [
    { dateString: '2024-01-29', label: '29일 Mon요일', type: 'TITLE' },
    { dateString: '2024-01-29', name: 'Mark Bernhard', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-29', name: 'Gladys Bechtelar', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-30', label: '30일 Tue요일', type: 'TITLE' },
    { dateString: '2024-01-30', name: 'Jana Heller', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-30', name: 'Tabitha Crooks', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', label: '12일 Fri요일', type: 'TITLE' },
    { dateString: '2024-01-12', name: 'Cameron Rath', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Diana Bogan', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Peggy Bergstrom', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Angel Waters', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Mack Lemke', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-15', label: '15일 Mon요일', type: 'TITLE' },
    { dateString: '2024-01-15', name: 'Sonia Glover', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-15', name: 'Matthew Cassin', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-15', name: 'Rex Beier', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', label: '23일 Tue요일', type: 'TITLE' },
    { dateString: '2024-01-23', name: 'Mr. Francis Gusikowski', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', name: 'Juanita Gusikowski', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', name: 'Lisa Stoltenberg', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', name: 'Angelo Botsford', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-19', label: '19일 Fri요일', type: 'TITLE' },
    { dateString: '2024-01-19', name: 'Dr. Traci Boyle', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-31', label: '31일 Wed요일', type: 'TITLE' },
    { dateString: '2024-01-31', name: 'Shari Dooley', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-31', name: 'Marilyn Kreiger', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-31', name: 'Myrtle Kreiger', type: 'CALENDAR_ITEM' },
];

export default function ExpandableCalendarPage() {
    const today = dayjs().format('YYYY-MM-DD');
    const estimatedItemSize = useMemo(() => (styles.titleWrapper.height + styles.itemWrapper.height) / 2, []);

    const renderItem: ListRenderItem<CalendarFlashListItem> = ({ item }) => {
        switch (item.type) {
            case 'TITLE':
                return (
                    <View style={styles.titleWrapper}>
                        <Typo>{item.label}</Typo>
                    </View>
                );
            case 'CALENDAR_ITEM':
                return (
                    <View style={styles.itemWrapper}>
                        <View style={styles.image} />
                        <Typo>{item.name}</Typo>
                    </View>
                );
        }
    };

    return (
        <View style={styles.wrapper}>
            <CalendarProvider>
                <ExpandableCalendar
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
            </CalendarProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
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
        backgroundColor: color.Gray[400].toString(),
    },
});

const contentContainerStyle: ContentStyle = {
    paddingHorizontal: 20,
    backgroundColor: color.White.toString(),
};
```

## Props

```ts
type ExpandableCalendarState = {
    /**
     * Start date
     */
    date?: string;
    /**
     * Minimum date
     */
    minDate?: string;
    /**
     * Maximum date
     */
    maxDate?: string;
    /**
     * Dates to be marked on the calendar, keyed by date
     * marked: indicates if the date is marked
     * dotStyle: style of the dot to be displayed
     * markingStyle: style of the marked view
     */
    markedDates?: {
        [key: string]: {
            marked?: boolean;
            dotStyle?: {
                height?: DimensionValue;
                width?: DimensionValue;
                backgroundColor?: string;
            };
            markingStyle?: {
                height?: DimensionValue;
                width?: DimensionValue;
                backgroundColor?: string;
            };
        };
    };
    /**
     * Show or hide the header
     */
    hideHeader?: boolean;
};

interface ExpandableCalendarActions {
    /**
     * Event triggered when the month changes
     */
    onChangeMonth?(dateString: string): void;
    /**
     * Function executed when changing the month
     */
    onPressMonth?(): void;
}

type ExpandableCalendarProps<TData> = {
    calendarProps: ExpandableCalendarState & ExpandableCalendarActions;
    listProps: Omit<FlashListProps<TitleData | ContentData<TData>>, 'viewabilityConfig' | 'onMomentumScrollEnd'>;
};
```
