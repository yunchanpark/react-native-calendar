import { memo } from 'react';

export const typedMemo: <T>(
    component: T,
    propsAreEqual?: (prevProps: React.PropsWithChildren<T>, nextProps: React.PropsWithChildren<T>) => boolean,
) => T = memo;
