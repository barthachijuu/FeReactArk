# Loading components with @loadeble and its fallback

To load a component asynchronously, you should import with the lodableComponent method, included in the
globalMethods file, create a `Loadable` file by hand or via component/route generators with
the 'Do you want to load resources asynchronously?' option activated.

This is the content of the file by default:

```JSX
import {loadableComponent} from 'Utility/globalMethods';

const Footer = loadableComponent('Footer');
<>
  <Footer />
</>

```

In this case, the app show a quickly 'Loading...' text while loading your component. You can however
make it display a custom loader with an hoc configurationof the method. We recommend to read the
docs on [loadable-components](https://github.com/smooth-code/loadable-components).
