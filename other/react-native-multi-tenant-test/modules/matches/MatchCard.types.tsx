export type MatchStatus = "live" | "upcoming" | "finished";

export interface FootballMatch {
  id: string;

  competition: string;

  homeTeam: string;
  awayTeam: string;

  homeScore?: number;
  awayScore?: number;

  startTime?: string; // ISO date
  kickoff?: string;
  stadium?: string;

  status: MatchStatus;
  minute?: number | null;

  statistics?: MatchStatistics;

  odds?: MatchOdds;

  events?: MatchEvent[];
}

export interface MatchStatistics {
  possessionHome?: number | string;
  possessionAway?: number | string;

  shotsHome?: number;
  shotsAway?: number;

  shotsOnTargetHome?: number;
  shotsOnTargetAway?: number;

  cornersHome?: number;
  cornersAway?: number;

  foulsHome?: number;
  foulsAway?: number;

  yellowHome?: number;
  yellowAway?: number;

  yellowCardsHome?: number;
  yellowCardsAway?: number;

  redCardsHome?: number;
  redCardsAway?: number;
}

export interface MatchOdds {
  home?: string;
  draw?: string;
  away?: string;
}

export interface MatchEvent {
  minute?: string;
  team?: "home" | "away";
  player?: string;
  type?:
    | "goal"
    | "penalty"
    | "own-goal"
    | "yellow-card"
    | "red-card"
    | "substitution"
    | "var"
    | "injury"
    | "other";

  icon?: string;
  text: string;
}
