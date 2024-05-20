import Nullstack, { NullstackClientContext } from 'nullstack';
import { flatMap, keyBy } from 'lodash';

import { Mococa } from '@types';
import { components } from '@custom/elements';

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

  copy() {
    const flatten_elements = flatten_with_parent_id(this.elements);
    const copy = JSON.stringify(flatten_elements);
    navigator.clipboard.writeText(copy);
    alert('Elements copied to clipboard');
  }

  async save() {
    if (
      !confirm(
        'Feature not build yet.\nDo you want to copy elements to the clipboard?\nYou will be able to paste it into a board',
      )
    )
      return;

    this.copy();
  }

  load({ stringified_json }: { stringified_json: string }) {
    const flat_elements = JSON.parse(
      stringified_json,
    ) as Mococa.BuildComponent[];

    // Adding JSX back based on the component name
    const all_elements = flat_elements.map(element => {
      const component = components.find(({ name }) => name === element.name);

      return { ...component, ...element };
    });

    // Creating map for construct tree hierarchy
    const elements_map = new Map<string, Mococa.BuildComponent>();

    // Populating map
    all_elements.forEach(({ id, ...element }) => {
      const children = element.allowChildren ? [] : undefined;

      return elements_map.set(id, { ...element, id, children });
    });

    // Reconstructing hierarchy
    const root_elements: Mococa.BuildComponent[] = [];

    all_elements.forEach(element => {
      const { parentId } = element;
      const current = elements_map.get(element.id);

      if (!parentId) return root_elements.push(current);

      const parent = elements_map.get(parentId);
      if (!parent) return;

      if (!parent.children) return (parent.children = [current]);
      parent.children.push(current);
    });

    this.elements = root_elements;
  }
}

const flatten_with_parent_id = (
  elements: Mococa.BuildComponent[],
  parentId?: string,
) => {
  return flatMap(elements, ({ children, component, form, id, ...rest }) => {
    const elementWithParent = { ...rest, id, parentId };

    if (children && children.length > 0) {
      return [elementWithParent, ...flatten_with_parent_id(children, id)];
    }

    return [elementWithParent];
  });
};
