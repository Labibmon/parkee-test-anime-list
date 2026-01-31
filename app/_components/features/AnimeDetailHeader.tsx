"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

type AnimeDetailHeader = {
  imageBackground: string;
  imagePoster: string;
  titleEn: string;
  titleJpn: string;
};

const AnimeDetailHeader = ({
  imageBackground,
  imagePoster,
  titleEn,
  titleJpn,
}: AnimeDetailHeader) => {
  const router = useRouter();

  return (
    <Header>
      <Background $image={imageBackground} />
      <BackButton onClick={() => router.push("/")}>← Back</BackButton>
      <HeaderContent>
        <HeaderInside>
          <Poster src={imagePoster} alt={titleEn} />
          <Content>
            <Title>{titleEn}</Title>
            <SubTitle>{titleJpn}</SubTitle>
          </Content>
        </HeaderInside>
      </HeaderContent>
    </Header>
  );
};

export default AnimeDetailHeader;

const Header = styled.div`
  position: relative;
  height: 70vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
    min-height: 60vh;
    padding: 32px 0;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 4;

  background: #ffffff;
  color: #333333;
  border: none;
  border-radius: 999px;
  padding: 10px 14px;

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const Background = styled.div<{ $image?: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: 30% center;
  filter: grayscale(85%) brightness(0.5) contrast(1.25);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }

  @media (max-width: 768px) {
    background-position: 50% 0%;
    filter: grayscale(60%) brightness(0.55);
  }
`;

const Poster = styled.img`
  width: 280px;
  height: 360px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 180px;
    height: 260px;
  }
`;

const HeaderInside = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: auto;

  display: flex;
  gap: 34px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 0 16px;
  }
`;

const HeaderContent = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
  color: #ffffff;

  font-size: 48px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 24px;
    white-space: normal;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

const SubTitle = styled.p`
  color: #ffffff;
  font-size: 32px;
  padding: 0 8px 8px;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0;
  }
`;
