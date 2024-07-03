import { useEffect, useState } from 'react';

export default function usePreservedReference<T extends {}>(
    value: T,
    areValuesEqual: (a: T, b: T) => boolean = areDeeplyEqual,
) {
    const [reference, setReference] = useState<T>(value);

    useEffect(() => {
        if (!areValuesEqual(value, reference)) {
            setReference(value);
        }
    }, [areValuesEqual, reference, value]);

    return reference;
}

function areDeeplyEqual<T extends {}>(x: T, y: T) {
    return JSON.stringify(x) === JSON.stringify(y);
}
