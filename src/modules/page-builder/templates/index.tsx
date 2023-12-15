import Nullstack from 'nullstack';

import { RightSidebar } from '../components/RightSidebar';
import { LeftSidebar } from '../components/LeftSidebar';
import { Navbar } from '../components/Navbar';

import './styles.scss';

export class PageBuilderTemplate extends Nullstack {
  render() {
    return (
      <main class="page-builder-template">
        <Navbar />

        <LeftSidebar />

        <section></section>

        <RightSidebar />
      </main>
    );
  }
}
