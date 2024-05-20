import Nullstack, { NullstackClientContext } from 'nullstack';
import { Mococa } from '@types';
import { MococaForm } from '@common/components/Form';

interface Props extends Mococa.FormProps {
  defaultValues: Record<string, unknown>;
}

export class Form extends Nullstack<Props> {
  values = {
    section_title: 'Contact',
    title: 'Want to reach out?',
    subtitle:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
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

  render({ onsubmit }: NullstackClientContext<Props>) {
    return (
      <form
        class="mococa-form"
        onsubmit={() => onsubmit({ values: this.values })}
      >
        <MococaForm.Input
          label="Section Title"
          bind={this.values.section_title}
        />
        <MococaForm.Input label="Title" bind={this.values.title} />
        <MococaForm.TextArea
          label="Subtitle"
          bind={this.values.subtitle}
          rows={8}
        />
      </form>
    );
  }
}
