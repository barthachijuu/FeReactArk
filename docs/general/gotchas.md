# Gotchas

These are some things to strictly following to a correct use of this architecture.

- [Gotchas](#gotchas)
  - [Special images in jsx files](#special-images-in-jsx-files)
  - [Running tests in `watch` mode](#running-tests-in-watch-mode)
  - [When in doubt, re-install](#when-in-doubt-re-install)
  - [Cleaning up Jest cache](#cleaning-up-jest-cache)

## Special images in jsx files

If you specify your images in the `.scss` or `.css` files using the `background-image` property,
everything will work fine. The problem comes up if you try to include images using the html tag,
like meta tags, img tag or a component:

```HTML
<meta property="og:image" content="img/yourimg.png" />
<img src="img/yourimg.png" alt="" />
```

The webpack `html-loader` does not recognise this as an image file and will not
transfer the image to the build folder. To get webpack to transfer them, you
have to import them with the file like module import in your file, e.g.:

```JavaScript
import myImage from '../images/myimage.png';
```

Then webpack create a base64 url and will correctly transfer the image to the build folder.

## Running tests in `watch` mode

When you rune the test with Jest, is reccomended to use the watch mode. If you are not confident
with the Jest api, don't worry, we'll do it for you. Launch the script `yarn test:watch` and that's it.
So you can correct any errors on your tests in real time

## When in doubt, re-install

If you're facing any inexplicable problems while installing dependencies, building your project or
running tests, try reinstalling dependencies. It works for most cases. Run the following commands in the exact order given:

Remove node_modules

- `rm -rf node_modules`

Clear cache

- `yarn cache clean`

Re-install dependencies

- `yarn install`

Build project

- `yarn build`

## Cleaning up Jest cache

By default, Jest caches transformed modules, which may lead to faulty coverage reports. To prevent this, you'll
have to clear the cache by running `yarn test -- --no-cache` as pointed out in [Jest docs](https://facebook.github.io/jest/docs/cli.html#cache)
