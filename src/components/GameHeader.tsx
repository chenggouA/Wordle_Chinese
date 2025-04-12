import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameHeaderProps {
  time: string;
  round: string;
  currentSolvedRow: number;
  onHelpPress?: () => void;
  onRankPress?: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  time,
  round,
  currentSolvedRow,
  onHelpPress,
  onRankPress,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.helpButton} onPress={onHelpPress}>
        <Text style={styles.helpButtonText}>?</Text>
      </TouchableOpacity>

      <View style={styles.roundInfo}>
        <Text style={styles.roundText}>第{round}场</Text>
      </View>

        <View style={styles.achievementContainer}>
        {typeof currentSolvedRow === 'number' && (
            <Text style={styles.achievementText}>{currentSolvedRow}次得解 卓尔不群</Text>
        )}
        </View>

        <View style={[styles.timeContainer, { display: 'none' }]}>
        <Text style={styles.timeText}>{time}</Text>
        </View>



     
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 60,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D2B48C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 24,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  roundInfo: {
    marginLeft: 10,
  },
  roundText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  achievementContainer: {
    flex: 1,
    alignItems: 'center',
  },
  achievementText: {
    fontSize: 16,
    color: '#8B0000',
    fontWeight: 'bold',
  },
  timeContainer: {
    marginRight: 10,
    
  },
  timeText: {
    fontSize: 16,
     color: '#4B0082',
    
  },
  rankButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8B0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  rankButtonText: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default GameHeader;
