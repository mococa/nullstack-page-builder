import Nullstack, { NullstackClientContext } from 'nullstack';

interface Props {
  values: { name: string };
}

export class Hello extends Nullstack<Props> {
  render({ values }: NullstackClientContext<Props>) {
    return <h1>Hello, {values.name}</h1>;
  }
}
