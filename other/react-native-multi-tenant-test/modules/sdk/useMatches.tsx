import { useQuery } from "@tanstack/react-query";
import { matchService } from "./match-services";

export const useMatches = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: matchService.getMatches,
    staleTime: 30 * 1000,
  });
};
