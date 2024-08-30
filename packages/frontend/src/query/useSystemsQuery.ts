import { useQuery } from "@tanstack/react-query";

export class System {
  symbol!: string;
  type!: string;
  x!: number;
  y!: number;
}


export const useSystemsQuery = () => useQuery<System[]>({
  queryKey: [],
  queryFn: async () => {
    const response = await fetch('/api/systems');
    const responseJson = await response.json();

    return responseJson
  } 
});
