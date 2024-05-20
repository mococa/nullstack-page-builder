import 'nullstack';
import { PageBuilderInstance } from '@common/instances/PageBuilder';
import { Canvas } from '@cms/modules/page-builder/components/Canvas';

declare module 'nullstack' {
  export interface NullstackInstances {
    pagebuilder: PageBuilderInstance;
    canvas: Canvas;
  }
}
