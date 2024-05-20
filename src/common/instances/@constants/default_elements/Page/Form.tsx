import Nullstack, { NullstackClientContext } from 'nullstack';
import { Mococa } from '@types';
import { SegmentControl } from '@common/components/SegmentControl';
import { Assets } from '@cms/assets';
import { MococaForm } from '@common/components/Form';

interface Props extends Mococa.FormProps {
  defaultValues: Record<string, unknown>;
}

export class Form extends Nullstack<Props> {
  values = {
    background: '#ffffff',
  };

  update({ onsubmit }: NullstackClientContext<Props>) {
    onsubmit({ values: this.values });
  }

  prepare({ defaultValues }: NullstackClientContext<Props>) {
    Object.keys(defaultValues).forEach(key => {
      if (!this.values) this.values = {} as typeof this.values;

      this.values[key] = defaultValues[key];
    });
  }

  render() {
    return (
      <form class="mococa-form">
        <MococaForm.Input
          label="Background color"
          bind={this.values.background}
          debounce={400}
        />
      </form>
    );
  }
}
