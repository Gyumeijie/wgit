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

  const subparsers = parser.addSubparsers({
    title: 'subcommands',
    // Add `subcommand`: to the parsed result
    dest: 'subcommand'
  });

  const upload = subparsers.addParser('upload', { addHelp: true });
  upload.addArgument(['-p', '--path'], {
    help: 'path to designate file(s) to be uploaded'
  });
  upload.addArgument(['-m', '--message'], {
    help: 'commit message'
  });

  const remove = subparsers.addParser('delete', { addHelp: true });

  remove.addArgument(['-f', '--file'], {
    help: 'file to be deleted'
  });
  remove.addArgument(['-d', '--directory'], {
    help: 'file(s) to be deleted'
  });
  remove.addArgument(['-m', '--message'], {
    help: 'commit message'
  });

  return parser.parseArgs();
};

export default getArgs;
