import Nullstack from 'nullstack';

import { Mococa } from '_@mococa/src/custom/@types';

import { RightSidebar } from '../components/RightSidebar';
import { LeftSidebar } from '../components/LeftSidebar';
import { Navbar } from '../components/Navbar';
import { ElementsModal } from '../components/ElementsModal';

import './styles.scss';
import { ComponentFormDialog } from '../components/ComponentFormDialog';

interface BuildComponent extends Mococa.Component {
  values: Mococa.Component['defaultValues'];
  modal: HTMLDialogElement;
}
export class PageBuilderTemplate extends Nullstack {
  elements_modal: HTMLDialogElement;
  components: BuildComponent[] = [];

  render() {
    return (
      <main class="page-builder-template">
        <Navbar
          openElements={() => {
            this.elements_modal.showModal();
          }}
        />

        <LeftSidebar />

        <section>
          {this.components.map(Component => {
            const {
              name,
              form: Form,
              component: MococaComponent,
              defaultValues,
            } = Component;
            return (
              <div
                ondblclick={() => {
                  Component.modal.showModal();
                }}
              >
                <ComponentFormDialog name={name} ref={Component.modal}>
                  <Form
                    onsubmit={({ values }) => {
                      Component.values = values;
                      Component.modal.close();
                    }}
                    defaultValues={defaultValues}
                  />
                </ComponentFormDialog>

                <MococaComponent values={Component.values} />
              </div>
            );
          })}
        </section>

        <RightSidebar />

        <ElementsModal
          ref={this.elements_modal}
          onadd={c => {
            this.components.push({
              ...c,
              values: c.defaultValues,
              modal: null,
            });

            this.elements_modal.close();
            
            setTimeout(() => {
              this.components.at(-1).modal.showModal();
            }, 50);
          }}
        />
      </main>
    );
  }
}
