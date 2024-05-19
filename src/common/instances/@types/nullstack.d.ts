import 'nullstack';
import { PageBuilderInstance } from '@common/instances/PageBuilder';


declare module 'nullstack' {
  export interface NullstackInstances {
    pagebuilder: PageBuilderInstance;
  }
}
