import readLocalFiles from 'utilities/readLocalFiles';

const createFiles = (octokit, configs, cliargs) => {
  const { owner, repo, basepath } = configs;

  const createFile = ({ owner, repo, path, message, content }) => {
    octokit.repos
      .createFile({
        owner,
        repo,
        path,
        message,
        content
      })
      .then(({ data, status }) => {
        if (String(status).startsWith('20')) {
          console.log(`${data.content.path} created.`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  readLocalFiles(cliargs.path).then((filesStats) => {
    filesStats.forEach((filesStat) => {
      // Github expect context to be Base64-encoded
      const content = filesStat.content.toString('base64');
      // Remove `./` or `../` prefix
      const name = filesStat.name.replace(/\.+\//g, '');

      const path = basepath === '' ? `${encodeURI(name)}` : `${basepath}/${encodeURI(name)}`;
      const message = cliargs.message === null ? `create ${name}` : cliargs.message;

      createFile({ owner, repo, path, message, content });
    });
  });
};

export default createFiles;
