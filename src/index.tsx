import Nullstack from 'nullstack';

import { PageBuilderTemplate } from '_modules/page-builder/templates';

import '_styles/global.scss';

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
          <PageBuilderTemplate />
        </body>
      </html>
    );
  }
}
