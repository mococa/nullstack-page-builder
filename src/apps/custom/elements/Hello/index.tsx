import { Hello as Component } from './Hello';
import { Form } from './Form';
import { Mococa } from '@types';

export const Hello = {
  name: 'Hello text',
  component: Component as unknown as ({}) => JSX.Element,
  form: props => <Form {...props} />,
  defaultValues: { name: 'Amazing!' },
} as unknown as Mococa.Component;
