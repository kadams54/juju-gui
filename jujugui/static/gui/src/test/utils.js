/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2012-2013 Canonical Ltd.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3, as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';
// Test utils.

YUI(GlobalConfig).add('juju-tests-utils', function(Y) {
  var jujuTests = Y.namespace('juju-tests');

  jujuTests.utils = {
    makeContainer: function(ctx, id, visibleContainer) {
      // You must pass a context and it must be a valid object.
      if (arguments.length < 1) {
        throw (
            'makeContainer requires a context in order to track containers' +
            'to cleanup.');
      }

      if (typeof ctx !== 'object') {
        throw (
            'makeContainer requires a context in order to track containers' +
            'to cleanup.');
      }

      var container = document.createElement('div');
      if (id) {
        container.setAttribute('id', id);
      }
      document.body.appendChild(container);
      if (visibleContainer !== false) {
        container.style.position = 'absolute';
        container.style.top = '-10000px';
        container.style.left = '-10000px';
      }

      // Add the destroy ability to the test hook context to be run on
      // afterEach automatically.
      ctx._cleanups.push(function() {
        container.remove(true);
        container.remove();
      });

      return container;
    },

    /**
      Create and return a container suitable for rendering the whole app.

      Callers are responsible of removing the container from the document when
      done.

      @method makeAppContainer
      @return {Object} The container element, already attached to the window
        document.
    */
    makeAppContainer: () => {
      const elements = [
        'charmbrowser-container',
        'deployment-bar-container',
        'deployment-container',
        'drag-over-notification-container',
        'env-size-display-container',
        'full-screen-mask',
        'header-breadcrumb',
        'header-search-container',
        'model-actions-container',
        'inspector-container',
        'loading-message',
        'login-container',
        'machine-view',
        'notifications-container',
        'profile-link-container',
        'provider-logo-container',
        'modal-shortcuts',
        'modal-gui-settings',
        'top-page-container',
        'zoom-container'
      ];
      const container = document.createElement('div');
      container.setAttribute('id', 'test-container');
      container.setAttribute('class', 'container');
      elements.forEach(function(id) {
        const node = document.createElement('div');
        node.setAttribute('id', id);
        container.appendChild(node);
      });
      document.body.appendChild(container);
      return container;
    },

    SocketStub: function() {
      // The readyState needs to be defined because we check for its value
      // before sending any requests to avoid errors.
      this.readyState = 1;

      this.messages = [];

      this.close = function() {
        this.messages = [];
      };

      this.transient_close = function() {
        this.onclose();
      };

      this.open = function() {
        this.onopen();
        return this;
      };

      this.msg = function(m) {
        this.onmessage({'data': JSON.stringify(m)});
      };

      this.last_message = function(back) {
        if (!back) {
          back = 1;
        }
        return this.messages[this.messages.length - back];
      };

      this.send = function(m) {
        this.messages.push(JSON.parse(m));
      };

      this.onclose = function() {};
      this.onmessage = function() {};
      this.onopen = function() {};

    },

    getter: function(attributes, default_) {
      return function(name) {
        if (attributes.hasOwnProperty(name)) {
          return attributes[name];
        } else {
          return default_;
        }
      };
    },

    setter: function(attributes) {
      return function(name, value) {
        attributes[name] = value;
      };
    },

    /**
     * Util to load a fixture (typically as 'data/filename.json').
     *
     * @method loadFixture
     * @param {String} url to synchronously load, appended /test/ base url.
     * @param {Boolean} parseJSON when true return will be processed
     *                  as a JSON blob before returning.
     * @return {Object} fixture data resulting from call.
     */
    loadFixture: function(url, parseJson) {
      var tries = 3;
      var response;
      url = GlobalConfig.test_url + url;
      while (true) {
        try {
          const request = new XMLHttpRequest();
          request.open('GET', url, false);
          request.send(null);
          response = request.responseText;
          if (parseJson) {
            response = JSON.parse(response);
          }
          break;
        } catch (e) {
          tries -= 1;
          if (tries <= 0) {
            throw e;
          }
        }
      }
      return response;
    }
  };

}, '0.1.0', {
  requires: [
    'io',
    'node',
    'promise',
    'datasource-local'
  ]
});
