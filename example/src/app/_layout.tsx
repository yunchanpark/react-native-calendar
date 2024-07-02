import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootRoute() {
    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <Tabs sceneContainerStyle={styles.wrapper}>
                <Tabs.Screen name="(calendar)/index" options={{ title: 'calendar' }} />
                <Tabs.Screen name="(week)/index" options={{ title: 'week-calendar' }} />
            </Tabs>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
