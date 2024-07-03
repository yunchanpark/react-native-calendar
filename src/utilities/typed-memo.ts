import { memo, type PropsWithChildren } from 'react';

export const typedMemo: <T>(
    component: T,
    propsAreEqual?: (prevProps: PropsWithChildren<T>, nextProps: PropsWithChildren<T>) => boolean,
) => T = memo;
