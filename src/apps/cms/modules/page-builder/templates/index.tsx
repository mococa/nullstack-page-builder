import Nullstack, { NullstackClientContext } from 'nullstack';
import { v4 as uuidv4 } from 'uuid';

import { Mococa } from '@types';

import { flatten_elements } from '@cms/modules/page-builder/utils/flatten_elements';

import { MainSectionComponents } from '../recursive/MainSectionComponents';

import { RightSidebar } from '../components/RightSidebar';
import { LeftSidebar } from '../components/LeftSidebar';
import { Navbar } from '../components/Navbar';
import { ElementsModal } from '../components/ElementsModal';

import './styles.scss';
import { delay } from '../utils/delay';

export class PageBuilderTemplate extends Nullstack {
  elements_modal: HTMLDialogElement;
  selected_component: string;

  renderElementSection({ instances }: Partial<NullstackClientContext>) {
    const { elements } = instances.pagebuilder;
    const { elements: elements_list } = elements;

    const all_elements = flatten_elements(elements_list);

    const key = all_elements.map(({ id }) => id).join('.');

    return (
      <section onclick={() => (elements.selected_element = '')}>
        {elements_list.map(component => {
          return <MainSectionComponents component={component} />;
        })}
      </section>
    );
  }

  renderElementsModal({ instances }: Partial<NullstackClientContext>) {
    const { elements } = instances.pagebuilder;
    const { elements: elements_list, selected_element } = elements;

    const all_elements = flatten_elements(elements_list);

    return (
      <ElementsModal
        ref={this.elements_modal}
        onadd={async c => {
          const component = {
            ...c,
            values: c.defaultValues,
            id: uuidv4(),
          } as Mococa.BuildComponent;

          if (selected_element) {
            const element = all_elements.find(
              ({ id }) => id === selected_element,
            );
            if (!element) return;

            if (!element.children) return;

            console.log(`pushing ${component.name} into ${element.name}`);

            element.children = [...element.children, component];
            this.elements_modal.close();

            elements.selected_element = null;

            await delay(25);

            elements.selected_element = component.id;

            return;
          }

          elements_list.push(component);
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
