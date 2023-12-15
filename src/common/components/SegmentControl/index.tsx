import {
  HTMLAttributes,
  NullstackClientContext,
  NullstackNode,
} from 'nullstack';

import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  options: { id: string; label: NullstackNode }[];
  bind: NullstackClientContext['bind'];
}

const calculate_selector_left = (options: string[], selected_option: string) =>
  `calc(${(options.indexOf(selected_option) * 100) / options.length}% + 2px)`;

export const SegmentControl = ({
  options,
  bind: { object: property, property: name },
  ...props
}: Props) => (
  <div
    {...props}
    class="segment-control"
    style={[`--amount-of-options: ${options.length}`]}
  >
    {options.map(option => (
      <button
        onclick={() => (property[name] = option.id)}
        data-selected={option.id === property[name] ? 'true' : 'false'}
      >
        {option.label}
      </button>
    ))}

    <div
      class="indicator"
      style={`left: ${calculate_selector_left(
        options.map(({ id }) => id),
        property[name],
      )}`}
    ></div>
  </div>
);
