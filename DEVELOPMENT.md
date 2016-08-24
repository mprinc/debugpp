# test

```sh
npm run test:single
```

# development

## Committing

Adding code

```sh
git status
git add -A
```

Committing

```sh
npm run commit
```

You can chose: `> breaking changes` and write as a message:
```
closes #4
```

Now you can push changes
```sh
git log
git push
```

Push will
+ make git to close the issue #4
+ trigger `travis`
  + travis will run tests and
  + if tests are ok it will run `semantic-release`
  + semantic-release will
    + create and update versions of the package
    + build git tags and release for that version

## Releasing

```sh
npm publish
```
