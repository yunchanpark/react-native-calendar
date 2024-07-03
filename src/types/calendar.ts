import type { Dayjs } from 'dayjs';
import type { DimensionValue } from 'react-native';

type DateType = {
    dayString: string;
    year: number;
    month: number;
    date: number;
};

type DotStyle = {
    height?: DimensionValue;
    width?: DimensionValue;
    backgroundColor?: string;
};

/**
 * calendar core context
 */
type MarkingStyle = {
    height?: DimensionValue;
    width?: DimensionValue;
    backgroundColor?: string;
};

type MarkedDates = {
    [key: string]: {
        marked?: boolean;
        dotStyle?: DotStyle;
        markingStyle?: MarkingStyle;
    };
};

type CalendarState = {
    selectedDate: Dayjs;
    selectedDateString: string;
    minDate: string | undefined;
    maxDate: string | undefined;
    markedDates?: MarkedDates;
    selectedWeekNumber: number;
    weekCountInMonth: number;
};

interface InitDate {
    type: 'INIT_DATE';
    date: string;
    minDate: string | undefined;
    maxDate: string | undefined;
}

interface SetDate {
    type: 'SET_DATE';
    date: string;
}

interface AddMonth {
    type: 'ADD_MONTH';
}

interface SubMonth {
    type: 'SUB_MONTH';
}

type CalendarActions = InitDate | SetDate | AddMonth | SubMonth;

type ScrollToIndex = {
    animated?: boolean | null | undefined;
    index: number;
    viewOffset?: number | undefined;
    viewPosition?: number | undefined;
};

export type {
    AddMonth,
    CalendarActions,
    CalendarState,
    DateType,
    DotStyle,
    InitDate,
    MarkedDates,
    MarkingStyle,
    ScrollToIndex,
    SetDate,
    SubMonth,
};
