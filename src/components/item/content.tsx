import * as React from 'react';
import Frame from './frame';

export default function Content({ markup }: { markup: string }) {
  return <Frame markup={markup} />
}
