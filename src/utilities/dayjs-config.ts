import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.extend(localeData);

export const LocaleUpdateConfig = dayjs.updateLocale;

export const LocaleConfig = dayjs.locale;

export default dayjs;
