import type { HeaderProps } from '../../common';
import type { MarkedDates } from '../../types';

export interface CalendarProps
    extends Pick<HeaderProps, 'onPressLeft' | 'onPressMonth' | 'onPressRight' | 'monthFormatTemplate' | 'locale'> {
    /**
     * Start date
     * ```
     * dayjs().format('YYYY-MM-DD')
     * '2024-07-12'
     * ```
     */
    date?: string;
    /**
     * Minimum date
     * ```
     * '1997-01-01'
     * ```
     */
    minDate?: string;
    /**
     * Maximum date
     * ```
     * '2030-12-01'
     * ```
     */
    maxDate?: string;
    /**
     * Marked dates
     * ```
     * {
     *     '2024-07-31': {
     *         marked: true,
     *         markingStyle: {
     *             backgroundColor: '#000000',
     *         },
     *         dotStyle: {
     *             backgroundColor: '#000000',
     *         },
     *     },
     * }
     * ```
     */
    markedDates?: MarkedDates;
    /**
     * Hide header
     * ```
     * false or true
     * ```
     */
    hideHeader?: boolean;
    /**
     * Called when a day is pressed
     * ```
     * (dateString: string, index: number) => void
     * ```
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
