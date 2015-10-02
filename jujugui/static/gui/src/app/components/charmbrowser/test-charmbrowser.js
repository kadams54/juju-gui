/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2015 Canonical Ltd.

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

var juju = {components: {}};
var testUtils = React.addons.TestUtils;

chai.config.includeStack = true;
chai.config.truncateThreshold = 0;

describe('Charmbrowser', function() {

  beforeAll(function(done) {
    // Mock these out since we just do shallow renders.
    juju.components.Panel = function() {};
    // By loading this file it adds the component to the juju components.
    YUI().use('charmbrowser-component', function() { done(); });
  });

  it('displays the search results when the app state calls for it', function() {
    var query = 'django';
    var appState = {
      sectionC: {
        metadata: {
          activeComponent: 'search-results',
          search: query
        }
      }};
    var changeState = sinon.stub();
    var addService = sinon.stub();
    var charmstore = sinon.stub();
    var output = jsTestUtils.shallowRender(
      <juju.components.Charmbrowser
        appState={appState}
        changeState={changeState}
        charmstore={charmstore}
        addService={addService} />);
    assert.deepEqual(output,
        <juju.components.Panel
          instanceName="white-box"
          visible={true}>
          <juju.components.SearchResults
            changeState={changeState}
            query={query}
            charmstore={charmstore} />
        </juju.components.Panel>);
  });

  it('displays the mid-point when the app state calls for it', function() {
    var appState = {
      sectionC: {
        metadata: {
          activeComponent: 'mid-point'
        }
      }};
    var clearState = sinon.stub();
    var changeState = sinon.stub();
    var output = jsTestUtils.shallowRender(
      <juju.components.Charmbrowser
        appState={appState}
        changeState={changeState} />);
    assert.deepEqual(output,
        <juju.components.Panel
          instanceName="mid-point-panel"
          visible={true}>
          <juju.components.MidPoint
            changeState={changeState} />
        </juju.components.Panel>);
  });

  it('displays entity details when the app state calls for it', function() {
    var id = 'foobar';
    var appState = {
      sectionC: {
        metadata: {
          activeComponent: 'entity-details',
          id: id
        }
      }};
    var clearState = sinon.stub();
    var addService = sinon.stub();
    var output = jsTestUtils.shallowRender(
      <juju.components.Charmbrowser
        appState={appState}
        addService={addService} />);
    assert.deepEqual(output,
        <juju.components.Panel
          instanceName="white-box"
          visible={true}>
          <juju.components.EntityDetails
            id={id} />
        </juju.components.Panel>);
  });
});
