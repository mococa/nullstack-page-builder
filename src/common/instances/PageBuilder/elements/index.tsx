import Nullstack from 'nullstack';

import { Mococa } from '@types';
import { stringify } from 'uuid';

interface BuildComponent extends Mococa.Component {
  id: string;
  values: Mococa.Component['defaultValues'];
}

export class ElementsInstances extends Nullstack {
  elements: BuildComponent[] = [];
  selected_element: string;

  prepare(props) {
    console.log({props})
  }
}
