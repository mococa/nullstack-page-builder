import { Mococa } from '@types';
import { Form } from './Form';
import { Contact as Component } from './Contact';

export const Contact = {
  name: 'Custom Contact',
  component: Component as unknown as ({}) => JSX.Element,
  form: props => <Form {...props} />,
  defaultValues: {
    section_title: 'Contact',
    title: 'Want to reach out?',
    subtitle:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
  },
} as unknown as Mococa.Component;
