import { FlashList, type ViewToken } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent, ViewabilityConfig } from 'react-native';

import { useCalendarHandler, useCalendarState, useDebounce } from '../../hooks';
import { typedMemo } from '../../utilities';

import type { AgendaListProps, ContentData, TitleData } from './types';

function AgendaList<TData>({ onScroll, openCalendar, closeCalendar, data, ...props }: AgendaListProps<TData>) {
    // hooks
    const { selectedDateString } = useCalendarState();
    const { setDate } = useCalendarHandler();

    // refs
    const viewingDate = useRef(selectedDateString);
    const isScrollStart = useRef(false);
    const startScrollY = useRef(0);
    const agendaListRef = useRef<FlashList<ContentData<TData> | TitleData>>(null);
    const viewabilityConfig = useRef<ViewabilityConfig>({
        waitForInteraction: true,
        itemVisiblePercentThreshold: 50,
    }).current;

    // flash-list initial scroll
    if (dayjs(selectedDateString).endOf('month').isSame(selectedDateString, 'day')) {
        agendaListRef.current?.scrollToIndex({ index: 0 });
    }

    // effects
    useEffect(() => {
        if (viewingDate.current !== undefined && selectedDateString !== viewingDate.current) {
            viewingDate.current = selectedDateString;
            const findMoveIndex = data?.findIndex((item) => item.type === 'TITLE' && item.dateString === selectedDateString);
            if (findMoveIndex !== undefined && findMoveIndex !== -1) {
                agendaListRef.current?.scrollToIndex({ index: findMoveIndex, animated: true });
            }
        }
    }, [data, selectedDateString]);

    // functions
    const _handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (startScrollY.current === 0 && isScrollStart.current) {
                const isDownScroll = event.nativeEvent.contentOffset.y < 0;
                const isUpScroll = event.nativeEvent.contentOffset.y > 0;
                if (isDownScroll) {
                    openCalendar();
                } else if (isUpScroll) {
                    closeCalendar();
                }
            }
            startScrollY.current = event.nativeEvent.contentOffset.y;
            onScroll?.(event);
        },
        [closeCalendar, onScroll, openCalendar],
    );

    const _handleScrollBeginDrag = useCallback(() => {
        isScrollStart.current = true;
    }, []);

    const _handleViewableItemChanged = useDebounce((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
        if (isScrollStart.current) {
            viewingDate.current = info.viewableItems.find((viewToken) => viewToken.item.type === 'TITLE')?.item.dateString;
            isScrollStart.current = false;
            if (viewingDate.current) {
                setDate(viewingDate.current);
            }
        }
    }, 500);

    return (
        <FlashList
            {...props}
            ref={agendaListRef}
            data={data}
            viewabilityConfig={viewabilityConfig}
            onScroll={_handleScroll}
            onScrollBeginDrag={_handleScrollBeginDrag}
            onViewableItemsChanged={_handleViewableItemChanged}
        />
    );
}

export default typedMemo(AgendaList);
