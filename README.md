# wgit [![](https://travis-ci.com/Gyumeijie/wgit.svg?branch=master)](https://travis-ci.com/Gyumeijie/wgit)

> use git to upload, delete, update files without requiring a local git repository


## Install

```bash
$ npm install @gyumeijie/wgit
```

## Usage

```bash
$ wgit upload --path path/to/upload
```

## Configuration
> wgit takes the `~/.wgitrc` as its default configuration file

Take as example my personal repo `https://github.com/Gyumeijie/assets`, the following is the corresponding configuration:
```json
{
  "github": {
    "branch": "master",
    "owner": "Gyumeijie",
    "basepath": "",
    "repo": "assets",
    "token": "78aea9df73b0ad1bb914608da706048d2f353957"
  }
}
```
As all things get ready, we now can fire the `wgit upload --path path/to/upload` to upload our files to the `assets` repo.

## License

MIT © [Gyumeijie](https://github.com/Gyumeijie)

## Reference

- [REST API v3](https://developer.github.com/v3/)
- [@Octokit/rest](https://octokit.github.io/rest.js/#)

## Related works
- [put](https://github.com/Gyumeijie/put)
