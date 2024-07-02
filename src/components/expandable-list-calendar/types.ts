import type { FlashListProps } from '@shopify/flash-list';

import type { HeaderProps } from '../../common';
import type { MarkedDates } from '../../types/calendar';

interface AgendaListActions {
    openCalendar(): void;
    closeCalendar(): void;
}

type TitleData = {
    type: 'TITLE';
    dateString: string;
    label: string;
};

type ContentData<TData> = {
    type: 'CALENDAR_ITEM';
    dateString: string;
} & TData;

interface AgendaListProps<TData>
    extends Omit<FlashListProps<TitleData | ContentData<TData>>, 'viewabilityConfig' | 'onMomentumScrollEnd'> {
    openCalendar(): void;
    closeCalendar(): void;
}

interface ExpandableCalendarProps<TData> extends Pick<HeaderProps, 'locale' | 'onPressLeft' | 'onPressRight' | 'onPressMonth'> {
    calendarProps: {
        date?: string;
        minDate?: string;
        maxDate?: string;
        markedDates?: MarkedDates;
        hideHeader?: boolean;
        dayNames?: string[] | undefined;
        onChangeMonth?(dateString: string): void;
    };
    listProps: Omit<AgendaListProps<TData>, 'openCalendar' | 'closeCalendar'>;
}

interface ExpandableCalendar {
    scrollToDayString(day: string): void;
}

export type { AgendaListActions, AgendaListProps, ContentData, ExpandableCalendar, ExpandableCalendarProps, TitleData };
