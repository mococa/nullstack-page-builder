import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack';
import { merge } from 'lodash';

import { flatten_elements } from '@cms/modules/page-builder/utils/flatten_elements';

export class RightSidebar extends Nullstack {
  renderElementForm({ instances }: Partial<NullstackClientContext>) {
    const { elements, selected_element } = instances.pagebuilder.elements;
    if (!selected_element) return null;

    const all_elements = flatten_elements(elements);

    const element = all_elements.find(({ id }) => id === selected_element);
    if (!element) return null;

    const { form: Form, defaultValues, values } = element;

    const form_props = {
      defaultValues: merge({}, defaultValues, values),
      onsubmit: ({ values }) => (element.values = values),
    };

    return (
      <section>
        <b>{element.name}</b>

        <Form {...form_props} />
      </section>
    );
  }

  render() {
    return (
      <aside class="page-builder-sidebar">
        {/*  */}
        {this.renderElementForm({})}
      </aside>
    );
  }
}
