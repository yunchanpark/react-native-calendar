import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';

import usePreservedCallback from './use-preserved-callback';
import usePreservedReference from './use-preserved-reference';

export default function useDebounce<F extends (...args: any[]) => any>(
    callback: F,
    wait: number,
    options: Parameters<typeof debounce>[2] = {},
) {
    const preservedCallback = usePreservedCallback(callback);
    const preservedOptions = usePreservedReference(options);

    const debounced = useMemo(() => {
        return debounce(preservedCallback, wait, preservedOptions);
    }, [preservedCallback, preservedOptions, wait]);

    useEffect(() => {
        return () => {
            debounced.cancel();
        };
    }, [debounced]);

    return debounced;
}
