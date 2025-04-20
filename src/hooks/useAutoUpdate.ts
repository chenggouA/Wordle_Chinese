// hooks/useAutoUpdate.ts
import { useEffect } from "react";
import { Alert} from "react-native";
import * as Updates from "expo-updates";

export function useAutoUpdate() {
  useEffect(() => {
    async function checkForOTAUpdate() {
      try {
        if (__DEV__) return; // 跳过开发模式

        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert(
            "发现新版本",
            "是否立即重启应用以更新内容？",
            [
              {
                text: "稍后",
                style: "cancel",
              },
              {
                text: "立即重启",
                onPress: () => Updates.reloadAsync(),
              },
            ],
            { cancelable: true }
          );
        }
      } catch (e) {
        console.warn("⚠️ OTA 更新检查失败：", e);
      }
    }

    checkForOTAUpdate();
  }, []);
}
