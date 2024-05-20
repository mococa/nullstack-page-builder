import { Assets } from '@cms/assets';
import { Mococa } from '@types';
import Nullstack, { NullstackClientContext } from 'nullstack';
import { delay } from '../../utils/delay';
import { filter_out_element_by_id } from '../../utils/filter_out_element_by_id';
import './styles.scss';

interface RendererProps {
  component: Mococa.BuildComponent;
}

export class SidebarTree extends Nullstack<RendererProps> {
  render({
    component,
    instances,
  }: Partial<NullstackClientContext<RendererProps>>) {
    if (!component) return null;

    const { id, children } = component;
    const { elements } = instances.pagebuilder;

    return (
      <li
        class="sidebartree-item"
        data-selected={String(elements.selected_element === id)}
        onclick={async ({ event }) => {
          event.stopPropagation();

          elements.selected_element = null;

          // Delay for re-render
          await delay(25);

          elements.selected_element = id;
        }}
      >
        <div>
          <span>
            {component.name}
            {component.name === 'Layout' &&
              ` - ${component.values['direction']}`}
          </span>

          <button
            onclick={async () => {
              if (confirm('Are you sure you want to delete this element?')) {
                elements.selected_element = null;

                const filtered = filter_out_element_by_id(
                  elements.elements || [],
                  id,
                );

                elements.elements = filtered;

                instances.canvas.draw();
              }
            }}
          >
            <Assets.Icons.trash />
          </button>
        </div>

        {!!children && (
          <ul>
            {children.map(component => (
              <SidebarTree component={component} />
            ))}
          </ul>
        )}
      </li>
    );
  }
}
