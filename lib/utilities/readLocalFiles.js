import fs from 'fs';
import recursive from 'recursive-readdir';

const filesStats = [];
const readLocalFiles = async (path) =>
  recursive(path).then(
    (files) => {
      // `files` is an array of file paths
      files.forEach((file) => {
        // Load the raw content without specify encoding `utf-8`
        const content = fs.readFileSync(file);
        filesStats.push({
          name: file,
          content
        });
      });
      return filesStats;
    },
    (err) => {
      // The `path` passed in is not a directory
      if (err.code === 'ENOTDIR') {
        // Load the raw content without specify encoding `utf-8`
        const content = fs.readFileSync(path);
        filesStats.push({
          name: path,
          content
        });
        return filesStats;
      }
      throw err;
    }
  );

export default readLocalFiles;
