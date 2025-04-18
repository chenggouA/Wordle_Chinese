# 🧩 PinyinWordle

一个基于拼音匹配规则的中文成语猜词小游戏，灵感来源于 Wordle，用户需要根据拼音提示逐步推理出目标成语。

![游戏截图](./assets/screenshot.png)

---

## 🎮 游戏规则说明

PinyinWordle 是一个拼音逻辑挑战游戏，目标是通过 6 行机会猜出一个 4 字成语。每轮输入后，会根据拼音和文字匹配情况给予提示：

### 每个格子由两部分组成：

- 🈶 汉字：表示你猜的字
- 🔤 拼音声母（initial）和韵母（final）

### 匹配提示说明：

- ✅ **绿色**：位置正确
- 🟡 **黄色**：存在但位置错误
- ⚪️ **灰色**：拼音或字母完全错误

### 示例：

| 输入         | 结果说明                          |
|--------------|-----------------------------------|
| `天 马 行 空` | 你输入的是 4 个字                  |
| 拼音显示       | 如：`tian` → `t`（声母） + `ian`（韵母） |
| 匹配后标色     | 每个部分单独高亮判断              |

---

## 🚀 功能亮点

- 🎯 拼音级别提示：支持拼音初声和韵母精细匹配
- 🧠 Wordle 玩法融合中文逻辑
- 💾 自动记录历史战绩（AsyncStorage 本地存储）
- 📱 响应式适配屏幕尺寸
- 📽️ 背景视频增强视觉沉浸感
- 🧩 支持连续对局、自动换题
- 📦 安卓 APK 可直接扫码体验

---

## 📋 TODO（未来规划功能）

- [ ] 📜 历史战绩查看页面（查看每局记录、答题结果）
- [ ] 💡 成语提示功能（如：拼音首字母、成语长度、提示使用次数限制）
- [ ] 📘 成语释义展示（支持猜完后点击查看来源/解释）
- [ ] 🧪 开发者调试入口（跳过动画、快速出题）
- [ ] 📱 iOS 构建支持（当前为 Android 优先）
- [ ] 依赖包精简

---


## 🧰 技术栈

- React Native
- Expo
- pinyin-pro（拼音拆解）
- AsyncStorage（本地记录）
- expo-av（背景视频播放）

---

## 🛠️ 本地开发指南

### 安装依赖

```bash
npm install
```

### 启动项目（使用 Expo）

```bash
npx expo start
```

你可以通过浏览器打开 DevTools，也可以扫码启动手机调试。

---


## 📄 License

MIT License

---

> 项目由 [Chenggou] 构建。如需定制化版本或学习源码，欢迎联系或 fork ⭐️


