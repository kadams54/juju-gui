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

YUI.add('inspector-relation-details', function() {

  juju.components.InspectorRelationDetails = React.createClass({
    propTypes: {
      relation: React.PropTypes.object.isRequired
    },

    render: function() {
      var relation = this.props.relation;
      return (
        <div className="inspector-relation-details">
          <div className="inspector-relation-details__properties">
            <p className="inspector-relation-details__property">
              Interface: {relation.interface || 'none'}
            </p>
            <p className="inspector-relation-details__property">
              Name: {relation.near.name || 'none'}
            </p>
            <p className="inspector-relation-details__property">
              Role: {relation.near.role || 'none'}
            </p>
            <p className="inspector-relation-details__property">
              Scope: {relation.scope || 'none'}
            </p>
          </div>
        </div>
      );
    }

  });

}, '0.1.0', { requires: []});
