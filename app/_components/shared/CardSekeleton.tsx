import styled from "styled-components";
import Skeleton from "../shared/Skeleton";

export default function CardSekeleton() {
  return (
    <Card>
      <Skeleton height="220px" radius="12px" />
      <Content>
        <Skeleton height="14px" />
        <Skeleton height="12px" width="70%" />
      </Content>
    </Card>
  );
}

const Card = styled.div`
  background: #000000;
  border-radius: 12px;
  padding-bottom: 12px;
`;

const Content = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
