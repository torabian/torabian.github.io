import { useQuery } from "@tanstack/react-query";
import { matchService } from "./match-services";

export const useMatchDetails = (matchId: string) => {
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: () => matchService.getMatchById(matchId),
    enabled: !!matchId, // important: prevents running without id
    staleTime: 30 * 1000,
  });
};
