import Nullstack, { NullstackClientContext } from 'nullstack';

import { SegmentControl } from '@common/components/SegmentControl';

import { Assets } from '@cms/assets';

export class RightSidebar extends Nullstack {
  layout = {
    type: 'stack',
    direction: 'horizontal',
    columns: '2',
    wrap: 'wrap',
    align: 'left',
  };

  renderLayout() {
    return (
      <section>
        <b>Layout</b>

        <ul>
          <li>
            <span>Type</span>

            <SegmentControl
              bind={this.layout.type}
              options={[
                { id: 'stack', label: 'Stack' },
                { id: 'grid', label: 'Grid' },
              ]}
            />
          </li>

          <li>
            <span>Direction</span>

            <SegmentControl
              bind={this.layout.direction}
              options={[
                { id: 'horizontal', label: <Assets.Direction.horizontal /> },
                { id: 'vertical', label: <Assets.Direction.vertical /> },
              ]}
            />
          </li>

          <li>
            <span>Wrap</span>

            <SegmentControl
              bind={this.layout.wrap}
              options={[
                { id: 'wrap', label: 'Yes' },
                { id: 'no-wrap', label: 'No' },
              ]}
            />
          </li>

          <li>
            <span>Align</span>

            <SegmentControl
              bind={this.layout.align}
              options={[
                { id: 'left', label: <Assets.Align.horizontal.start /> },
                { id: 'center', label: <Assets.Align.horizontal.center /> },
                { id: 'right', label: <Assets.Align.horizontal.end /> },
              ]}
            />
          </li>
        </ul>
      </section>
    );
  }

  renderElementForm({ instances }: Partial<NullstackClientContext>) {
    if (!this.hydrated) return null;

    const { elements, selected_element } = instances.pagebuilder.elements;
    if (!selected_element) return null;

    const element = elements.find(({ id }) => id === selected_element);
    if (!element) return null;

    const { form: Form, defaultValues, values } = element;

    return (
      <section>
        <b>{element.name}</b>

        <small>
          <br />
        </small>

        <Form
          defaultValues={values || defaultValues}
          onsubmit={({ values }) => (element.values = values)}
        />
      </section>
    );
  }

  render() {
    return (
      <aside class="page-builder-sidebar">
        {this.renderLayout()}

        {this.renderElementForm({})}
      </aside>
    );
  }
}
