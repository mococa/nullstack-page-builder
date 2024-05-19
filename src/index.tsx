import Nullstack, { NullstackClientContext } from 'nullstack';

import { PageBuilderTemplate } from '@cms/modules/page-builder/templates';

import { Instances } from '@common/instances';
import { ElementsInstances } from '@common/instances/PageBuilder/elements';

import '@common/styles/global.scss';

export class Application extends Nullstack {
  hydrate(context: NullstackClientContext) {
    if (!context.instances.pagebuilder) return;

    context.instances.pagebuilder.elements = new ElementsInstances(context);
  }

  render() {
    return (
      <html>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          />
        </head>

        <body>
          <Instances />

          <PageBuilderTemplate />
        </body>
      </html>
    );
  }
}
