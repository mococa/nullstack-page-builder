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
    weight: 'normal',
    align: 'left',
    content: 'New text',
    color: '#000000',
    size: '24px',
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
        <MococaForm.TextArea label="Content" bind={this.values.content} />

        <MococaForm.Input label="Size" bind={this.values.size} />

        <MococaForm.Input label="Color" bind={this.values.color} />

        <MococaForm.SegmentControl
          label="Weight"
          bind={this.values.weight}
          style="grid-template-columns: none; gap: 6px;"
          options={[
            {
              id: 'thin',
              label: <span style="font-weight: lighter;">Thin</span>,
            },
            { id: 'normal', label: 'Normal' },
            { id: 'medium', label: 'Medium' },
            { id: 'bold', label: <b>Bold</b> },
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
