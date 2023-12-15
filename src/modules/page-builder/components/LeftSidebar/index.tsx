import Nullstack from 'nullstack';

import { SegmentControl } from '_common/components/SegmentControl';

export class LeftSidebar extends Nullstack {
  view = 'pages';

  render() {
    return (
      <aside class="page-builder-sidebar">
        <section>
          <SegmentControl
            bind={this.view}
            options={[
              { id: 'pages', label: 'Pages' },
              { id: 'layers', label: 'Layers' },
              { id: 'assets', label: 'Assets' },
            ]}
          />
        </section>
      </aside>
    );
  }
}
