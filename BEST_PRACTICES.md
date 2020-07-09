# FrontEnd Developing Best Practices And Guidelines

If you’re a front-end web developer, here are some best practices and guidelines you might consider exploring or adopting to streamline your workflow.

## Table of Contents

  1. [General guidelines](#general-guidelines)
  2. [Make sure your code is legible and easy to follow](#make-sure-your-code-is-legible-and-easy-to-follow)
  3. [Design for all browsers & devices](#Design-for-all-browsers-&-devices)
  4. [Don’t become dependent on libraries & frameworks](#Don’t-become-dependent-on-libraries-&-frameworks)
  5. [Be conscious of page speed](#Be-conscious-of-page-speed)
  6. [Don't using outdated or abandoned javascript libraries](#Don't-using-outdated-or-abandoned-javascript-libraries)
  7. [Repository management](#repository-management)
  8. [Never stop learning](#Never-stop-learning)

---

## General guidelines

- All front-end code should display clear separation of presentation, content, and behaviour.
- Markup should be well formed, semantically correct and generally valid.
- JavaScript should progressively enhance the experience
  - Use feature detection rather than browser sniffing (edge cases such as performance are acceptable)
- Gracefully degrade functionality when not present (e.g GPS, box-shadow, forms etc).

## General Markup

The following are general guidelines for structuring your HTML markup. Authors are reminded to
always use markup which represents the semantics of the content in the document being created.

- Use `<Typography>` elements for paragraph delimiters as opposed to multiple `<br />` tags.
- Place an HTML comment around DIV tags that contain a larger amount of markup to indicate the element
  you're closing. It will help when there is a lot of nesting and indentation.
- Make use of `<dl>` (definition lists) and `<blockquote>`, when appropriate.
- Always use a label each form field. The for attribute should associate itself with the input field,
  so users can click the labels and obtain focus.
- Do not use the size attribute on your input fields. The size attribute is relative to the font-size  of  the text inside the input. Instead use CSS width.
- Always use title-case for headers and titles. Do not use all caps or all lowercase titles in markup, instead apply the CSS property text-transform: uppercase/lowercase.
- Use microformats and/or Microdata where appropriate, specifically hCard and adr.

...and the single most important rule...

> Tables shouldn't ever be used for page layout – only for tabular data.

## Make sure your code is legible and easy to follow

While writing code that’s concise and legible isn’t mandatory, it will save you (and any developer who works on it) many headaches in the future.
Think about it; the chances of writing code that will never be changed or at least looked at again is slim to none, and time spent getting lost
in old code is time wasted. Below are some key best practices for the three native web languages.

## Indentation

For all languages, indent your code with tabs. The default tab size should be set as 4.

## Readability vs Compression

We encourage readability over file-size when it comes to maintaining existing files. Plenty of white-space is encouraged, along with ASCII art,
where appropriate. There is no need for any developer to purposefully compress HTML or CSS, nor obfuscate JavaScript.

We will use server-side or build processes to automatically minify and gzip all static client-side files, such as CSS and JavaScript.

### HTML

Use indentation as a visual representation of nested elements. This creates a tree data structure which is much easier to visually follow.
If necessary, add blank lines to separate large code blocks.

```html
<html>
  <body>
    <div>
      <h1>The magic of code indentation</h1>
      <ol>
        <li>Indent code is very useful</li>
        <li>... for you and for all members of your team</li>
      </ol>
      <ol>
        <li>It makes the readability better</li>
        <li>... and maintainability</li>
      </ol>
    </div>
  </body>
</html>
```

Use semantic elements. Implemented in HTML5, semantic elements are elements with tags that clearly defines its content for both the developer and the browser.
A full list of semantic elements can be found [here](https://www.w3schools.com/html/html5_semantic_elements.asp).

```html
<article>
  <header>
    <h1>HTML5 is magic for you</h1>
    <p>Try not to do the end of houdini</p>
  </header>
  <p>
    Semantics is the study of the meanings of words and phrases in a language. Semantic elements = elements with a meaning.
    A semantic element clearly describes its meaning to both the browser and the developer.
  </p>
</article>
<footer>
  <p>If you need help</p>
  <p>... try to contact someone on <a href='mailto@sentyourgodto.help'>mailto@sentyourgodto.help</a>.</p>
</footer>
```

Use class & ID names that are practical and make sense to the element you are styling. Reuse classes if you have multiple elements
that are going to be styled the same way. Never reuse an id tag.

```html
<html>
  <body>
    <table>
      <tr class='ark_team' id='lead'>The Architect</tr>
      <tr class='fe_team'>Super Senior</tr>
      <tr class='ui_team'>Graphic Genius</tr>
      <tr class='test_team'>Don't open bug, please...</tr>
    </table>
  </body>
</html>
```

### CSS

> Every time you write inline styles in your markup, a front-end developer somewhere dies - whether it's in a style tag or directly
> in the markup. Don't do it.

Structure your CSS file based on your HTML file. The HTML is the structure of the website. Styling the site or adding functionality before
finishing the structure is like painting a house before the foundation is complete.

Refrain from using inline styles. Though having inline styles doesn’t actually affect the rendering of the code, it presents a readability
and thus maintainability issues as more styles are added.

## Syntax and formatting

- Use multi-line CSS declarations. This helps with version control (diff-ing single line CSS can be a nightmare). Group CSS declarations by
 type - keeping font related styling together, layout styling together etc - and ordered by relevance, not alphabetized.
- All CSS rules should have a space after the selector colon and a trailing semi-colon.
- Selectors should be specified using a simplified version of BEM:

```css
/* Descriptors use camel-casing if more than one word: e.g. twoWords */

.skipToContent {
  color: #000;
}

/* ========= */

/* Child elements use single hyphens: - */

.form-controlGroup {
  font-size: 20px;
}

/* ========= */

/* Modifier element use a double hyphen: -- */

.btn.btn--primary {
  background-color: #008090;
}

/* ========= */

/* Element state: .is- */

.is-active {
  color: #c0c0c0;
}

/* ========= */

/* Sass variables are dash-case */

a {
  color: $color-primary;
}
```

- Use shorthand when specifying multiple values. Remember longhand can be shorter for single values.
- Multi-attribute selectors should go on separate lines.
- Don't over qualify class or ID selectors. Leads to specificity issues further down the line.

### OOCSS

When building components, or modules, try and keep a DRY, OO frame of mind.

Instead of building dozens of unique components, try and spot repeated design patterns and abstract them; build these skeletons as base
'objects' and then peg classes onto these to extend their styling for more unique circumstances.

If you have to build a new component split it into structure and skin; build the structure of the component using very generic classes so
that we can reuse that construct and then use more specific classes to skin it up and add design treatments.

### Javascript

- Use variable names that make sense, for example if you’re grabbing an element by id from your HTML file and storing it in a variable,
  it’s a good practice to use that same name for the variable. It’s also common practice to use [camelCase](https://en.wikipedia.org/wiki/Camel_case)
  for variable names.
- Use indentation for functions, objects and conditionals to make them easier to read and differentiate them from other parts of the code.

``` JavaScript
  let greeting = '';
  let time = getHours();
  const messageDiv = document.getElementById('messageDiv);

  const timeCheckGreeting = () => {
    if (time < 20 ){
      greeting = 'Good day';
    } else {
      greeting = 'Good Evening';
    }
    messageDiv.insertAdjacentHTML(greeting);
  }
```

- In all three cases, commenting is super important. When you analyze a piece of code you can’t tell if it is correct or not unless you know
  what it’s supposed to do. A good comment can tell you what the code is supposed to accomplish but If it is redundant, it means the code
  itself is clear. Comments can also tell you why it functions the way it does.
- Class declarations should start with a capital letter.
- Constants or configuration variables should be at the start of a class and written in CAPS.
- Separate operators/comparators with spacing
- Use braces for logic evaluations. If evaluation execution is simple, keep non-braced logic on a single line e.g:

``` javascript
  // Good
if (i < 10) return true;

// Good
if(foo && foo.bar && foo.bar > 10) {
    foo.baz = foo.bar - 100 * 2.7 + 'rad'
}

// Bad
if(foo && foo.bar && foo.bar > 10)
    foo.baz = foo.bar - 100 * 2.7 + 'rad'

// Bad
if(i < 10)
    return true;

// Bad
if(i < 10)
{
    return true;
}
  ```

- Remap this to self when passing context
- Always use === as a comparator (unless you really need flexible evaluations e.g comparison to null)
- Always add a second radix param to parseInt() to prevent accidental octal issues
- Never bother comparing variables to true/false
- For large loops, either cache the length variable to prevent re-evaluation or use a reverse while loop
- Don't create functions in loops - its slow (and stupid)
- When creating functions with many parameters, pass in an object rather than listing numerous parameters.
- If possible, avoid using bitwise operations unless they really help. If used, document them with comments

## Design for all browsers & devices

The days of designing for strictly desktop screens has long gone. As of 2016, mobile web browsing surpassed browsing on a traditional computer.
The most efficient way to deal with this change is to design a site that can adapt to the size of the viewport, that’s where responsive web
design comes in. The best responsive websites utilize fluid grids, flexible images and specific CSS styling techniques to alter the site’s
design and render it according to the width of the browser.

Some browsers interpret CSS styling in different ways and require their own CSS properties to achieve a specific style. Make sure you cover your bases
and test your site on ALL browsers. Additional information on browser support can be found [here](https://www.w3schools.com/cssref/css3_browsersupport.asp).

## Don’t become dependent on libraries & frameworks

There’s nothing wrong with becoming a master on a specific library or framework, but it’s important not to exclusively use those methods. All frameworks
and libraries are built by the native languages themselves and get updated and phased out constantly. If you have a solid understanding of the native
languages, you can keep pragmatically learning and keep up with the times.

## Be conscious of page speed

While page speed is usually not an issue with smaller sites, more robust and dense sites can and will take longer to load. While some factors are
unavoidable, there are a few main best practices to ensure your website is as size efficient as possible.
Servers and bandwidth are important for site speed, but it’s possible that your front-end can be too bloated even for the fastest server. Image
size is a major factor, as is bloated JavaScript code that could be too slow. Always reduce image size and use a format that can be resized without
losing much quality such as PNG.

Several site speed testers are available to help you identify what elements of your site design are slowing down your application. “Spaghetti” JavaScript
code can slow down the client-side, and large images can slow page load performance. As with responsive design, search engines even take site speed
into consideration for ranking, because slow sites frustrate users. A best practice is to always test your site and ensure its performance is fine tuned.

### Image files

Be conscious of the image sizes you actually need. A large image is going to take a long time to load up. If you’ve got a ton of large images on
your website, you’re adding extra load time for every picture. File format is also important. Browsers can load JPG, PNG, and GIF images nice and
quickly. But, heavy formats like TIFF and BMP are going to increase chunks into your load time.

### Code Density

Optimize your code as much as possible. Large, dense code will slow down your website. Reusing styles for similar elements will help shorten your
CSS files. Keep your Javascript [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don’t repeat yourself). If you find yourself having to write almost the same code over and over, consider
creating a function to do it for you.

### Text Graphics

Avoid using images to display text whenever possible. Images always take up more room than text, even if the text needs a heavy amount of styling.

### Plugins & Packages

Choose your plugins wisely. The more plugins used on your site, the more weight your site has to carry. Some of them may contain other components
you don’t plan to use, which is essentially wasting space. If you do use any plugins or packages, make sure to keep them up to date.

## Don't using outdated or abandoned javascript libraries

Stick to JavaScript libraries that have active support, documentation, and consistent updates by their developers. You don’t have to
only stick with worldwide famous libraries, but you should ensure that the one you do choose will be maintained down the line. If the library is
not supported or maintained years later, you might find yourself in a sticky situation with a dependency that is no longer functional if a
developer abandons his or her project.

These mistakes are common, but very easy to avoid. As a front-end developer, your goal should be to create applications that are easy to use for your
viewers and support site functionality and speed. JavaScript is probably the most difficult front-end technology to streamline, but by using good
libraries and supported code, you can design a front end that doesn’t slow your site down and is highly responsive to mobile devices.

## Repository management

On this project the repository of all sub project, will be managed by a popular git extension (git flow).
Git-flow is a set of git extensions used to provide high-level repository operations for Vincent Driessen's
[branching model](#https://nvie.com/posts/a-successful-git-branching-model/).
Before you start any project, you need to initialize git flow. You can run a shell command `git flow init`, or init it from your GUI client, like Sourcetree. I recommend to use [GitKraken](#https://www.gitkraken.com/), but, feel free to use the one you are most confident with.
In git flow there are 3 types of support branches:

- feature
- release
- hotfix

each of these has a specific purpose and they have rigid rules such as the original branch, the branch in which they are fused, etc.
The supporting branches do not necessarily need to be present on the remote repository except for backup / collaboration. The main distinction about which branch to use and how they are used.

### Feature

Generally they are used to develop new features for the medium to long term. The feature exists as long as there is development, being a branch in its
own right can be merited or abandoned. When the feature is complete it is merited on develop, so the features never have direct interaction with the master.

Branch of origin: develop
Melting Branch: develop
Branch naming: all except for master, develop, release- *,hotfix-*
To start a new feature, exec `git flow feature start my_nw_feature` or use your GUI client. Creates a new branch based on develop and switch on the same branch.
A feature is a new feature that is usually used throughout the project, and it is good practice to make the names speak. For example, authentication.
Avoid type names, feature1, feature2 or menu arrangement. That's a hotfix, and we'll talk about it later.
After some time of hard work and a number of clever commits, our feature is finally done, and you launch teh command `git flow feature finish authentication`.
This command perform the operations of:

- merge of the branch on develop
- cancellation of the branch
- switch on the branch develop

  Most importantly, the "feature finish" command integrates our work back into the main "develop" branch. There, it waits...

...to be thoroughly tested in the broader "develop" context.
...to be released at a later time with all the other features that accumulate in the "develop" branch.
git-flow also cleans up after us: it deletes the (now obsolete) feature branch and checks out the "develop" branch.

### Release

Release management is another important topic that version control deals with. Let's look at how to create and publish releases with git-flow.
Release management is another important topic covered by version control. Let's take a look at how to create and publish git-flow versions.

If you think that the current code on the "develop" branch is ready to be released, then it means that (a) it contains all the new features and fixes
and (b) it has been thoroughly tested, so you are ready to start a new version. You can do that with the command `git flow release start 1.0.0`.

Switched to a new branch 'release/1.0.0'
Note that the release branches are named using the version numbers. In addition to being an obvious choice, this naming scheme has a nice side effect:
git-flow can automatically tag the release appropriately when we finish the release.

With a new release branch, the latest most popular preparations include the version number bump (if the project type takes into account the version number
somewhere in a file) and last-minute adaptations.

When you're ready, it's time to hit the red danger button and finish our release: `git flow release finish 1.0.0`

This triggers a couple of actions:

1. First, git-flow pulls from the remote repository to make sure you are up-to-date.
2. Then, the release content is merged back into both "master" and "develop" (so that not only the production code is up-to-date, but also new feature
3. branches will be based off the latest code).
4. To easily identify and reference it later, the release commit is tagged with the release's name ("1.0.0" in our case).
5. To clean up, the release branch is deleted and we're back on "develop".

From Git's point of view, the release is now finished. Depending on your setup, committing on "master" might have already triggered your deployment
process - or you now manually do anything necessary to get your software product into the hands of your users.

### Hotfix

As thoroughly tested as your releases might be: all too often, just a couple of hours or days later, a little bug might nonetheless show its antennas.
For cases like these, git-flow offers the special "hotfix" workflow (since neither a "feature" branch nor a "release" branch would be appropriate).
If you have one or some bug to fix, launch the command `git flow hotfix start my_first_hotfix` to create an hotfix branch named hotfix/my_first_hotfix.
> Be sure to use names that are referable to the bug

Since we need to fix production code, the hotfix branch is based off of "master".
This is also the most obvious distinction from release branches, which are based off of the "develop" branch. Because you wouldn't want to base a
production hotfix on your (still unstable) develop code...

Just like with a release, however, we bump up our project's version number and - of course - fix that bug!
With our solution committed to the hotfix branch, it's time to execute `git flow hotfix finish my_first_hotfix`

The procedure is very similar to finishing a release:

- The changes are merged both into "master" as well as into "develop" (to make sure the bug doesn't slip into the next release, again).
- The hotfix is tagged for easy reference.
- The branch is deleted and "develop" is checked out again.
- As with a release, now's the time to build / deploy your product (in case this hasn't already been triggered automatically).

#### Last Tips

git-flow doesn't add any functionality on top of Git. It's simply a set of scripts that bundle Git commands into workflows.
However, agreeing on a fixed process makes collaborating in a team much easier: everybody, from the "Git pro" to the "version control newbie", knows how
certain tasks ought to be done.

Keep in mind, though, that you don't have to use git-flow to achieve this: often, after some time and experience, teams notice that they don't need git-flow
anymore. Once the basic parts and goals of a workflow are understood, you're free to define your own.

## Never stop learning

Become an autodidact. Technology is improving at an ever-increasing rate. The tools you use today will drastically change over the course of your career.
Part of being a developer is learning, and it has never been truer. There are tons of free and affordable resources available online. Never stop
learning – you won’t regret it!
