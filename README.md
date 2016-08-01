# Nunjucks support for SourceJS

[SourceJS](http://sourcejs.com) middleware to support [Nunjucks](http://mozilla.github.io/nunjucks/) template language (`*.njk` or `*.njk.html`) instead of native `*.src`.

## Install

To install, run npm in `sourcejs/user` folder:

```
npm install sourcejs-nunjucks --save
```

In `sourcejs/user/options.js` you need to add `index.njk` or `index.njk.html` to `rendering.specFiles`:
```js
module.exports = {
    rendering: {
        specFiles: [
            'index.njk',
            'index.njk.html',
            'index.src',
            //...
        ]
    }
    //...
};
```

Then restart your SourceJS application, middleware will be loaded automatically.

## Usage

After installing middleware, instead of `index.src` pages, you can `index.njk` files with Nunjucks markup.

index.njk

```
{#
This is just a comment which will be fully stripped and ignored during parsing.
#}

<h1>{{ specData.info.title|title }}</h1>
```
