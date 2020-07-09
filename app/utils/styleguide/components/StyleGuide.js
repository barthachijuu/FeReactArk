
import React from 'react';
import PropTypes from 'prop-types';
import LogoRenderer from 'react-styleguidist/lib/rsg-components/Logo';
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';
import Version from 'react-styleguidist/lib/rsg-components/Version';
import logo from './logo.svg';
import nexi from './nexi.svg';

const pkg = require('Root/package.json');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

const xsmall = '@media (max-width: 600px)';

const styles = ({
  font,
  base,
  light,
  link,
  // baseBackground,
  color,
  sidebarWidth,
  mq,
  space,
  maxWidth,
  fontFamily,
  fontSize,
}) => ({
  root: {
    minHeight: '100vh',
    color: base,
    backgroundColor: '#f6f7f8',
  },
  hasSidebar: _defineProperty({
    paddingLeft: sidebarWidth,
  }, mq.small, {
    paddingLeft: 0,
  }),
  sidebar: _defineProperty({
    backgroundColor: link,
    border: [[color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: sidebarWidth,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
  }, mq.small, {
    position: 'static',
    width: 'auto',
    borderWidth: [[1, 0, 0, 0]],
    paddingBottom: space[0],
  }),
  header: {
    color: '#fff',
    backgroundColor: link,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    [xsmall]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  nav: {
    marginLeft: 'auto',
    marginRight: '-0.5em',
    [xsmall]: {
      margin: [
        [10, 0, 0],
      ],
    },
  },
  headerLink: {
    '&, &:link, &:visited': {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      color: '#efefef',
    },
    '&:hover, &:active': {
      color: '#fff',
      cursor: 'pointer',
    },
  },
  content: {
    maxWidth,
    padding: [
      [15, 0],
    ],
    margin: [
      [0, 'auto'],
    ],
    [mq.small]: {
      padding: 15,
    },
    display: 'block',
  },
  logo: {
    padding: space[2],
    borderBottom: [[1, color.border, 'solid']],
  },
  components: {
    overflow: 'auto', // To prevent the pane from growing out of the screen
  },
  footer: {
    display: 'block',
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
  version: {
    color: '#FFFFFF',
    margin: [[5, 0, 0, 0]],
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '2.5em',
    marginLeft: '-0.5em',
  },
  imageNexi: {
    width: '6em',
    marginLeft: '1.5em',
  },
});

export function StyleGuideRenderer({
  homepageUrl,
  classes,
  children,
  title,
  toc,
}) {
  /*eslint-disable*/
  return (
    <>
    <div className={`${classes.root} ${classes.hasSidebar}`}>
       <header className= { classes.header }>
        <div className= { classes.content }>
          <div className= { classes.bar }>
            <LogoRenderer>
              <img className={classes.image} src={logo} alt="React logo" />
              { title }
            </LogoRenderer>
            <nav className= { classes.nav }>
              <a className= { classes.headerLink } href= "https://github.com/styleguidist/react-styleguidist/tree/master/docs"> Docs </a>
              <a className= { classes.headerLink } href= "https://github.com/styleguidist/react-styleguidist" > GitHub </a>
              <a className= { classes.headerLink } href= "https://gitter.im/styleguidist/styleguidist" > Gitter </a>
              </nav>
            </div>
          </div>
        </header>
        <main className={classes.content}>
          { children }
          <footer className={classes.footer}>
            <Markdown text={ `Created with [React Styleguidist](${homepageUrl}) ❤️` } />
          </footer>
        </main>
        <div className={classes.sidebar}>
          <div className={classes.logo}>
            <img className={classes.imageNexi} src={nexi} alt="Nexi logo" />
            <div className={classes.version}>{pkg.name} Components List</div>
          </div>
          <div className={classes.version}><Version>V {pkg.version}</Version></div>
          {toc}
        </div>
      </div>
    </>
  );
}

StyleGuideRenderer.propTypes= {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
  version: PropTypes.string,
};

export default Styled(styles)(StyleGuideRenderer);
