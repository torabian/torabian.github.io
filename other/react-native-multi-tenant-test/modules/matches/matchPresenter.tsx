export const matchPresenter = (match: any) => {
  if (!match) return null;

  const v = (x?: any) => x ?? "-";

  return {
    header: {
      competition: v(match.competition),
      teams: `${v(match.homeTeam)} vs ${v(match.awayTeam)}`,
      score: `${v(match.homeScore)} : ${v(match.awayScore)}`,
      live:
        match.status === "live"
          ? `🔴 LIVE ${v(match.minute)}'`
          : v(match.status),
    },

    info: {
      kickoff: v(match.kickoff),
      stadium: v(match.stadium),
      status: v(match.status),
    },

    stats: [
      {
        title: "Possession",
        home: v(match.statistics?.possessionHome),
        away: v(match.statistics?.possessionAway),
      },
      {
        title: "Shots",
        home: v(match.statistics?.shotsHome),
        away: v(match.statistics?.shotsAway),
      },
      {
        title: "Corners",
        home: v(match.statistics?.cornersHome),
        away: v(match.statistics?.cornersAway),
      },
      {
        title: "Yellow Cards",
        home: v(match.statistics?.yellowHome),
        away: v(match.statistics?.yellowAway),
      },
    ],

    odds: [
      { title: "Home", value: v(match.odds?.home) },
      { title: "Draw", value: v(match.odds?.draw) },
      { title: "Away", value: v(match.odds?.away) },
    ],

    events: match.events ?? [],
  };
};
