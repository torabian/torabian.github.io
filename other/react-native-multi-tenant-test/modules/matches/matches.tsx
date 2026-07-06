import { FootballMatch } from "./MatchCard.types";

export const filterMatches = (
  matches: FootballMatch[],
  filter: "live" | "upcoming" | "finished" | "all",
) => {
  if (filter === "all") return matches;
  return matches.filter((m) => m.status === filter);
};
