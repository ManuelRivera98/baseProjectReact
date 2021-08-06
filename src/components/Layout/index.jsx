import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <h1>This is NavBar</h1>
    {children}
    <h2>This is Footer</h2>
  </>
);

Layout.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default Layout;
