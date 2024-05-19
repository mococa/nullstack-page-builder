import { Hello as Component } from './Hello';
import { Form } from './Form';
import { Mococa } from '@types';

export const Hello: Mococa.Component = {
  name: 'Hello text',
  component: Component as unknown as ({}) => JSX.Element,
  form: Form as unknown as ({}) => JSX.Element,
  defaultValues: { name: 'Amazing!' },
};
