import { NullstackNode } from 'nullstack';
import './styles.scss';

interface Props {
  values: {
    weight: string;
    align: string;
    content: string;
    color: string;
    size: string;
  };
}

export const Text = ({
  values: { content, color, size, ...values },
}: Props) => {
  const props = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [[`data-${key}`], value]),
  );

  return (
    <div
      class="element-text"
      {...props}
      style={[
        color ? `color: ${color};` : '',
        size ? `font-size: ${size};` : '',
      ].filter(Boolean)}
    >
      {content}
    </div>
  );
};
