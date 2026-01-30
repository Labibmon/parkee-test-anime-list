// import ProductDetail from "@/app/_components/ProductDetail";

import AnimeDetail from "@/app/_components/features/AnimeDetail";

interface AnimeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function AnimeDetailPage({
  params,
}: AnimeDetailPageProps) {
  const { id } = await params;

  return (
    <main>
      <AnimeDetail id={id} />
    </main>
  );
}
