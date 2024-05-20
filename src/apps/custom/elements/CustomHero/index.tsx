import { Mococa } from '@types';
import { Form } from './Form';
import { CustomHero as Component } from './CustomHero';

export const CustomHero = {
  name: 'Custom Hero Section',
  component: Component as unknown as ({}) => JSX.Element,
  form: props => <Form {...props} />,
  defaultValues: {
    name: 'Nulla Chan',
    title: "Nullstack's official waifu",
    about: [
      'A sweet and shy perfect waifu, is always hyperfocused in her studies but somehow distracted at the same time.',
      '',
      'She is always cheerful... until she has to face glue code or sees a post telling her which tech she should use.',
      '',
      'GitHub is her home and LinkedIn makes her depressed.',
    ].join('\n'),
    img: 'https://nullstack.app/illustrations/nulla-hero.webp',
  },
} as unknown as Mococa.Component;
