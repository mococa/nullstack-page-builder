import { NullstackNode } from 'nullstack';
import './styles.scss';

interface Props {
  ref: HTMLDialogElement;
  name: string;
  children: NullstackNode;
}

export const ComponentFormDialog = ({ ref, name, children }: Props) => (
  <dialog class="component-form-dialog" ref={ref}>
    <b>{name}</b>

    {children}
  </dialog>
);
