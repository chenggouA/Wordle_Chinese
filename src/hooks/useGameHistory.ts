// src/hooks/useGameHistory.ts
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export interface GameHistoryItem {
  id: number;
  round: number;
  success: boolean;
  level?: number;
}

export function useGameHistory() {
  const [battles, setBattles] = useState<GameHistoryItem[]>([]);
  const isFocused = useIsFocused();

  const reloadHistory = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("game_history");
      const history = json ? JSON.parse(json) : [];
      const parsed: GameHistoryItem[] = history.map((item: any, index: number) => ({
        id: index + 1,
        round: parseInt(item.round, 10),
        success: item.result === "won",
        level: item.result === "won" ? item.guess.length : undefined,
      }));
      setBattles(parsed.reverse());
    } catch (e) {
      console.error("[useGameHistory] 加载对战历史失败", e);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        "game_history",
        "user_round",
        "user_solved_count",
      ]);
      setBattles([]);
      console.log("[useGameHistory] 清除成功");
    } catch (e) {
      console.error("[useGameHistory] 清除失败", e);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      reloadHistory();
    }
  }, [isFocused, reloadHistory]);

  return {
    battles,
    reloadHistory,
    clearHistory,
  };
}
