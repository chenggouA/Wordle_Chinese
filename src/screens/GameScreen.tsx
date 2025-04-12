import React, { useEffect, useRef, useState, useMemo } from 'react';
import idioms from "../../assets/idiom_list.json"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Alert,
    StyleSheet
} from 'react-native';
import { Video } from 'expo-av';
import { pinyin } from 'pinyin-pro';

import GameTile, { CharacterTile } from '../components/GameTile'; // 使用 moti 动画增强 GameTile
import InputModal from '../components/InputModal';
import GameHeader from '../components/GameHeader';
import GameFooter from '../components/GameFooter';
import { separatePinyin, isChinese, getPinyin } from '../utils/pinyin';

const initializeGameBoard = (): CharacterTile[][] => {
    const board: CharacterTile[][] = [];
    for (let row = 0; row < 6; row++) {
        const rowTiles: CharacterTile[] = [];
        for (let col = 0; col < 4; col++) {
            rowTiles.push({
                id: `${row}-${col}`,
                character: '',
                pinyin: ['', ''],
                status: 'empty',
                pinyinStatus: ['empty', 'empty'],
            });
        }
        board.push(rowTiles);
    }
    return board;
};

const GameScreen = () => {
    const saveGameRecord = async (result: 'won' | 'lost') => {
        try {
            const record = {
                round,
                result,
                date: new Date().toISOString(),
                guess: tiles.map(row => row.map(t => t.character).join('')).filter(row => row.trim() !== ''),
                answer: targetIdiom.map(i => i.character).join(''),
            };
            const historyJson = await AsyncStorage.getItem('game_history');
            const history = historyJson ? JSON.parse(historyJson) : [];
            history.push(record);
            await AsyncStorage.setItem('game_history', JSON.stringify(history));
        } catch (e) {
            console.error('保存历史记录失败', e);
        }
    };
    const [time, setTime] = useState('00:00:00');
    const [round, setRound] = useState('');
    const [solvedCount, setSolvedCount] = useState(0);
    const [currentSolvedRow, setCurrentSolvedRow] = useState<number | undefined>(0);


    // 将原来的 useMemo + useState 改为仅 useState
    const [targetIdiom, setTargetIdiom] = useState(() => {
        const random = idioms[Math.floor(Math.random() * idioms.length)];
        console.log('🎯 本次对抗成语：', random.word);
        return random.characters.map((c: string) => ({
            character: c,
            pinyin: { initial: getPinyin(c)[0], final: getPinyin(c)[1] },
        }));
    });







    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [activeRow, setActiveRow] = useState(0);
    const [selectedTile, setSelectedTile] = useState<{ row: number; col: number } | null>(null);
    const [tiles, setTiles] = useState<CharacterTile[][]>(initializeGameBoard);
    const [showInputModal, setShowInputModal] = useState(false);
    const [modalInput, setModalInput] = useState('');

    useEffect(() => {
        // 加载本地存储中的 round 值
        const loadRound = async () => {
            try {
                const storedRound = await AsyncStorage.getItem('user_round');
                if (storedRound) setRound(storedRound);
                else setRound('0001');
            } catch (e) {
                console.error('读取场数失败', e);
                setRound('0001');
            }
        };
        loadRound();

        // 加载 solvedCount
        const loadSolved = async () => {
            try {
                const count = await AsyncStorage.getItem('user_solved_count');
                if (count) setSolvedCount(parseInt(count));
            } catch (e) {
                console.error('读取解答成功次数失败', e);
            }
        };
        loadSolved();

        const timer = setInterval(() => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleTilePress = (row: number, col: number) => {
        if (row !== activeRow || gameStatus !== 'playing') return;
        setSelectedTile({ row, col });
        setModalInput('');
        setShowInputModal(true);
    };


    const processCharInput = (char: string) => {
        if (!selectedTile || !char) return;
        if (!isChinese(char)) return;

        // ✅ 使用 pinyin-pro 获取拼音（无音调）
        const fullPinyin = pinyin(char, { toneType: 'none' });
        console.log("fullPinyin: " + fullPinyin);

        const [initial, final] = separatePinyin(fullPinyin.toLowerCase());
        console.log(initial, final);

        const newTiles = [...tiles];
        newTiles[selectedTile.row][selectedTile.col] = {
            ...newTiles[selectedTile.row][selectedTile.col],
            character: char,
            pinyin: [initial, final],
            status: 'filled',
            pinyinStatus: ['filled', 'filled'],
        };
        setTiles(newTiles);

        const currentRow = newTiles[selectedTile.row];
        const isRowFilled = currentRow.every(tile => tile.status !== 'empty');

        if (isRowFilled) {
            evaluateRow(selectedTile.row);
        } else {
            moveToNextEmptyTile(selectedTile.row, selectedTile.col);
        }
    };
    const evaluateRow = async (row: number) => {
        const currentRow = [...tiles[row]];
        const newTiles = [...tiles];

        // 创建副本，避免污染下一行的判断逻辑
        const targetCharsCopy = targetIdiom.map(i => ({ ...i }));
        const targetInitialsCopy = targetIdiom.map(i => i.pinyin.initial);
        const targetFinalsCopy = targetIdiom.map(i => i.pinyin.final);

        // 第一轮：位置完全正确
        for (let i = 0; i < 4; i++) {
            const tile = currentRow[i];
            const [curInitial, curFinal] = tile.pinyin;
            const { character: tgtChar, pinyin: tgtPinyin } = targetIdiom[i];

            if (tile.character === tgtChar) {
                tile.status = 'correct';
                targetCharsCopy[i].character = '';
            }
            if (curInitial === tgtPinyin.initial) {
                tile.pinyinStatus[0] = 'correct';
                targetInitialsCopy[i] = '';
            }
            if (curFinal === tgtPinyin.final) {
                tile.pinyinStatus[1] = 'correct';
                targetFinalsCopy[i] = '';
            }
        }

        // 第二轮：存在但位置不对
        for (let i = 0; i < 4; i++) {
            const tile = currentRow[i];
            const [curInitial, curFinal] = tile.pinyin;

            if (tile.status !== 'correct') {
                const charIndex = targetCharsCopy.findIndex(c => c.character === tile.character);
                if (charIndex !== -1) {
                    tile.status = 'wrong-position';
                    targetCharsCopy[charIndex].character = '';
                } else {
                    tile.status = 'incorrect';
                }
            }

            if (tile.pinyinStatus[0] !== 'correct') {
                const idx = targetInitialsCopy.indexOf(curInitial);
                if (idx !== -1) {
                    tile.pinyinStatus[0] = 'wrong-position';
                    targetInitialsCopy[idx] = '';
                } else {
                    tile.pinyinStatus[0] = 'incorrect';
                }
            }

            if (tile.pinyinStatus[1] !== 'correct') {
                const idx = targetFinalsCopy.indexOf(curFinal);
                if (idx !== -1) {
                    tile.pinyinStatus[1] = 'wrong-position';
                    targetFinalsCopy[idx] = '';
                } else {
                    tile.pinyinStatus[1] = 'incorrect';
                }
            }
        }

        newTiles[row] = currentRow;
        setTiles(newTiles);

        const isCorrect = currentRow.every(t => t.status === 'correct');
        if (isCorrect) {
            setGameStatus('won');
            setSolvedCount(prev => prev + 1);
            setCurrentSolvedRow(row + 1); // ✅ 本轮是第几次猜对的（从 1 开始）
            await AsyncStorage.setItem('user_solved_count', (solvedCount + 1).toString());
            saveGameRecord('won');
            Alert.alert('恭喜', '你猜对了！');
        } else if (row === tiles.length - 1) {
            setGameStatus('lost');
            saveGameRecord('lost');
            Alert.alert('游戏结束', `正确答案是: ${targetIdiom.map(i => i.character).join('')}`);
        } else {

            setCurrentSolvedRow(row + 1); // ✅ 本轮是第几次猜对的（从 1 开始）
            setActiveRow(row + 1);
            setSelectedTile(null);
        }
    };

    const moveToNextEmptyTile = (row: number, col: number) => {
        const currentRow = tiles[row];
        for (let i = col + 1; i < currentRow.length; i++) {
            if (currentRow[i].status === 'empty') {
                setSelectedTile({ row, col: i });
                setModalInput('');
                setShowInputModal(true);
                return;
            }
        }
        for (let i = 0; i < col; i++) {
            if (currentRow[i].status === 'empty') {
                setSelectedTile({ row, col: i });
                setModalInput('');
                setShowInputModal(true);
                return;
            }
        }
        setSelectedTile(null);
    };

    const resetGame = async () => {
        setTiles(initializeGameBoard());

        // 更新场数并存储
        const nextRound = (parseInt(round) + 1).toString().padStart(4, '0');
        setRound(nextRound);
        try {
            await AsyncStorage.setItem('user_round', nextRound);
        } catch (e) {
            console.error('保存场数失败', e);
        }

        // 归零 solvedCount
        setSolvedCount(0);
        try {
            await AsyncStorage.setItem('user_solved_count', '0');
        } catch (e) {
            console.error('重置解答次数失败', e);
        }

        // 重新随机抽取成语
        const newIdiom = idioms[Math.floor(Math.random() * idioms.length)];
        console.log('🎯 新一轮对抗成语：', newIdiom.word);
        setTargetIdiom(
            newIdiom.characters.map((c: string) => ({
                character: c,
                pinyin: {
                    initial: getPinyin(c)[0],
                    final: getPinyin(c)[1],
                },
            }))
        );

        setActiveRow(0);
        setSelectedTile(null);
        setGameStatus('playing');
        setCurrentSolvedRow(undefined);

    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />

            {/* 背景视频 */}
            <Video
                source={require('../../assets/background.mp4')}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                shouldPlay
                isLooping
                isMuted
            />

            {/* 头部信息 */}
            <GameHeader
                time={time}
                round={round}
                currentSolvedRow={gameStatus === 'won' ? currentSolvedRow : undefined}
            />

            {/* 游戏主体 + footer 包一层大容器 */}
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
                {/* 游戏格子区域 */}
                <View style={{ alignItems: 'center', flexGrow: 1, }}>
                    {tiles.map((row, rowIndex) => (
                        <View
                            key={`row-${rowIndex}`}
                            style={{
                                flexDirection: 'row',
                                marginBottom: 15,
                                justifyContent: 'space-between',
                            }}
                        >
                            {row.map((tile, colIndex) => (
                                <GameTile
                                    key={tile.id}
                                    tile={tile}
                                    isSelected={selectedTile?.row === rowIndex && selectedTile?.col === colIndex}
                                    onPress={() => handleTilePress(rowIndex, colIndex)}
                                />
                            ))}
                        </View>
                    ))}
                </View>

                <View style={{ height: wp('5%') }} /> {/* Spacer */}
                {/* 底部按钮区域，自适应位置 */}
                <GameFooter gameStatus={gameStatus} onRestartPress={resetGame} />
            </View>

            {/* 输入弹窗 */}
            <InputModal
                visible={showInputModal}
                value={modalInput}
                onChangeText={setModalInput}
                onCancel={() => setShowInputModal(false)}
                onConfirm={() => {
                    const chars = modalInput.match(/[\u4e00-\u9fa5]/g); // ✅ 提取所有汉字
                    if (!chars || chars.length === 0 || !selectedTile) {
                        Alert.alert('请输入有效汉字');
                        setShowInputModal(false);
                        return;
                    }

                    const newTiles = [...tiles];
                    const row = selectedTile.row;
                    let col = selectedTile.col;

                    for (let i = 0; i < chars.length && col < newTiles[row].length; i++) {
                        const char = chars[i];
                        const fullPinyin = pinyin(char, { toneType: 'none' });
                        const [initial, final] = separatePinyin(fullPinyin.toLowerCase());

                        // 只填空格子
                        if (newTiles[row][col].status === 'empty') {
                            newTiles[row][col] = {
                                ...newTiles[row][col],
                                character: char,
                                pinyin: [initial, final],
                                status: 'filled',
                                pinyinStatus: ['filled', 'filled'],
                            };
                            col++;
                        }
                    }

                    setTiles(newTiles);
                    setShowInputModal(false);

                    // 检查当前行是否填满，决定是否调用评估函数或移动焦点
                    const isRowFilled = newTiles[row].every(t => t.status !== 'empty');
                    if (isRowFilled) {
                        evaluateRow(row);
                    } else {
                        // 自动跳转到下一个空格
                        for (let i = 0; i < newTiles[row].length; i++) {
                            if (newTiles[row][i].status === 'empty') {
                                setSelectedTile({ row, col: i });
                                break;
                            }
                        }
                    }
                }}

            />
        </SafeAreaView>
    );

};

export default GameScreen;
