import { NullstackNode } from 'nullstack';

export namespace Mococa {
  export interface ComponentProps {
    values: Record<string, unknown>;
  }

  export interface FormProps {
    onsubmit: (props: ComponentProps) => void;
  }

  export interface Component {
    name: string;
    component: (props: ComponentProps) => JSX.Element;
    form: (props: FormProps) => NullstackNode;
    defaultValues: ComponentProps['values'];
    children?: Component[];
  }

  export interface BuildComponent extends Component {
    id: string;
    values: Component['defaultValues'];
    children: BuildComponent[];
  }
}
