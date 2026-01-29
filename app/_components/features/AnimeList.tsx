"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import CardSkeleton from "../shared/CardSekeleton";
import Card from "../shared/Card";
import { Anime, AnimeMeta } from "@/app/_types/kitsu.types";
import Pagination from "../shared/Pagination";
import ItemsPerPage from "../shared/ItemsPerPage";

const AnimeList = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [metaAnime, setMetaAnime] = useState<AnimeMeta | null>(null);
  const [page, setPage] = useState(1); // ✅ 1-based page
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * itemsPerPage;

        const params = new URLSearchParams({
          limit: itemsPerPage.toString(),
          offset: offset.toString(),
        });

        const res = await fetch(`/api/anime?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to fetch anime");
        }

        const data = await res.json();

        if (active) {
          setAnime(data.anime ?? []);
          setMetaAnime(data.meta ?? null);
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

  const totalPages = metaAnime ? Math.ceil(metaAnime.count / itemsPerPage) : 0;

  /* =========================
     Handlers
     ========================= */

  const onPageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const onItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1); // ✅ reset to first page
  };

  return (
    <Wrapper>
      <Header>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <ItemsPerPage value={itemsPerPage} onChange={onItemsPerPageChange} />
      </Header>

      {error && <ErrorText>{error}</ErrorText>}

      <AnimeGrid>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <CardSkeleton key={`skeleton-${page}-${i}`} />
            ))
          : anime.map((item) => <Card key={item.id} anime={item} />)}
      </AnimeGrid>
    </Wrapper>
  );
};

export default AnimeList;

/* =========================
   Styled Components
   ========================= */

const Wrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorText = styled.p`
  color: #ef4444;
  text-align: center;
`;
