import Nullstack, { NullstackClientContext } from 'nullstack';
import { v4 as uuidv4 } from 'uuid';

import { RightSidebar } from '../components/RightSidebar';
import { LeftSidebar } from '../components/LeftSidebar';
import { Navbar } from '../components/Navbar';
import { ElementsModal } from '../components/ElementsModal';

import './styles.scss';

export class PageBuilderTemplate extends Nullstack {
  elements_modal: HTMLDialogElement;
  selected_component: string;

  renderElementSection({ instances }: Partial<NullstackClientContext>) {
    if (!this.hydrated) return null;

    const { elements } = instances.pagebuilder;
    const { elements: elements_list, selected_element } = elements;

    return (
      <section onclick={() => (elements.selected_element = '')}>
        {elements_list.map(Component => {
          const { component: MococaComponent, id } = Component;

          return (
            <div
              onclick={({ event }) => {
                event.stopPropagation();
                elements.selected_element = id;
              }}
              data-selected={String(elements.selected_element === id)}
            >
              <MococaComponent values={Component.values} />
            </div>
          );
        })}
      </section>
    );
  }

  renderElementsModal({ instances }: Partial<NullstackClientContext>) {
    if (!this.hydrated) return null;

    const { elements } = instances.pagebuilder;
    const { elements: elements_list, selected_element } = elements;

    return (
      <ElementsModal
        ref={this.elements_modal}
        onadd={c => {
          elements_list.push({
            ...c,
            values: c.defaultValues,
            id: uuidv4(),
          });

          this.elements_modal.close();
        }}
      />
    );
  }

  render() {
    return (
      <main class="page-builder-template">
        <Navbar
          openElements={() => {
            this.elements_modal.showModal();
          }}
        />

        <LeftSidebar />

        {this.renderElementSection({})}

        <RightSidebar />

        {this.renderElementsModal({})}
      </main>
    );
  }
}
