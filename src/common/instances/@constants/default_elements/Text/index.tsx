import { Mococa } from '@types';
import { Form } from './Form';
import { Text as Component } from './Text';

export const Text = {
  component: Component,
  defaultValues: {
    weight: 'normal',
    align: 'left',
    content: 'New text',
    color: '#000000',
    size: '24px',
  },
  form: props => <Form {...props} />,
  name: 'Text',
} as unknown as Mococa.Component;
