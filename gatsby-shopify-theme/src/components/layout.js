import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import SEO from './SEO';
import Cart from './Cart';
import SideMenu from './SideMenu';
import Search from './Search';
import Footer from './Footer';
import theme from './styles/theme';

const Layout = ({ children }) => (
  <>
    <link
      href="https://fonts.googleapis.com/css?family=Playfair+Display:900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Spartan&display=swap"
      rel="stylesheet"
    ></link>
    <ThemeProvider theme={theme}>
      <div className="bg-white antialiased">
        <SEO />
        <Cart />
        {/* <SideMenu /> */}
        <Search />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};
