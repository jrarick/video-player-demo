import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import VideoPlayerWrapper from './components/VideoPlayerWrapper';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-slate-800 flex items-center justify-center">
        <VideoPlayerWrapper />
      </div>
    </QueryClientProvider>
  );
}

export default App;
