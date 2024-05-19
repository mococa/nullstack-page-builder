import { Mococa } from '@types';
import { components } from '@custom/elements';
import './styles.scss';

interface Props {
  ref: HTMLDialogElement;
  onadd: (component: Mococa.Component) => void;
}

export const ElementsModal = ({ ref, onadd }: Props) => (
  <dialog class="elements-modal" ref={ref}>
    <h1>Insert element</h1>

    {components.map(component => (
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
