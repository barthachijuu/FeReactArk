# Review checklist

## General

- [] Does the code work?
- [] Description of the project status is included.
- [] Code is easily understand.
- [] Code is written following the coding standarts/guidelines (React in our case).
- [] Code is in sync with existing code patterns/technologies.
- [] DRY. Is the same code duplicated more than twice?
- [] Can the code be easily tested (don't forget about React components)?
- [] Are functions/classes/components reasonably small (not too big)?
- [] Event listeners removed at teardown.
- [] Naming conventions followed for variables, file names, translations.
- [] Removed unused packages from NPM.
- [] Separation of Concerns followed.

## Markup

- [] Code does not contain inline JavaScript event listeners
- [] Code does not contain inline style attributes
- [] Code does not contain deprecated elements & attributes
- [] Page begins with a valid DTD (HTML5 doctype)
- [] Code is indented using hard tabs
- [] Tags and attributes are lowercase
- [] Tags are closed and nested properly
- [] Markup is semantic (e.g. class names do not denote presentation, Items in list form are housed in a UL, OL, or DL)
- [] Tables are only used to display tabular data
- [] Element IDs are unique
- [] Code validates against the W3C validator
- [] DOM nesting depth does not exceed 12 levels
- [] Total page weight does not exceed client requirements (e.g. 1000kb)
- [] TItle case is used for headers/titles and forced to all caps using the CSS declaration text-transform: uppercase;
- [] Where text is included via images, CSS image replacement is used.

## Codestyle

- [] No hardcoded values, use constants values.
- [] Avoid multiple if/else blocks.
- [] No commented out code.
- [] No unnecessary comments: comments that describe the how.
- [] Add necessary comments where needed. Necessary comments are comments that describe the why.

## ES6/7

- [] Use ES6 features.
- [] Use fat arrow instead of var that = this. Be consistent in your usage of arrow function.
- [] Use spread/rest operator.
- [] Use default values.
- [] Use const over let (avoid var).
- [] Use import and export.
- [] Use template literals.
- [] Use destructuring assignment for arrays and objects.
- [] Use Promises or Asyns/Await. Rejection is handled.

## React code review

- [] Are components have defined propTypes?
- [] Keep components small.
- [] Functional components for components that don't use state.
- [] No api calls in containers, delegate to Sagas
- [] No state updates in loop.
- [] No useless constructor.
- [] Minimize logic in the render method.
- [] Don’t use mixins, prefer HOC and composition.

## Redux

- [] Make sure you don’t do state mutations in reducers.

## Third-Party Libraries

- [] Use lodash/ramda functions instead of implementing itself.
- [] Is Redux.js was used correctly?
- [] Is any nice/useful library was used wich we didn't know before?

## ESLint

- [] Code has no any linter errors or warnings.
- [] No console.logs.

## CSS/CSS in JS

- [] Consistent naming conventions are used (BEM, OOCSS, SMACSS, e.t.c.).
- [] CSS selectors are only as specific as they need to be; grouped logically.
- [] Is any 'CSS in JS' library was used?
- [] Use Hex color codes #000 unless using rgba().
- [] Avoid absolute positioning.
- [] Use flexbox.
- [] Avoid !important.
- [] Do not animate width, height, top, left and others. Use transform instead.
- [] Use same units for all project.
- [] Avoid inline styles.

## Testing

- [] Tests are readable, maintainable, trustworthy.
- [] Test names (describe, it) are concise, explicit, descriptive.
- [] Avoid logic in your tests.
- [] Don't test multiple concerns in the same test.
- [] Cover the general case and the edge cases.
- [] Test the behaviour, not the internal implementation.
- [] Use a mock to simulate/stub complex class structure, methods or async functions.

## Git

- [] Commits are small and divided into logical parts.
- [] Commits messages are small and understandable.
- [] Use branches for new features.
- [] Make sure no dist files, editor/IDE files, etc are checked in. There should be a .gitignore for that.

## Other

- [] Security.
- [] Usability.
