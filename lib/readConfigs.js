import os from 'os';
import fs from 'fs';

const readConfigFile = () => {
  const path = '~/.wgitrc'.replace('~', os.homedir());
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
};

export default readConfigFile;
