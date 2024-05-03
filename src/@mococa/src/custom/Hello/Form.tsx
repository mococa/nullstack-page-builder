import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack';
import { Mococa } from '../@types';
import { MococaForm } from '_@mococa/src/components/Form';

interface Props extends Mococa.FormProps {
  defaultValues: Record<string, unknown>;
}

export class Form extends Nullstack<Props> {
  name: string;

  prepare({ defaultValues }: NullstackClientContext<Props>) {
    Object.keys(defaultValues).forEach(key => {
      this[key] = defaultValues[key];
    });
  }

  render({ onsubmit }: NullstackClientContext<Props>) {
    return (
      <form
        onsubmit={() => {
          onsubmit({ values: { name: this.name } });
        }}
      >
        <MococaForm.Input label="Name" bind={this.name} />

        <MococaForm.Button type="submit">Save</MococaForm.Button>
      </form>
    );
  }
}
