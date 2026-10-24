import React from 'react';
import { Container } from './Container';

/** Full-bleed hairline used to separate stacked page blocks. */
export const Divider: React.FC = () => (
  <Container>
    <hr className="my-2 border-t border-line" />
  </Container>
);
