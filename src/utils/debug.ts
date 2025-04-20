// src/utils/debug.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function devClearAllBattleData() {
  try {
    await AsyncStorage.multiRemove([
      "game_history",
      "user_round",
      "user_solved_count",
    ]);
    console.log("✅ 已清除 game_history / user_round / user_solved_count");
  } catch (e) {
    console.error("❌ 清除失败", e);
  }
}
