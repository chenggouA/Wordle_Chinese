import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { achievementTexts, achievementDescriptions } from "../../data/achievements";

interface BattleProps {
  battle: {
    id: number;
    round: number;
    success: boolean;
    level?: number;
  };
}


function toFinancialChinese(num: number): string {
  const numerals = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟'];

  if (num === 0) return '零';

  const numStr = String(num);
  let result = '';

  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]);
    const unitIndex = numStr.length - i - 1;

    if (digit !== 0) {
      result += numerals[digit] + units[unitIndex];
    } else if (!result.endsWith('零')) {
      result += '零';
    }
  }

  result = result.replace(/零+$/, ''); // 去尾零
  result = result.replace(/^壹拾/, '拾'); // 十三 → 拾參
  return result;
}

export default function BattleCard({ battle }: BattleProps) {
  const formattedDate = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.cardWrapper}>
      <BlurView intensity={50} tint="dark" style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.roundContainer}>
            <View style={styles.roundCircle}>
              <Text style={styles.roundNumber}>{battle.round}</Text>
            </View>
            <Text style={styles.roundText}>第{toFinancialChinese(battle.round)}回對戰</Text>

          </View>

          <View
            style={[
              styles.statusBadge,
              battle.success ? styles.successBadge : styles.failureBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                battle.success ? styles.successText : styles.failureText,
              ]}
            >
              {battle.success ? "得胜" : "惜败"}
            </Text>
          </View>
        </View>

        {battle.success && battle.level && (
          <View style={styles.achievementContainer}>
            <View style={styles.achievementHeader}>
              <View style={styles.achievementLine} />
              <Text style={styles.achievementTitle}>
                {achievementTexts[battle.level - 1]}
              </Text>
              <View style={[styles.achievementLine, styles.achievementLineFlex]} />
            </View>
            <Text style={styles.achievementDescription}>
              {achievementDescriptions[battle.level - 1]}
            </Text>
          </View>
        )}

        {!battle.success && (
          <Text style={styles.failureDescription}>虽败犹荣，来日方长</Text>
        )}

        <Text style={styles.dateText}>{formattedDate}</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden", // ✅ 关键，确保 BlurView 不超出边界
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#92400E",
    alignItems: "center",
    justifyContent: "center",
  },
  roundNumber: {
    color: "#FFFBEB",
    fontSize: 14,
    fontWeight: "500",
  },
  roundText: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFBEB",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  successBadge: {
    backgroundColor: "rgba(16,185,129,0.1)",
    borderColor: "rgba(110,231,183,0.5)",
  },
  failureBadge: {
    backgroundColor: "rgba(120,113,108,0.1)",
    borderColor: "rgba(168,162,158,0.4)",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  successText: {
    color: "#34D399",
  },
  failureText: {
    color: "#A8A29E",
  },
  achievementContainer: {
    marginTop: 8,
  },
  achievementHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  achievementLine: {
    height: 2,
    width: 24,
    backgroundColor: "#FBBF24",
    opacity: 0.5,
  },
  achievementLineFlex: {
    flex: 1,
  },
  achievementTitle: {
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FCD34D",
  },
  achievementDescription: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: "italic",
    color: "#FACC15",
  },
  failureDescription: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: "italic",
    color: "#D6D3D1",
  },
  dateText: {
    marginTop: 12,
    fontSize: 12,
    color: "#D6D3D1",
    textAlign: "right",
  },
});
