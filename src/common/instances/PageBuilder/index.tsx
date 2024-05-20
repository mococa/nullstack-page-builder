import Nullstack, { NullstackClientContext } from 'nullstack';

import { ElementsInstances } from './elements';

export class PageBuilderInstance extends Nullstack {
  elements: ElementsInstances;
  previewing: boolean;

  initiate({ instances }: NullstackClientContext) {
    instances.pagebuilder.elements = this.elements;
  }

  render() {
    return (
      <ElementsInstances persistent onref={ref => (this.elements = ref)} />
    );
  }
}
