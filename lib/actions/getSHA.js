const getSHA = ({ octokit, configs, cliargs, callback }) => {
  const { owner, repo } = configs;
  const { file, message, directory } = cliargs;
  const fileType = file === null ? 'dir' : 'file';
  const path = file || directory;

  let path_ = path;

  // Go to the parent directory if exists
  if (fileType === 'dir') {
    path_ = path.replace(/\/[^/]+$/, '');
    // The form of 'xxx' or '' will be unified to '', where '' represent root directory
    path_ = path_ === path ? '' : path_;
  }

  octokit.repos
    .getContents({
      owner,
      repo,
      path: path_
    })
    .then(({ data }) => {
      let sha = undefined;

      // Return a object: exact match a file
      if (data.length === undefined) {
        sha = data.sha;
        callback({ octokit, owner, repo, path, message, sha });
        // The diretory with -f | --file will return an array
      } else {
        // Return an array: exact match a directory or file with -d | --directory
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          // Exact match a directory
          if (item.path === path && item.type === fileType) {
            sha = item.sha;
            callback({ octokit, owner, repo, path, message, sha });
            break;
          }
          // If file with -d | --directory: only `item.path === path` is true
        }
      }

      if (sha === undefined) {
        throw new Error(`File Type Error: ${path} is not a ${fileType}`);
      }
    })
    .catch((err) => {
      console.log(`In getSHA: ${err.message}`);
    });
};

export default getSHA;
