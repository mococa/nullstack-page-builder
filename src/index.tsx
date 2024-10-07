import Nullstack, {
  BaseNullstackClientContext,
  NullstackClientContext,
} from 'nullstack';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Instances } from '@common/instances';

import { PageBuilderTemplate } from '@cms/modules/page-builder/templates';

import '@common/styles/global.scss';
import { PageBuilderInstance } from '@common/instances/PageBuilder';

export class Application extends Nullstack {
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
