import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

interface GameFooterProps {
  gameStatus: 'playing' | 'won' | 'lost';
  onBackPress?: () => void;
  onRestartPress?: () => void;
}

const GameFooter: React.FC<GameFooterProps> = ({
  gameStatus,
  onBackPress,
  onRestartPress,
}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Image
            source={{ uri: 'https://i.imgur.com/JqKULIL.png' }}
            style={[styles.backIcon, { opacity: 0 }]} // 👈 隐藏但保留空间
        />
      </TouchableOpacity>

    <TouchableOpacity
    style={styles.meaningButton}
    onPress={onRestartPress}
    >
    <Text style={styles.meaningButtonText}>重新开始</Text>
    </TouchableOpacity>


      <View style={styles.confuciusContainer}>
        <Image
            source={{ uri: 'https://i.imgur.com/8XZyLpB.png' }}
            style={[styles.confuciusImage, { opacity: 0 }]} // 👈 隐藏但保留空间
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingBottom: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#333',
  },
  meaningButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  meaningButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  confuciusContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confuciusImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default GameFooter;
