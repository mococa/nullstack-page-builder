import Nullstack, { NullstackClientContext } from 'nullstack';
import './styles.scss';

interface Props {
  values: { name: string };
}

export class Hello extends Nullstack<Props> {
  render({ values }: NullstackClientContext<Props>) {
    return <h1 class="hello-text">Hello, {values.name}</h1>;
  }
}
