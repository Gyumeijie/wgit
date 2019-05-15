import Octokit from '@octokit/rest';
import readConfigFile from './readConfigs';
import actions from './actions';
import getArgs from 'utilities/parseArgs';

const configs = readConfigFile().github;
const cliargs = getArgs();

const octokit = new Octokit({
  auth () {
    return `token ${configs.token}`;
  },
  baseUrl: 'https://api.github.com'
});

actions[cliargs.subcommand](octokit, configs, cliargs);
