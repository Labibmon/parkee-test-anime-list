"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import CardSkeleton from "../shared/CardSekeleton";
import Card from "../shared/Card";
import { Anime } from "@/app/_types/kitsu.types";

// type Anime = {
//   id: string;
//   attributes: {
//     canonicalTitle: string;
//     posterImage?: {
//       small?: string;
//       medium?: string;
//       large?: string;
//     };
//     averageRating?: string;
//   };
// };

const AnimeList = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: itemsPerPage.toString(),
          offset: (page * itemsPerPage).toString(),
        });

        const res = await fetch(`/api/anime?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to fetch anime");
        }

        const data = await res.json();

        if (active) {
          setAnime(data.anime ?? []);
        }
      } catch (err) {
        if (active) {
          setError("Something went wrong");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchAnime();

    return () => {
      active = false;
    };
  }, [page, itemsPerPage]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-5">
      {error && <p className="text-red-500">{error}</p>}

      <AnimeGrid>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <CardSkeleton key={`skeleton-${page}-${i}`} />
            ))
          : anime.map((item: Anime) => <Card anime={item} key={item.id} />)}
      </AnimeGrid>

      {/* Pagination */}
      <div className="flex justify-center gap-4 pt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimeList;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 24px;
`;
