import { FootballMatch } from "../matches/MatchCard.types";
export const matchesList: FootballMatch[] = [
  {
    id: "1",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    competition: "Premier League",
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    minute: null,
    stadium: "Emirates Stadium",
    kickoff: "2026-06-30 18:00",
    statistics: {
      possessionHome: "54%",
      possessionAway: "46%",
      shotsHome: 11,
      shotsAway: 9,
      cornersHome: 5,
      cornersAway: 3,
      yellowHome: 1,
      yellowAway: 2,
    },
    odds: {
      home: "2.10",
      draw: "3.30",
      away: "3.80",
    },
    events: [
      { icon: "⚽", text: "Saka 22'" },
      { icon: "🟨", text: "James 40'" },
      { icon: "⚽", text: "Jesus 71'" },
    ],
  },

  {
    id: "2",
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    competition: "La Liga",
    status: "live",
    homeScore: 1,
    awayScore: 1,
    minute: 68,
    stadium: "Camp Nou",
    kickoff: "2026-06-30 19:30",
    statistics: {
      possessionHome: "61%",
      possessionAway: "39%",
      shotsHome: 10,
      shotsAway: 7,
      cornersHome: 6,
      cornersAway: 2,
      yellowHome: 1,
      yellowAway: 1,
    },
    odds: {
      home: "2.40",
      draw: "3.25",
      away: "2.95",
    },
    events: [
      { icon: "⚽", text: "Lewandowski 15'" },
      { icon: "⚽", text: "Bellingham 55'" },
    ],
  },

  {
    id: "3",
    homeTeam: "Liverpool",
    awayTeam: "Manchester City",
    competition: "Premier League",
    status: "upcoming",
    minute: null,
    stadium: "Anfield",
    kickoff: "2026-06-30 21:00",
    odds: {
      home: "2.50",
      draw: "3.40",
      away: "2.60",
    },
    events: [],
  },

  {
    id: "4",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    competition: "Bundesliga",
    status: "finished",
    homeScore: 3,
    awayScore: 2,
    minute: null,
    stadium: "Allianz Arena",
    kickoff: "2026-06-29 17:00",
    statistics: {
      possessionHome: "58%",
      possessionAway: "42%",
      shotsHome: 15,
      shotsAway: 11,
      cornersHome: 7,
      cornersAway: 4,
      yellowHome: 2,
      yellowAway: 3,
    },
    odds: {
      home: "1.95",
      draw: "3.60",
      away: "3.90",
    },
    events: [
      { icon: "⚽", text: "Kane 12'" },
      { icon: "⚽", text: "Reus 33'" },
      { icon: "⚽", text: "Musiala 78'" },
    ],
  },

  {
    id: "5",
    homeTeam: "PSG",
    awayTeam: "Marseille",
    competition: "Ligue 1",
    status: "live",
    homeScore: 0,
    awayScore: 0,
    minute: 41,
    stadium: "Parc des Princes",
    kickoff: "2026-06-30 20:00",
    statistics: {
      possessionHome: "63%",
      possessionAway: "37%",
      shotsHome: 6,
      shotsAway: 3,
      cornersHome: 4,
      cornersAway: 1,
      yellowHome: 0,
      yellowAway: 1,
    },
    odds: {
      home: "1.80",
      draw: "3.50",
      away: "4.50",
    },
    events: [],
  },

  {
    id: "6",
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    competition: "Serie A",
    status: "upcoming",
    minute: null,
    stadium: "Allianz Stadium",
    kickoff: "2026-07-01 18:45",
    odds: {
      home: "2.20",
      draw: "3.20",
      away: "3.10",
    },
    events: [],
  },
];
const branding = {
  iranbet: {
    background: require("./iranbet.png"),
    themes: {
      light: {
        colors: {
          background: "#F7FAF8",
          card: "#ECF5F0",
          text: "#102117",
          primary: "#166534", // dark green
          border: "#CFE3D8",
          danger: "#DC2626",
          secondary: "#6B7280",
        },
        spacing: {
          xs: 4 * 2,
          sm: 8 * 2,
          md: 12 * 2,
          lg: 16 * 2,
        },
        radius: {
          sm: 6,
          md: 10,
          lg: 16,
        },
      },
      dark: {
        colors: {
          background: "#08120D",
          card: "#12211A",
          text: "#F8FAFC",
          primary: "#22C55E", // emerald
          border: "#244235",
          danger: "#EF4444",
          secondary: "#9CA3AF",
        },
        spacing: {
          xs: 4 * 2,
          sm: 8 * 2,
          md: 12 * 2,
          lg: 16 * 2,
        },
        radius: {
          sm: 6,
          md: 10,
          lg: 16,
        },
      },
    },
  },

  polbet: {
    background: require("./polbet.png"),
    themes: {
      light: {
        colors: {
          background: "#FFF8F8",
          card: "#FCEEEE",
          text: "#2B1114",
          primary: "#C1121F", // Polish crimson
          border: "#F2CACA",
          danger: "#DC2626",
          secondary: "#6B7280",
        },
        spacing: {
          xs: 4,
          sm: 8,
          md: 12,
          lg: 16,
        },
        radius: {
          sm: 6,
          md: 10,
          lg: 16,
        },
      },
      dark: {
        colors: {
          background: "#15090B",
          card: "#261114",
          text: "#FFFFFF",
          primary: "#EF4444", // vivid red
          border: "#4A2227",
          danger: "#F87171",
          secondary: "#9CA3AF",
        },
        spacing: {
          xs: 4,
          sm: 8,
          md: 12,
          lg: 16,
        },
        radius: {
          sm: 6,
          md: 10,
          lg: 16,
        },
      },
    },
  },
} as const;

export type BrandId = keyof typeof branding; // "iranbet" | "polbet"

export const matchService = {
  getMatches: async () => {
    await new Promise((r) => setTimeout(r, 400));

    return matchesList;
  },

  getMatchById: async (id: string) => {
    await new Promise((r) => setTimeout(r, 400));

    return matchesList.find((item) => item.id === id);
  },
  getBrand: async (id: BrandId) => {
    await new Promise((r) => setTimeout(r, 400));

    return branding[id];
  },
  getBrands: async () => {
    await new Promise((r) => setTimeout(r, 400));

    return [
      {
        id: "iranbet",
        flag: "🇮🇷",
        description: "Iran Edition",
      },
      {
        id: "polbet",
        flag: "🇵🇱",
        description: "Poland Edition",
      },
    ];
  },
};
