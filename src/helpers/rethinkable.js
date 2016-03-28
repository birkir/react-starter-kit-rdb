import _get from 'lodash/get';
import React, { PropTypes } from 'react';
import { BaseMixin } from 'react-rethinkdb';

/**
 * Rethinkable class
 * @param  {Component}
 * @return {void}
 */
const Rethinkable = component => {
	// Find session in params or context
  const sessionGetter = c => {
    if (c.context && c.context.session) {
      return c.context.session;
    }
    return null;
  };

  // Get class prototypee
  const proto = BaseMixin.call(component.prototype, sessionGetter);
  const unmount = proto.componentWillUnmount;

  if (!component.contextTypes) {
    component.contextTypes = {}; // eslint-disable-line
  }

  // Require session contextType as default
  component.contextTypes.session = PropTypes.object.isRequired; // eslint-disable-line

  proto.componentWillUnmount = function componentWillUnmount() {
    unmount.call(this);
  };

  for (const key in proto) { // eslint-disable-line
    const _proto = component.prototype[key];
    component.prototype[key] = function componentCallback(...args) { // eslint-disable-line
      proto[key].call(this, ...args);
      if (_proto) {
        _proto.call(this, ...args);
      }
    };
  }
};

/**
 * Get React ID
 * @param  {Component} React component
 * @return {string}    Unique identifier for component
 */
const getReactId = component => {
  const reactId = _get(component, '_reactInternalInstance._rootNodeID');
  if (reactId) {
    return reactId;
  }

  // Fallback to component constructor name
  return _get(component, 'constructor.name');
};

/**
 * Render data as script tag
 * @param  {Component} React component
 * @param  {object}    Data to render
 * @return {Component}
 */
const setServerData = (component, obj) => {
  if (_isClient) {
    // Nothing for clients
    return null;
  }

  return (
    <script
      type="application/json"
      id={`data_${getReactId(component)}`}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
    />
  );
};

/**
 * Fetch server data from script tag
 * @param  {Component} React component
 * @return {object}
 */
const getServerData = component => {
  if (process.env.CLIENT) {
    const scriptNode = document.getElementById(`data_${getReactId(component)}`);
    if (scriptNode) {
      try {
        return JSON.parse(scriptNode.innerHTML);
      } catch (err) {
        throw err;
      }
    }
  }
  return {};
};

export default Rethinkable;

export const serverData = {
  get: getServerData,
  set: setServerData,
};

