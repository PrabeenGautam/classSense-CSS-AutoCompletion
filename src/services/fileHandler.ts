import * as fs from 'fs';

async function readFile(file: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.toString());
    });
  });
}

function fileExist(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
}

export { readFile, fileExist };
