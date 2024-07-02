# Calendar

-   Displays a monthly calendar.
-   Provides marking functionality.

### Usage

```tsx
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, CalendarProvider } from 'react-native-calendar';

const MARKED_DATES = {
    '2024-01-12': { marked: true },
    '2024-01-15': { marked: true },
    '2024-01-19': { marked: true },
    '2024-01-23': { marked: true },
    '2024-01-29': { marked: true },
    '2024-01-30': { marked: true },
    '2024-01-31': { marked: true },
};

// Monthly calendar page
export default function CalendarPage() {
    const today = useRef(dayjs().format('YYYY-MM-DD'));

    return (
        <View style={styles.wrapper}>
            <CalendarProvider>
                <Calendar date={today.current} minDate="1997-01-01" maxDate="2030-12-01" markedDates={MARKED_DATES} />
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
interface CalendarProps {
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
    markedDates?: MarkedDates;
    /**
     * Show or hide the header
     */
    hideHeader?: boolean;
    /**
     * Get the formatted date according to the string of tokens passed in.
     * To escape characters, wrap them in square brackets (e.g. [MM]).
     * dayjs().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
     * dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
     * dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
     */
    monthFormatTemplate?: string;
    /**
     * Called when a day is pressed
     * @params
     * dateString: date of the pressed day in YYYY-MM-DD format
     * index: index of the day in the current month
     */
    onPressDay?(dateString: string, index: number): void;
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
