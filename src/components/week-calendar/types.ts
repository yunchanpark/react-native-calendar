import type { HeaderProps } from '../../common';
import type { MarkedDates } from '../../types';

export interface WeekCalendarProps extends Pick<HeaderProps, 'locale' | 'onPressLeft' | 'onPressRight'> {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    containerStyle?: {
        width: number;
    };
    hideHeader?: boolean;
    dayNames?: string[];
    onChangePage?(index: number): void;
    onPressDay?(dateString: string): void;
}
