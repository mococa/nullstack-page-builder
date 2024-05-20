import { Assets } from '@cms/assets';
import Nullstack, { NullstackClientContext } from 'nullstack';

import './styles.scss';

interface Props {
  openElements: () => void;
}

export class Navbar extends Nullstack<Props> {
  render({ openElements, instances }: NullstackClientContext<Props>) {
    return (
      <header class="page-builder-navbar">
        <section>
          <span>
            <b>Pb</b>

            <Assets.Chevron.down />
          </span>

          <button onclick={openElements}>
            <Assets.Icons.plus />

            <span>Insert</span>
          </button>

          <button>
            <Assets.Icons.database />

            <span>CMS</span>
          </button>
        </section>

        <section>
          <b>Untitled</b>
        </section>

        <section>
          <button>
            <Assets.Icons.globe />
          </button>

          <button>
            <Assets.Icons.cog />
          </button>

          <button
            onclick={() => {
              if (instances.pagebuilder.elements.selected_element) {
                instances.pagebuilder.elements.last_selected_element =
                  instances.pagebuilder.elements.selected_element;
              }

              instances.pagebuilder.elements.selected_element = null;

              instances.pagebuilder.previewing = !Boolean(
                instances.pagebuilder.previewing,
              );

              if (!instances.pagebuilder.previewing) {
                instances.pagebuilder.elements.selected_element =
                  instances.pagebuilder.elements.last_selected_element;
              }
            }}
          >
            <Assets.Icons.play />
          </button>

          <button
            onclick={() => {
              const stringified_json = prompt('Stringified JSON');
              if (!stringified_json) return;

              instances.pagebuilder.load({ stringified_json });
              instances.canvas.draw({});
            }}
          >
            Invite
          </button>

          <button onclick={() => instances.pagebuilder.save()}>Publish</button>
        </section>
      </header>
    );
  }
}
