import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../RootNavigator";
import { useTheme } from "../core/themes/theme";
import { FootballMatch } from "./MatchCard.types";

type Props = {
  match: FootballMatch;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Matches">;

export const MatchCard = ({ match }: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      style={{
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        marginBottom: 10,
        backgroundColor: theme.colors.card,
      }}
      onPress={() =>
        navigation.navigate("MatchSingle", {
          matchId: match.id,
        })
      }
    >
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        {match.homeTeam} vs {match.awayTeam}
      </Text>

      {match.status === "live" && (
        <Text style={{ color: theme.colors.danger }}>
          🔴 LIVE {match.homeScore} - {match.awayScore}
        </Text>
      )}

      {match.status === "finished" && (
        <Text style={{ color: theme.colors.primary }}>
          FT {match.homeScore} - {match.awayScore}
        </Text>
      )}

      {match.status === "upcoming" && match.startTime && (
        <Text style={{ color: theme.colors.secondary }}>
          {new Date(match.startTime).toLocaleTimeString()}
        </Text>
      )}
    </TouchableOpacity>
  );
};
