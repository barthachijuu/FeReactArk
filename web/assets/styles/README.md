# Installation

Scss-lint requires [Ruby](https://www.ruby-lang.org/it/downloads/) to run.

Install scss_lint gem with:

```sh

gem install scss_lint
```

It will enable `scss-lint` command in the shell, configured from`.scss-lint.yml` file, in the project root folder.

_Scss linting_ is linked to `pre-commit` git hook.

## Notes

Sometimes will be required to override **_linter warnings_**.

To skip the specific warning just add `// scss-lint:disable <ruleName>` _(without brakets)_ at the end of the line you want to ignore.

Es.

```sh

 &:-moz-placeholder {
  font-family: $font-family-regular;
  color: #9a9b9c;
 }
```

This rule will trigger _VendorPrefix_ and _PseudoElement_ linter warnings. 
So we will change it in:

```sh
 &:-moz-placeholder {// scss-lint:disable VendorPrefix PseudoElement
  font-family: $font-family-regular;
  color: #9a9b9c;
 }
```

## Folder structure

    styles/
        - abstracts/
            - _abstracts-dir.scss           # Import all abstracts .scss files  
            - _fonts.scss                   # Font Import
            - _mixins.scss                  # Scss Mixins
            - _variables.scss               # Scss Variables
            - _functions.scss               # Scss Functions

        - base/
            - _base-dir.scss                # Import all base .scss files


        - layouts/
           - _layouts-dir.scss              # Import all layouts .scss files

        - ui-components/
            - _ui-components-dir.scss       # Import all general ui-components .scss files


        - react-components/
            - _react-components-dir.scss    # Import all general react-components .scss files

        - Component Styles

        main.scss                           # Main Scss File - Import all ‘-dir.scss’  files

## From Sass Style Guide

### KEY PRINCIPLES

    - Having a styleguide is all about consistency. If you disagree with some rules from Sass Guidelines, fair enough as long as you are consistent.

    - Sass should be kept as simple as it can be. Avoid building complex systems unless absolutely necessary.

    - Keep in mind that sometimes KISS (Keep It Simple, Stupid) is better than DRY (Don’t Repeat Yourself).

### SYNTAX AND FORMATTING

    - An indentation is made of two (2) spaces, no tabs.
    - Lines should be, as much as possible, shorter than 80 characters. Feel free to split them into several lines when necessary.

    - CSS should be properly written, possibly following the CSS Guidelines from Harry Roberts.

    - Whitespace is free, use it to separate items, rules and declarations. Do not hesitate to leave empty lines, it never hurts.`

#### STRINGS

    - Declaring the @charset directive on top of the stylesheet is highly recommended.
    - Unless applied as CSS identifiers, strings should be quoted using single quotes. URLs should also be quoted.

#### NUMBERS

    - Sass makes no distinction between numbers, integers, floats so trailing zeros (0) should be omitted. However, leading zeros (0) help readability and should be added.
    - A zero (0) length should not have a unit.
    - Units manipulation should be thought as arithmetic operations, not string operations.
    - In order to improve readability, top-level calculations should be wrapped in parentheses. Also, complex math operations might be splitted into smaller chunks.
    - Magic numbers dramatically hurt code maintainability and should be avoided at all time. When in doubt, extensively explain the questionable value.

#### COLORS

    - Colors should be expressed in HSL when possible, then RGB, then hexadecimal (in a lowercase and shortened form). Color keywords should be avoided.
    - Prefer mix(..) instead of darken(..) and lighten(..) when lightening or darkening a color.

#### LISTS

    - Unless used as a direct mapping to space-separated CSS values, lists should be separated with commas.
    - Wrapping parentheses should also be considered to improve readability.
    - Inlined lists should not have a trailing comma, multi-line lists should have it.

#### MAPS

    - Maps containing more than a single pair are written on several lines.
    - To help maintainability, the last pair of a map should have a trailing comma.
    - Map keys that happen to be strings should be quoted as any other string.

#### DECLARATION SORTING

    - The system used for declaration sorting (alphabetical, by type, etc.) doesn’t matter as long as it is consistent.

#### SELECTOR NESTING

    - void selector nesting when it is not needed (which represents most of the cases).
    - Use selector nesting for pseudo-classes and pseudo-elements.
    - Media queries can also be nested inside their relevant selector.

### Naming Conventions

    - It is best to stick to CSS naming conventions which are (except a few errors) lowercase and hyphen-delimited.

### Commenting

    - CSS is a tricky language; do not hesitate to write very extensive comments about things that look (or are) fishy.
    - For variables, functions, mixins and placeholders establishing a public API, use SassDoc comments.

### Variables

    - Do use the !default flag for any variable part of a public API that can be safely changed.
    - Do not use the !global flag at root level as it might constitue a violation of Sass syntax in the future.

### Extend

    - Stick to extending placeholders, not existing CSS selectors.
    - Extend a placeholder as few times as possible in order to avoid side effects.

## Useful links:

- [Sass official functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)
- [SMACSS Approach](https://smacss.com/)
- [Sitepoint: 8 tips for best sass](https://www.sitepoint.com/8-tips-help-get-best-sass/)
- [Css tricks: Sass Style Guide](https://css-tricks.com/sass-style-guide/)
- [Sitepoint: Mixins or placeholders](https://www.sitepoint.com/sass-mixin-placeholder/)
- [Hongkiat: Sass tips for developers](http://www.hongkiat.com/blog/sass-tips-tools-for-developers/)
- [Sass-guidelines: Sass official guidelines](https://sass-guidelin.es/)
