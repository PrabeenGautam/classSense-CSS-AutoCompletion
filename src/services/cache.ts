import * as Bluebird from 'bluebird';
import * as path from 'path';

import { NotificationPriority } from '../enum';
import {
  cacheNotifer,
  messageNotifier,
  setUniqueCSSDefination,
} from '../extension';
import parseFiles from './parseFiles';
import ExtractorGateway from './ExtractorGateway';
import { CSSDefination, UniqueCSSDefination } from '../types';

async function cache() {
  try {
    console.log('Fetching Parsable Files');

    cacheNotifer.notify({
      tooltip: 'Fetching Parsable Files',
      icon: 'sync~spin',
    });

    const fileURI = await parseFiles();

    if (!fileURI || fileURI.length === 0) {
      messageNotifier.showMessage({
        message: 'No CSS files found',
        type: NotificationPriority.WARNING,
      });
      return;
    }

    console.log('Parsed Files', fileURI.length);
    const fetchDefination: CSSDefination[] = [];
    const fileStat = {
      totalParsed: 0,
      failedLogs: '',
      failedCount: 0,
    };

    await Bluebird.map(
      fileURI,
      async (uri) => {
        try {
          const url = uri.fsPath;
          const basename = path.basename(url);
          const classNames = await ExtractorGateway(url);

          fetchDefination.push({ file: basename, classNames });
        } catch (error) {
          console.log('Error in parsing', error);
          fileStat.failedLogs += `Failed to parse ${uri.fsPath}`;
          fileStat.failedCount += 1;
        }

        fileStat.totalParsed += 1;
      },
      { concurrency: 20 }
    );

    const definations: UniqueCSSDefination[] = [];

    for (const classes of fetchDefination) {
      const { classNames, file } = classes;

      for (const className of classNames) {
        const index = definations.findIndex((item) => item.class === className);

        if (index === -1) {
          definations.push({ class: className, existFiles: [file] });
        } else {
          definations[index].existFiles.push(file);
        }
      }
    }

    setUniqueCSSDefination([...definations]);

    cacheNotifer.notify({ icon: 'check-all', tooltip: 'Purge CSS Cache' });
    messageNotifier.showMessage({
      message: 'ClassSense: CSS Cache Updated',
      type: NotificationPriority.INFO,
    });

    console.log("\nUnique CSS Defination's: ", definations.length);
    console.log('Total Parsed: ', fileStat.totalParsed);
    console.log('Failed Count: ', fileStat.failedCount);
    console.log('Failed Logs: ', fileStat.failedLogs || 'No Failed Logs');
  } catch (error) {
    const errorMessage = 'Failed to parse CSS files. Retry again';

    messageNotifier.showMessage({
      message: errorMessage,
      type: NotificationPriority.ERROR,
      items: [{ title: 'Refesh', callback: () => cache() }],
    });

    console.log(errorMessage, error);
  }
}

export default cache;
