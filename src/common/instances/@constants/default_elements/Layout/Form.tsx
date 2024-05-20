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
    direction: 'horizontal',
    wrap: 'wrap',
    align: 'left',
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
      <div class="mococa-form">
        <MococaForm.SegmentControl
          label="Direction"
          bind={this.values.direction}
          options={[
            { id: 'horizontal', label: <Assets.Direction.horizontal /> },
            { id: 'vertical', label: <Assets.Direction.vertical /> },
          ]}
        />

        <MococaForm.SegmentControl
          label="Wrap"
          bind={this.values.wrap}
          options={[
            { id: 'wrap', label: 'Yes' },
            { id: 'no-wrap', label: 'No' },
          ]}
        />

        <MococaForm.SegmentControl
          label="Align"
          bind={this.values.align}
          options={[
            { id: 'left', label: <Assets.Align.horizontal.start /> },
            { id: 'center', label: <Assets.Align.horizontal.center /> },
            { id: 'right', label: <Assets.Align.horizontal.end /> },
          ]}
        />
      </div>
    );
  }
}
