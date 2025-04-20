import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import BattleCard from "./BattleCard"
import { ImageBackground } from "react-native"

import { SafeAreaView } from "react-native"

import { devClearAllBattleData } from "../../utils/debug"
import { useGameHistory } from "../../hooks/useGameHistory"
export default function BattleHistory() {

  // devClearAllBattleData();

 const { battles, reloadHistory, clearHistory } = useGameHistory();

  return (
    <ImageBackground
      source={require("../../../assets/bg_battlefield.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.25)" }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>历史对战记录</Text>
            <View style={styles.divider} />
          </View>

          <FlatList
            data={battles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <BattleCard battle={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>暂无历史记录</Text>}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // backgroundColor: "#FEF3C7", // amber-50 equivalent
  },
  header: {
    alignItems: "center",
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#78350F", // amber-900 equivalent
    marginBottom: 8,
  },
  divider: {
    height: 2,
    width: 120,
    backgroundColor: "#B45309", // amber-700 equivalent
    opacity: 0.6,
  },
  listContent: {
    paddingBottom: 24,
  },
})
