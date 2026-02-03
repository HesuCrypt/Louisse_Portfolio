import React from 'react';
import { Container } from './Container';

export const Divider: React.FC = () => {
  return (
    <Container>
      <hr className="border-t border-neutral-900/80 my-2" />
    </Container>
  );
};