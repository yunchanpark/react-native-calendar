# WeekCalendar

-   Displays a weekly calendar.
-   Provides marking functionality.

### Usage

```tsx
import { LocaleConfig, WeekCalendar, type MarkedDates } from '@crawl-lab/react-native-calendar';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const MARKED_DATES = {
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

// Weekly calendar page
export default function WeekCalendarPage() {
    const today = useRef(dayjs().format('YYYY-MM-DD'));

    return (
        <View style={styles.wrapper}>
            <CalendarProvider>
                <WeekCalendar date={today} minDate="1997-01-01" maxDate="2030-12-01" markedDates={MARKED_DATES} />
            </CalendarProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
```

## Props

```ts
interface WeekCalendarProps {
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
     * Style for the calendar container
     */
    containerStyle?: {
        width: number;
    };
    /**
     * Show or hide the header
     */
    hideHeader?: boolean;
    /**
     * Called when a day is pressed
     * @params dateString: date of the pressed day in YYYY-MM-DD format
     */
    onPressDay?(dateString: string): void;
    /**
     * Event triggered when the currently viewed week changes
     * @params index: index of the current week in the current month
     */
    onChangePage?(index: number): void;
    /**
     * Called when the previous month button in the header is pressed
     */
    onPressLeft?(): void;
    /**
     * Called when the next month button in the header is pressed
     */
    onPressRight?(): void;
}
```
