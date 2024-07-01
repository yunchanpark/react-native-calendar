# WeekCalendar

-   Displays a weekly calendar.
-   Provides marking functionality.

### Usage

```tsx
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WeekCalendar, CalendarProvider } from 'react-native-calendar';

const MARKED_DATES = {
    '2024-01-12': { marked: true },
    '2024-01-15': { marked: true },
    '2024-01-19': { marked: true },
    '2024-01-23': { marked: true },
    '2024-01-29': { marked: true },
    '2024-01-30': { marked: true },
    '2024-01-31': { marked: true },
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
     * Array of day names
     * @example [일, 월, 화, 수, 목, 금, 토]
     */
    dayNames?: string[];
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
