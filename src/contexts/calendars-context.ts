import { createContext, type Dispatch } from 'react';

import type { CalendarActions, CalendarState } from '../types';

export const CalendarsStateContext = createContext<CalendarState | null>(null);

export const CalendarsActionsContext = createContext<Dispatch<CalendarActions> | null>(null);
