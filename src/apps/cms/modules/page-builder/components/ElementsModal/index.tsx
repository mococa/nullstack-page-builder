import Nullstack, { NullstackClientContext } from 'nullstack';
import { Mococa } from '@types';
import { components } from '@custom/elements';
import './styles.scss';
import { default_elements } from '@common/instances/@constants/default_elements';

type Props = Partial<{
  onadd: (component: Mococa.Component) => void;
  ref: HTMLDialogElement;
}>;

export class ElementsModal extends Nullstack<Props> {
  render({ ref, onadd, instances }: Props & NullstackClientContext) {
    const { elements } = instances.pagebuilder;

    return (
      <dialog class="elements-modal" ref={ref}>
        <h1>Insert element</h1>

        {[...default_elements, ...components]
          .filter(({ name }) => {
            return elements.elements.length === 0
              ? name === 'Page'
              : name !== 'Page';
          })
          .map(component => (
            <button
              onclick={() => {
                onadd(component);
              }}
            >
              {component.name}
            </button>
          ))}
      </dialog>
    );
  }
}
