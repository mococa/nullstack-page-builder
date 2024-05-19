import { Mococa } from '@types';
import { flatMapDeep } from 'lodash';

export const flatten_elements = (components: Mococa.BuildComponent[]) => {
  return flatMapDeep(components, component => [
    component,
    ...(component.children ? flatten_elements(component.children) : []),
  ]);
};
