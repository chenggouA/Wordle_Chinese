// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍀 菜就多练</Text>
      <Button title="开始游戏" onPress={() => navigation.navigate('Game')} />
      <View style={{ marginTop: 20 }} />
      <Button
        title="查看更新日志"
        onPress={() => navigation.navigate('Changelog')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 30 },
});
