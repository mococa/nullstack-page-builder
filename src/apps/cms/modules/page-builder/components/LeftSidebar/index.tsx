import Nullstack, { NullstackClientContext } from 'nullstack';

import { SegmentControl } from '@common/components/SegmentControl';
import { SidebarTree } from '../../recursive/SidebarTree';

export class LeftSidebar extends Nullstack {
  view = 'elements';

  renderContent({ instances }: Partial<NullstackClientContext>) {
    const { pagebuilder } = instances;
    const { elements } = pagebuilder.elements;

    const views = {
      elements: (
        <ul class="sidebar-tree">
          {elements.map(component => (
            <SidebarTree component={component} />
          ))}
        </ul>
      ),
    };

    if (views[this.view]) return views[this.view];

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
