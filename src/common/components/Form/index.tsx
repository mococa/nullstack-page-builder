import { HTMLAttributes } from 'nullstack';
import './styles.scss';

export namespace FormProps {
  export interface Input extends HTMLAttributes<HTMLInputElement> {
    label: string;
  }
  export interface Button extends HTMLAttributes<HTMLButtonElement> {}
}

export const MococaForm = {
  Input: ({ label, ...props }: FormProps.Input) => (
    <label class="mococa-input">
      <span>{label}</span>

      <input {...props} />
    </label>
  ),
  Button: ({ ...props }: FormProps.Button) => (
    <button class="mococa-button" {...props}>
      {props.children}
    </button>
  ),
};
