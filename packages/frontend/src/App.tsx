import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GalaxyMap } from "./GalaxyMap";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GalaxyMap />
    </QueryClientProvider>
    )
}

export default App
