import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export interface CharacterTile {
  id: string;
  character: string;
  pinyin: [string, string];
  status: 'empty' | 'filled' | 'correct' | 'wrong-position' | 'incorrect';
  pinyinStatus: [
    'empty' | 'correct' | 'wrong-position' | 'incorrect',
    'empty' | 'correct' | 'wrong-position' | 'incorrect'
  ];
}

interface GameTileProps {
  tile: CharacterTile;
  isSelected: boolean;
  onPress?: () => void;
}

const GameTile: React.FC<GameTileProps> = ({ tile, isSelected, onPress }) => {
  let initialBgColor = '#CCCCCC';
  let finalBgColor = '#EEEEEE';

  if (tile.pinyinStatus[0] === 'correct') initialBgColor = '#8BC34A';
  else if (tile.pinyinStatus[0] === 'wrong-position') initialBgColor = '#FFEB3B';

  if (tile.pinyinStatus[1] === 'correct') finalBgColor = '#8BC34A';
  else if (tile.pinyinStatus[1] === 'wrong-position') finalBgColor = '#FFEB3B';

  let textColor = '#666666';
  let textOpacity = 1.0;
  let fontWeight: 'normal' | 'bold' = 'normal';

  if (tile.status === 'correct') {
    textColor = '#006400';
    fontWeight = 'bold';
  } else if (tile.status === 'wrong-position') {
    textColor = '#FFA500';
    textOpacity = 0.9;
  } else if (tile.status === 'incorrect') {
    textColor = '#666666';
    textOpacity = 0.5;
  } else if (tile.status === 'filled') {
    textColor = '#000000';
    textOpacity = 0.8;
  }

  const borderColor = isSelected
    ? '#FF5722'
    : tile.status === 'correct'
    ? '#8BC34A'
    : '#AAAAAA';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.tileWrapper}>
        <View style={styles.pinyinContainer}>
          <View style={[styles.pinyinLeft, { backgroundColor: initialBgColor }]}>
            <Text style={styles.pinyinText}>{tile.pinyin[0]}</Text>
          </View>
          <View style={[styles.pinyinRight, { backgroundColor: finalBgColor }]}>
            <Text style={styles.pinyinText}>{tile.pinyin[1]}</Text>
          </View>
        </View>

        <View
          style={[
            styles.tileContainer,
            { borderColor, borderWidth: isSelected ? 2 : 1 },
          ]}
        >
          <View style={styles.characterWrapper}>
            <View style={styles.characterContainer}>
              <Text
                style={{
                  color: textColor,
                  opacity: textOpacity,
                  fontSize: wp('9%'),
                  fontWeight,
                }}
              >
                {tile.character}
              </Text>
            </View>
          </View>

          <View style={styles.gridLines}>
            <View style={styles.horizontalLine} />
            <View style={styles.verticalLine} />
            <View style={styles.diagonalLine1} />
            <View style={styles.diagonalLine2} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileWrapper: {
    alignItems: 'center',
    marginHorizontal: wp('1%'), 
  },
  pinyinContainer: {
    flexDirection: 'row',
      width: wp('18%'),
    height: 24,
  },
  pinyinLeft: {
    width: '50%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinyinRight: {
    width: '50%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinyinText: {
    fontSize: wp('3.5%'), // 自动字体大小    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'monospace' : undefined,
  },
  tileContainer: {
    width: wp('18%'),      // 屏幕宽度的 18%
    height: wp('18%'),     // 保证正方形
    borderRadius: wp('2%'),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'relative',
  },
  characterWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 8,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  gridLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  diagonalLine1: {
    position: 'absolute',
    width: '141%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    top: '50%',
    left: '-20%',
    transform: [{ rotate: '45deg' }],
  },
  diagonalLine2: {
    position: 'absolute',
    width: '141%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    top: '50%',
    left: '-20%',
    transform: [{ rotate: '-45deg' }],
  },
});

export default GameTile;
