import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';
import Heading from 'react-styleguidist/lib/rsg-components/Heading';
// Import default implementation from react-styleguidist using the full path
import DefaultSectionsRenderer from 'react-styleguidist/lib/rsg-components/Sections/SectionsRenderer';

const pkg = require('Root/package.json');

const styles = ({ fontFamily, space }) => ({
  headingSpacer: {
    marginBottom: space[2],
  },
  descriptionText: {
    marginTop: space[0],
    fontFamily: fontFamily.base,
  },
});
/*eslint-disable*/
export function SectionsRenderer({ classes, children }) {
	return (
		<div>
			{children.length > 0 && (
				<div className={classes.headingSpacer}>
					<Heading level={1}>Nexi {pkg.name} Components</Heading>
				</div>
			)}
			<DefaultSectionsRenderer>{children}</DefaultSectionsRenderer>
		</div>
	);
}

SectionsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(SectionsRenderer);
