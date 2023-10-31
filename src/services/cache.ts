import * as Bluebird from 'bluebird';

import CssClassDefinition from '../common/CssClassDefinition';
import { NotificationPriority } from '../enum';
import { cacheNotifer, messageNotifier } from '../extension';
import parseFiles from './parseFiles';
import ExtractorGateway from './ExtractorGateway';

async function cache() {
  try {
    console.log('Fetching Parsable Files');

    cacheNotifer.notify({
      tooltip: 'Fetching Parsable Files',
      icon: 'sync~spin',
    });

    const fileURI = await parseFiles();
    cacheNotifer.notify({ icon: 'check-all', tooltip: 'Purge CSS Cache' });

    if (!fileURI || fileURI.length === 0) {
      messageNotifier.showMessage({
        message: 'No CSS files found',
        type: NotificationPriority.WARNING,
      });
      return;
    }

    console.log('Parsed Files', fileURI.length);
    const definitions: CssClassDefinition[] = [];
    const fileStat = {
      totalParsed: 0,
      failedLogs: '',
      failedCount: 0,
    };

    try {
      // TODO: fetch all css class definitions
      await Bluebird.map(
        fileURI,
        async (uri) => {
          try {
            await ExtractorGateway(uri);
          } catch (error) {
            console.log('Error in parsing', error);
            fileStat.failedLogs += `Failed to parse ${uri.fsPath}`;
            fileStat.failedCount += 1;
          }

          fileStat.totalParsed += 1;
        },
        { concurrency: 20 }
      );
    } catch (error) {
      console.log('Error in parsing', error);
      throw error;
    }
  } catch (error) {
    messageNotifier.showMessage({
      message: 'Failed to parse CSS files. Retry again',
      type: NotificationPriority.ERROR,
      items: [{ title: 'Refesh', callback: () => {} }],
    });
  }
}

export default cache;
