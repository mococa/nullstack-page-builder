import Nullstack, { NullstackClientContext } from 'nullstack';
import { Mococa } from '@types';
import { MococaForm } from '@common/components/Form';

interface Props extends Mococa.FormProps {
  defaultValues: Record<string, unknown>;
}

export class Form extends Nullstack<Props> {
  values: { name: string };

  update({ onsubmit }: NullstackClientContext<Props>) {
    onsubmit({ values: this.values });
  }

  prepare({ defaultValues }: NullstackClientContext<Props>) {
    Object.keys(defaultValues).forEach(key => {
      if (this.values) return;
      if (!this.values) this.values = {} as typeof this.values;

      this.values[key] = defaultValues[key];
    });
  }

  render() {
    return (
      <MococaForm.Input label="Name" bind={this.values.name} debounce={300} />
    );
  }
}
