import { NullstackNode } from 'nullstack';
import './styles.scss';

interface Props {
  values: {
    background: string;
  };
  children: NullstackNode;
}

export const Page = ({ values, children }: Props) => {
  const props = {
    style: `background-color: ${values.background}`,
  };

  return (
    <div class="element-page" {...props}>
      {children}
    </div>
  );
};
