import { NullstackNode } from 'nullstack';
import './styles.scss';

interface Props {
  values: {
    direction: string;
    columns: string;
    wrap: string;
    align: string;
  };
  children: NullstackNode;
}

export const Layout = ({ values, children }: Props) => {
  const props = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [[`data-${key}`], value]),
  );

  return (
    <div class="element-layout" {...props}>
      {children}
    </div>
  );
};
