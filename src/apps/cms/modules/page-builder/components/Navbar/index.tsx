import { Assets } from '@cms/assets';

import './styles.scss';

interface Props {
  openElements: () => void;
}

export const Navbar = ({ openElements }: Props) => (
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

      <button>
        <Assets.Icons.play />
      </button>

      <button>Invite</button>

      <button>Publish</button>
    </section>
  </header>
);
