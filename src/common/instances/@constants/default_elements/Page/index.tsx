import { Mococa } from '@types';
import { Form } from './Form';
import { Page as Component } from './Page';

export const Page = {
  component: Component,
  defaultValues: {
    background: '#ffffff',
  },
  form: props => <Form {...props} />,
  name: 'Page',
  children: [],
  allowChildren: true,
} as unknown as Mococa.Component;
