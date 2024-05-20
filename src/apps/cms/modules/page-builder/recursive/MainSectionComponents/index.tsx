import { Mococa } from '@types';
import Nullstack, { NullstackClientContext } from 'nullstack';
import { delay } from '../../utils/delay';

interface RendererProps {
  component: Mococa.BuildComponent;
}

export class MainSectionComponents extends Nullstack<RendererProps> {
  render({
    component,
    instances,
  }: Partial<NullstackClientContext<RendererProps>>) {
    if (!component) return null;

    const { component: MococaComponent, id, children } = component;
    const { elements } = instances.pagebuilder;

    return (
      <div
        onclick={async ({ event }) => {
          event.stopPropagation();
          // elements.selected_element = null;

          // // Delay for re-render
          // await delay(25);

          // elements.selected_element = id;
        }}
        data-selected={String(elements.selected_element === id)}
      >
        <MococaComponent values={component.values}>
          {children === undefined
            ? null
            : children.map(c => <MainSectionComponents component={c} />)}
        </MococaComponent>
      </div>
    );
  }
}
