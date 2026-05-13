import { Route, Routes } from 'react-router-dom';
import { GamesPage } from './pages/GamesPage';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="min-h-screen bg-background-white p-xl">
            <h1 className="text-text-primary text-28 font-700 leading-32">강의</h1>
            <p className="text-text-secondary text-14 leading-16 mt-md">
              Vite 6 + React 19 + Tailwind v4 + Storybook 8
            </p>
          </main>
        }
      />
      <Route path="/page" element={<GamesPage />} />
    </Routes>
  );
}
