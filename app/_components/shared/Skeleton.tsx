import styled, { keyframes } from "styled-components";

type Props = {
  width?: string;
  height?: string;
  radius?: string;
};

export default function Skeleton({
  width = "100%",
  height = "16px",
  radius = "8px",
}: Props) {
  return <SkeletonBox $width={width} $height={height} $radius={radius} />;
}

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonBox = styled.div<{
  $width: string;
  $height: string;
  $radius: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius }) => $radius};
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e5e5e5 37%,
    #f0f0f0 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;
