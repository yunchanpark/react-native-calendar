import { getMonthDaysArray, getMonthWeekInfo, getMonthWeeksArray } from './calc-date';
import dayjs from './dayjs-config';

describe('getMonthDaysArray', () => {
    test('should return correct days array for February 2024', () => {
        const date = '2024-02-01';
        const expected = [
            '2024-01-28',
            '2024-01-29',
            '2024-01-30',
            '2024-01-31',
            '2024-02-01',
            '2024-02-02',
            '2024-02-03',
            '2024-02-04',
            '2024-02-05',
            '2024-02-06',
            '2024-02-07',
            '2024-02-08',
            '2024-02-09',
            '2024-02-10',
            '2024-02-11',
            '2024-02-12',
            '2024-02-13',
            '2024-02-14',
            '2024-02-15',
            '2024-02-16',
            '2024-02-17',
            '2024-02-18',
            '2024-02-19',
            '2024-02-20',
            '2024-02-21',
            '2024-02-22',
            '2024-02-23',
            '2024-02-24',
            '2024-02-25',
            '2024-02-26',
            '2024-02-27',
            '2024-02-28',
            '2024-02-29',
            '2024-03-01',
            '2024-03-02',
        ];

        const result = getMonthDaysArray(date).map((day) => day.dayString);

        expect(result).toEqual(expected);
    });
});

describe('getMonthWeeksArray', () => {
    test('should return correct weeks array for February 2024', () => {
        const date = '2024-02-01';
        const expected = [
            [
                { dayString: '2024-01-28', year: 2024, month: 1, date: 28 },
                { dayString: '2024-01-29', year: 2024, month: 1, date: 29 },
                { dayString: '2024-01-30', year: 2024, month: 1, date: 30 },
                { dayString: '2024-01-31', year: 2024, month: 1, date: 31 },
                { dayString: '2024-02-01', year: 2024, month: 2, date: 1 },
                { dayString: '2024-02-02', year: 2024, month: 2, date: 2 },
                { dayString: '2024-02-03', year: 2024, month: 2, date: 3 },
            ],
            [
                { dayString: '2024-02-04', year: 2024, month: 2, date: 4 },
                { dayString: '2024-02-05', year: 2024, month: 2, date: 5 },
                { dayString: '2024-02-06', year: 2024, month: 2, date: 6 },
                { dayString: '2024-02-07', year: 2024, month: 2, date: 7 },
                { dayString: '2024-02-08', year: 2024, month: 2, date: 8 },
                { dayString: '2024-02-09', year: 2024, month: 2, date: 9 },
                { dayString: '2024-02-10', year: 2024, month: 2, date: 10 },
            ],
            [
                { dayString: '2024-02-11', year: 2024, month: 2, date: 11 },
                { dayString: '2024-02-12', year: 2024, month: 2, date: 12 },
                { dayString: '2024-02-13', year: 2024, month: 2, date: 13 },
                { dayString: '2024-02-14', year: 2024, month: 2, date: 14 },
                { dayString: '2024-02-15', year: 2024, month: 2, date: 15 },
                { dayString: '2024-02-16', year: 2024, month: 2, date: 16 },
                { dayString: '2024-02-17', year: 2024, month: 2, date: 17 },
            ],
            [
                { dayString: '2024-02-18', year: 2024, month: 2, date: 18 },
                { dayString: '2024-02-19', year: 2024, month: 2, date: 19 },
                { dayString: '2024-02-20', year: 2024, month: 2, date: 20 },
                { dayString: '2024-02-21', year: 2024, month: 2, date: 21 },
                { dayString: '2024-02-22', year: 2024, month: 2, date: 22 },
                { dayString: '2024-02-23', year: 2024, month: 2, date: 23 },
                { dayString: '2024-02-24', year: 2024, month: 2, date: 24 },
            ],
            [
                { dayString: '2024-02-25', year: 2024, month: 2, date: 25 },
                { dayString: '2024-02-26', year: 2024, month: 2, date: 26 },
                { dayString: '2024-02-27', year: 2024, month: 2, date: 27 },
                { dayString: '2024-02-28', year: 2024, month: 2, date: 28 },
                { dayString: '2024-02-29', year: 2024, month: 2, date: 29 },
                { dayString: '2024-03-01', year: 2024, month: 3, date: 1 },
                { dayString: '2024-03-02', year: 2024, month: 3, date: 2 },
            ],
        ];

        const result = getMonthWeeksArray(date).map((week) =>
            week.map((day) => ({
                dayString: day.dayString,
                year: day.year,
                month: day.month,
                date: day.date,
            })),
        );

        expect(result).toEqual(expected);
    });
});

describe('getMonthWeekInfo', () => {
    test('should return correct week info for February 2024', () => {
        const date = dayjs('2024-02-15');
        const expected = {
            weekCountInMonth: 5,
            selectedWeekNumber: 3,
        };

        const result = getMonthWeekInfo(date);

        expect(result).toEqual(expected);
    });

    test('should return correct week info for March 2024', () => {
        const date = dayjs('2024-03-25');
        const expected = {
            weekCountInMonth: 6,
            selectedWeekNumber: 5,
        };

        const result = getMonthWeekInfo(date);

        expect(result).toEqual(expected);
    });

    test('should return correct week info for January 2024', () => {
        const date = dayjs('2024-01-01');
        const expected = {
            weekCountInMonth: 5,
            selectedWeekNumber: 1,
        };

        const result = getMonthWeekInfo(date);

        expect(result).toEqual(expected);
    });

    test('should return correct week info for December 2024', () => {
        const date = dayjs('2024-12-31');
        const expected = {
            weekCountInMonth: 5,
            selectedWeekNumber: 5,
        };

        const result = getMonthWeekInfo(date);

        expect(result).toEqual(expected);
    });
});
