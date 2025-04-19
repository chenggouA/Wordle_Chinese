// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/bg_home.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>🍀 菜就多练</Text>
          <Text style={styles.subtitle}>成语猜词小游戏</Text>
          <Text style={styles.tip}>点击下方标签栏开始游戏或查看更新</Text>

          <Text style={styles.rules}>
            玩法说明：
            {"\n"}- 目标是猜出一个五字成语
            {"\n"}- 每次输入一个五字答案
            {"\n"}- 每个字会获得以下提示：
            {"\n"}   🟩 绿色：字正确且位置正确
            {"\n"}   🟨 黄色：字在成语中但位置错误
            {"\n"}   ⬜ 灰色：该字不在成语中
            {"\n"}- 每个字下方会显示拼音
            {"\n"}   拼音提示颜色与汉字完全同步
            {"\n"}- 最多可尝试 6 次，挑战你的成语词汇与逻辑推理能力！
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 20,
  },
  tip: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  rules: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
});
