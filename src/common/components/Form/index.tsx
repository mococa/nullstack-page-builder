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

  export interface Textarea extends HTMLAttributes<HTMLTextAreaElement> {
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
  TextArea: ({ label, style, ...props }: FormProps.Textarea) => (
    <label class="mococa-textarea" style={style}>
      <span>{label}</span>

      <textarea rows={4} {...props} />
    </label>
  ),
  Button: ({ ...props }: FormProps.Button) => (
    <button class="mococa-button" {...props}>
      {props.children}
    </button>
  ),
  SegmentControl: ({ label, style, ...props }: FormProps.SegmentControl) => (
    <div class="mococa-segment-control" style={style}>
      <span>{label}</span>

      <SegControl {...props} />
    </div>
  ),
};
