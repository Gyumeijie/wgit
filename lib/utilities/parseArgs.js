'use strict';

import { ArgumentParser } from 'argparse';

const getArgs = () => {
  const parser = new ArgumentParser({
    addHelp: true,
    prog: 'wgit'
  });

  parser.addArgument(['-m', '--message'], {
    help: 'commit message'
  });

  const subparsers = parser.addSubparsers();

  const upload = subparsers.addParser('upload', { addHelp: true });
  upload.addArgument(['-p', '--path'], {
    help: 'path to designate file(s) to be uploaded'
  });
  upload.addArgument(['-m', '--message'], {
    help: 'commit message'
  });

  return parser.parseArgs();
};

export default getArgs;
