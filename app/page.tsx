import AnimeList from "./_components/features/AnimeList";
import AnimeTrending from "./_components/features/AnimeTrending";

export default function Home() {
  return (
    <main className="">
      <AnimeTrending />
      <AnimeList />
    </main>
  );
}
