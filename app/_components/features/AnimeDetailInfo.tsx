"use client";

import styled from "styled-components";

type AnimeDetailInfo = {
  averageRating: string | null;
  userCount: number;
  synopsis: string;
  subtype: string;
  episodeCount: number;
  startDate: string;
  endDate: string;
};

const AnimeDetailInfo = ({
  averageRating,
  userCount,
  synopsis,
  subtype,
  episodeCount,
  startDate,
  endDate,
}: AnimeDetailInfo) => {
  return (
    <InfoContainer>
      <Rating>
        <h3>SCORE</h3>
        <h4>{averageRating}</h4>
        <h3>{userCount} Users</h3>
      </Rating>
      <InfoContent>
        <InfoTitle>Synopsis</InfoTitle>
        <InfoSynopsis>{synopsis}</InfoSynopsis>
        <MetaGrid>
          <MetaItem>
            <MetaLabel>Subtype</MetaLabel>
            <MetaValue>{subtype ?? "-"}</MetaValue>
          </MetaItem>

          <MetaItem>
            <MetaLabel>Episodes</MetaLabel>
            <MetaValue>{episodeCount ?? "?"}</MetaValue>
          </MetaItem>

          <MetaItem>
            <MetaLabel>Start Date</MetaLabel>
            <MetaValue>{startDate ?? "-"}</MetaValue>
          </MetaItem>

          <MetaItem>
            <MetaLabel>End Date</MetaLabel>
            <MetaValue>{endDate ?? "Ongoing"}</MetaValue>
          </MetaItem>
        </MetaGrid>
      </InfoContent>
    </InfoContainer>
  );
};

export default AnimeDetailInfo;

const InfoContainer = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: auto;
  padding: 24px 16px;

  display: flex;
  gap: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoContent = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
`;

const InfoTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    text-align: center;
    font-size: 20px;
  }
`;

const InfoSynopsis = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: justify;
  }
`;

const Rating = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;

  h4 {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    width: 8rem;
    height: 8rem;

    h4 {
      font-size: 32px;
    }
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 80px;
`;

const MetaItem = styled.div<{ $full?: boolean }>`
  ${({ $full }) => $full && "grid-column: 1 / -1;"}
`;

const MetaLabel = styled.p`
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 4px;
`;

const MetaValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`;
