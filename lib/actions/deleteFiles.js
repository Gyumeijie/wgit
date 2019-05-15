import getSHA from './getSHA';

const deleteFiles = (octokit, configs, cliargs) => {
  const deleteFilesCallback = ({ octokit, owner, repo, path, message, sha }) => {
    octokit.repos
      .deleteFile({
        owner,
        repo,
        path,
        message,
        sha
      })
      .then(() => {
        console.log(`${path} deleted.`);
      })
      .catch((err) => {
        console.log(`In deleteFiles: ${err.message}`);
      });
  };

  // Can't use `deleteFilesCallback` shorthand directly
  getSHA({ octokit, configs, cliargs, callback: deleteFilesCallback });
};

export default deleteFiles;
