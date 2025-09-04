import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = styled.div<Omit<SkeletonProps, "children">>`
  display: block;
  position: relative;
  margin-top: 0.5px;
  margin-bottom: 0.5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    #c6c6c6 0%,
    #d2d2d2 25%,
    #e6e6e6 50%,
    #d2d2d2 75%,
    #c6c6c6 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 3s linear infinite;
`;

export default Skeleton;
