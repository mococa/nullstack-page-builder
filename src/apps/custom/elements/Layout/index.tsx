import { Mococa } from '@types';
import { Form } from './Form';
import { Layout as Component } from './Layout';

export const Layout = {
  component: Component,
  defaultValues: {
    direction: 'horizontal',
    columns: '2',
    wrap: 'wrap',
    align: 'left',
  },
  form: props => <Form {...props} />,
  name: 'Layout',
  children: [],
} as unknown as Mococa.Component;
