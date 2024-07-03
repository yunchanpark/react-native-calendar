import { renderHook } from '@testing-library/react';

import usePreservedReference from './use-preserved-reference';

type TestObject = {
    test: string;
};

describe('usePreservedReference', () => {
    const callbackReturnTrue = jest.fn(() => true);
    const callbackReturnFalse = jest.fn(() => false);

    describe('with Default Callback Function', () => {
        it('changed to the same value', () => {
            const testObject: TestObject = { test: '테스트' };

            const { result, rerender } = renderHook(({ value }) => usePreservedReference(value), {
                initialProps: { value: testObject },
            });

            rerender({ value: { test: '테스트' } });

            expect(result.current).toBe(testObject);
            expect(result.current).toEqual(testObject);
        });
        it('changed to a different value', () => {
            const testObject: TestObject = { test: '테스트' };
            const { result, rerender } = renderHook(({ value }) => usePreservedReference(value), {
                initialProps: { value: testObject },
            });

            rerender({ value: { test: 'test' } });

            expect(result.current).not.toBe(testObject);
            expect(result.current).not.toEqual(testObject);
        });
    });
    describe('with Custom Callback Function', () => {
        it('changed to the same value', () => {
            const testObject: TestObject = { test: '테스트' };

            const { result, rerender } = renderHook(({ value }) => usePreservedReference(value, callbackReturnTrue), {
                initialProps: { value: testObject },
            });

            rerender({ value: { test: '테스트' } });

            expect(result.current).toBe(testObject);
        });
        it('changed to a different value', () => {
            const testObject: TestObject = { test: '테스트' };

            const { result, rerender } = renderHook(({ value }) => usePreservedReference(value, callbackReturnFalse), {
                initialProps: { value: testObject },
            });

            rerender({ value: { test: '테스트' } });

            expect(result.current).not.toBe(testObject);
        });
    });
});
