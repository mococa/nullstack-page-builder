import Nullstack, { NullstackClientContext } from 'nullstack';
import { Mococa } from '@types';
import { MococaForm } from '@common/components/Form';

interface Props extends Mococa.FormProps {
  defaultValues: Record<string, unknown>;
}

export class Form extends Nullstack<Props> {
  values = {
    name: 'John',
    title: 'Creative Technologist',
    about:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    img: 'https://personal-ui-blog-template.vercel.app/img/profile.png',
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
        <MococaForm.Input label="Name" bind={this.values.name} />
        <MococaForm.Input label="Title" bind={this.values.title} />
        <MococaForm.TextArea label="About" bind={this.values.about} rows={12} />
        <MococaForm.Input label="Image URL" bind={this.values.img} />
      </form>
    );
  }
}
