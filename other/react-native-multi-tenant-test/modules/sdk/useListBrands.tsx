import { useQuery } from "@tanstack/react-query";
import { matchService } from "./match-services";

export const useListBrands = () => {
  return useQuery({
    queryKey: ["listBrands"],
    queryFn: matchService.getBrands,
    staleTime: 30 * 1000,
  });
};
