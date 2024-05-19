import { HTMLAttributes } from 'nullstack';
import {
  SegmentControl as SegControl,
  SegmentControlProps,
} from '../SegmentControl';
import './styles.scss';

export namespace FormProps {
  export interface Input extends HTMLAttributes<HTMLInputElement> {
    label: string;
  }
  export interface Button extends HTMLAttributes<HTMLButtonElement> {}

  export interface SegmentControl extends SegmentControlProps {
    label: string;
  }
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
  SegmentControl: ({ label, ...props }: FormProps.SegmentControl) => (
    <div class="mococa-segment-control">
      <span>{label}</span>

      <SegControl {...props} />
    </div>
  ),
};
