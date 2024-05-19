import Nullstack, { NullstackClientContext } from 'nullstack';

import { Mococa } from '@types';

import { SegmentControl } from '@common/components/SegmentControl';
import { SidebarTree } from '../../recursive/SidebarTree';

export class LeftSidebar extends Nullstack {
  view = 'elements';

  renderContent({ instances }: Partial<NullstackClientContext>) {
    if (!this.hydrated) return null;
    const { pagebuilder } = instances;
    const { elements } = pagebuilder.elements;

    if (this.view === 'elements')
      return (
        <ul class="sidebar-tree">
          {elements.map(component => (
            <SidebarTree component={component} />
          ))}
        </ul>
      );

    return null;
  }

  render() {
    return (
      <aside class="page-builder-sidebar">
        <section>
          <SegmentControl
            bind={this.view}
            options={[
              { id: 'elements', label: 'Elements' },
              { id: 'layers', label: 'Layers' },
              { id: 'assets', label: 'Assets' },
            ]}
          />

          {this.renderContent({})}
        </section>
      </aside>
    );
  }
}
