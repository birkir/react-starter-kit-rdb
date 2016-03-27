import React, { Component, PropTypes } from 'react';
import { DefaultSession } from 'react-rethinkdb';
import s from './App.css';
import Header from 'header/Header';
import Footer from 'footer/Footer';

/**
 * App container component
 */
class App extends Component {

  /**
   * Server/Client session getter
   * @return {object} Child context object
   */
  getChildContext() {
    return {
      session: (process.env.CLIENT ? DefaultSession : this.props.params.session),
    };
  }

  /**
   * Render Method
   * @return {Component}
   */
  render() {
    return (
      <div className={s.host}>
        <Header />
        <div className={s.container}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  params: PropTypes.object,
};

App.childContextTypes = {
  session: PropTypes.object,
};

export default App;
