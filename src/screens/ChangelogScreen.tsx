// src/screens/ChangelogScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';


export default function ChangelogScreen() {
    const [loadFailed, setLoadFailed] = useState(false);

    if (loadFailed) {
        return (
            <SafeAreaView style={styles.fallbackContainer}>
                <Text style={styles.fallbackTitle}>⚠️ 无法加载更新日志</Text>
                <Text style={styles.fallbackMessage}>
                    当前网络无法访问 GitHub Pages，请稍后重试，或前往公众号查看更新内容（其实没有）。
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <WebView
                source={{ uri: 'https://chenggoua.github.io/Wordle_Chinese/log.html' }}
                style={{ flex: 1 }}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#4caf50" />
                    </View>
                )}
                onError={() => setLoadFailed(true)}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    fallbackTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#d32f2f',
    },
    fallbackMessage: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        lineHeight: 24,
    },
});
