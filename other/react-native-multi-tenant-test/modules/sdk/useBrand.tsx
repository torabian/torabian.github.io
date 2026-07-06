import { useQuery } from "@tanstack/react-query";
import { BrandId, matchService } from "./match-services";
import { useBrand } from "../core/brand/Brand";

export const useBrandContent = () => {
  const { brand } = useBrand();

  return useQuery({
    queryKey: ["matches", brand],
    queryFn: () => matchService.getBrand(brand as BrandId),
    staleTime: 30 * 1000,
  });
};
