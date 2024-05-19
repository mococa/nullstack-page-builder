import Nullstack, { NullstackClientContext } from 'nullstack';
import { Mococa } from '@types';
import { MococaForm } from '@common/components/Form';

interface Props extends Mococa.FormProps {
  defaultValues: Record<string, unknown>;
}

export class Form extends Nullstack<Props> {
  values: { name: string };

  prepare({ defaultValues }: NullstackClientContext<Props>) {
    Object.keys(defaultValues).forEach(key => {
      if (this.values) return;
      if (!this.values) this.values = {} as typeof this.values;

      this.values[key] = defaultValues[key];
    });
  }

  render({ onsubmit }: NullstackClientContext<Props>) {
    return (
      <form
        class="mococa-form"
        onsubmit={() => {
          onsubmit({ values: { name: this.values.name } });
        }}
      >
        <MococaForm.Input label="Name" bind={this.values.name} />

        <MococaForm.Button type="submit">Update</MococaForm.Button>
      </form>
    );
  }
}
