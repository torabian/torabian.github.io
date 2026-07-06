import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useBrandContent } from "../sdk/useBrand";
import { useMatches } from "../sdk/useMatches";
import { MatchCard } from "./MatchCard";
import { filterMatches } from "./matches";
import { useTheme } from "../core/themes/theme";

export default function MatchesScreen() {
  const { data: brandContent } = useBrandContent();
  const theme = useTheme();

  const [filter, setFilter] = useState<
    "all" | "live" | "upcoming" | "finished"
  >("live");

  const { data } = useMatches();

  if (!data) {
    return (
      <View style={{ marginTop: 50 }}>
        <ActivityIndicator />
      </View>
    );
  }

  const filtered = filterMatches(data, filter);

  return (
    <ImageBackground
      style={{ flex: 1, padding: 15 }}
      resizeMode="cover"
      source={brandContent?.background}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            backgroundColor: theme.colors.card,
            marginBottom: 15,
            borderRadius: 10,
          }}
        >
          <Button title="Live" onPress={() => setFilter("live")} />
          <Button title="Upcoming" onPress={() => setFilter("upcoming")} />
          <Button title="Finished" onPress={() => setFilter("finished")} />
          <Button title="All" onPress={() => setFilter("all")} />
        </View>

        <ScrollView>
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
