import Nullstack from 'nullstack';

import { Mococa } from '@types';

export class ElementsInstances extends Nullstack {
  elements: Mococa.BuildComponent[] = [];
  selected_element: string;

  prepare(props) {
    console.log({ props });
  }
}
