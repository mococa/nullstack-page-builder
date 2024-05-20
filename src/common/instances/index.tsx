import Nullstack from 'nullstack';
import { PageBuilderInstance } from './PageBuilder';

export class Instances extends Nullstack {
  render() {
    return (
      <ns-instances>
        <PageBuilderInstance persistent key="pagebuilder" />
      </ns-instances>
    );
  }
}
