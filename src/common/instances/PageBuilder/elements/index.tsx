import Nullstack, { NullstackClientContext } from 'nullstack';

import { Mococa } from '@types';

export class ElementsInstances extends Nullstack {
  elements: Mococa.BuildComponent[] = [];
  selected_element: string;
  last_selected_element: string;

  prepare(context: NullstackClientContext) {
    context.instances.pagebuilder.elements = this;
  }

  update() {
    if (this.elements.length === 0) {
      this.selected_element = null;
    }
  }
}
