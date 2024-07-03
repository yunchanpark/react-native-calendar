import {
    Calendar as InnerCalendar,
    ExpandableCalendar as InnerExpandableCalendar,
    WeekCalendar as InnerWeekCalendar,
    type AgendaListActions,
    type AgendaListProps,
    type CalendarProps,
} from './components';
import { CalendarProvider, withCalendarProvider } from './providers';
import type { DateType, MarkedDates } from './types';
import { LocaleConfig, LocaleUpdateConfig } from './utilities';

const Calendar = withCalendarProvider(InnerCalendar);
const WeekCalendar = withCalendarProvider(InnerWeekCalendar);
const ExpandableCalendar = withCalendarProvider(InnerExpandableCalendar) as typeof InnerExpandableCalendar;

export { Calendar, CalendarProvider, ExpandableCalendar, LocaleConfig, LocaleUpdateConfig, WeekCalendar };
export type { AgendaListActions, AgendaListProps, CalendarProps, DateType, MarkedDates };
