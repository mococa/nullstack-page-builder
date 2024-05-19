import Nullstack, { NullstackClientContext } from 'nullstack';

import { Mococa } from '@types';

interface Props {
  onref: (ref: ElementsInstances) => void;
}

export class ElementsInstances extends Nullstack<Props> {
  elements: Mococa.BuildComponent[] = [];
  selected_element: string;

  prepare(context: NullstackClientContext<Props>) {
    context.onref(this);
  }

  update() {
    if (this.elements.length === 0) {
      this.selected_element = null;
    }
  }
}
