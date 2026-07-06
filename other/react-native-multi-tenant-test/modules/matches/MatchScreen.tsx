import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../../RootNavigator";
import { useMatchDetails } from "../sdk/useMatchDetails";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useBrandContent } from "../sdk/useBrand";

const v = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
};

type MatchDetailsRoute = RouteProp<RootStackParamList, "MatchSingle">;

export default function MatchDetailsScreen() {
  const route = useRoute<MatchDetailsRoute>();
  const { data: brandContent } = useBrandContent();
  const { matchId } = route.params;

  const { data: match } = useMatchDetails(matchId);

  if (!match) {
    return (
      <View style={{ marginTop: 50 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={brandContent?.background}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.competition}>{v(match.competition)}</Text>

        <Text style={styles.teams}>
          {v(match.homeTeam)} vs {v(match.awayTeam)}
        </Text>

        <Text style={styles.live}>
          {match.status === "live"
            ? `🔴 LIVE ${v(match.minute)}'`
            : v(match.status)}
        </Text>

        <Text style={styles.score}>
          {v(match.homeScore)} : {v(match.awayScore)}
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Match Information</Text>

          <Row label="Kickoff" value={v(match.kickoff)} />
          <Row label="Stadium" value={v(match.stadium)} />
          <Row label="Status" value={v(match.status)} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Statistics</Text>

          <StatRow
            title="Possession"
            home={v(match.statistics?.possessionHome)}
            away={v(match.statistics?.possessionAway)}
          />

          <StatRow
            title="Shots"
            home={v(match.statistics?.shotsHome)}
            away={v(match.statistics?.shotsAway)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Odds</Text>

          <OddRow title="Home Win" odd={v(match.odds?.home)} />
          <OddRow title="Draw" odd={v(match.odds?.draw)} />
          <OddRow title="Away Win" odd={v(match.odds?.away)} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Events</Text>

          {(match.events?.length ?? 0) > 0 ? (
            match.events?.map((e, i) => (
              <Text key={i}>
                {e.icon} {v(e.text)}
              </Text>
            ))
          ) : (
            <Text>-</Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

function StatRow({
  title,
  home,
  away,
}: {
  title: string;
  home: string;
  away: string;
}) {
  return (
    <View style={styles.row}>
      <Text>{home}</Text>
      <Text>{title}</Text>
      <Text>{away}</Text>
    </View>
  );
}

function OddRow({ title, odd }: { title: string; odd: string }) {
  return (
    <View style={styles.row}>
      <Text>{title}</Text>
      <Text style={styles.odd}>{odd}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  competition: {
    textAlign: "center",
    color: "#666",
    marginBottom: 6,
  },

  teams: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  live: {
    textAlign: "center",
    color: "red",
    marginTop: 8,
    fontWeight: "600",
  },

  score: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  card: {
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  odd: {
    fontWeight: "700",
    fontSize: 18,
  },
});
