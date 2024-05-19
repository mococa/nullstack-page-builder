import { Mococa } from '@types';

export function filter_out_element_by_id(
  components: Mococa.BuildComponent[],
  id: string,
) {
  return components
    .filter(component => component.id !== id)
    .map(component => ({
      ...component,
      children: component.children
        ? filter_out_element_by_id(component.children, id)
        : undefined,
    }));
}
