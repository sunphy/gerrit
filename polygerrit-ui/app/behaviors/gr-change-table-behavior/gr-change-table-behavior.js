/**
 * @license
 * Copyright (C) 2016 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(window) {
  'use strict';

  window.Gerrit = window.Gerrit || {};

  /** @polymerBehavior Gerrit.ChangeTableBehavior */
  Gerrit.ChangeTableBehavior = {
    properties: {
      columnNames: {
        type: Array,
        value: [
          'Subject',
          'Status',
          'Owner',
          'Assignee',
          'Reviewers',
          'Comments',
          'Repo',
          'Branch',
          'Updated',
          'Size',
        ],
        readOnly: true,
      },
    },

    /**
     * Returns the complement to the given column array
     *
     * @param {Array} columns
     * @return {!Array}
     */
    getComplementColumns(columns) {
      return this.columnNames.filter(column => !columns.includes(column));
    },

    /**
     * @param {string} columnToCheck
     * @param {!Array} columnsToDisplay
     * @return {boolean}
     */
    isColumnHidden(columnToCheck, columnsToDisplay) {
      if ([columnsToDisplay, columnToCheck].some(arg => arg === undefined)) {
        return false;
      }
      return !columnsToDisplay.includes(columnToCheck);
    },

    /**
     * Is the column disabled by a server config or experiment? For example the
     * assignee feature might be disabled and thus the corresponding column is
     * also disabled.
     *
     * @param {string} column
     * @param {Object} config
     * @param {!Array<string>} experiments
     * @return {boolean}
     */
    isColumnEnabled(column, config, experiments) {
      if (!config || !config.change) return true;
      if (column === 'Assignee') return !!config.change.enable_assignee;
      if (column === 'Comments') return experiments.includes('comments-column');
      if (column === 'Reviewers') return !!config.change.enable_attention_set;
      return true;
    },

    /**
     * @param {!Array<string>} columns
     * @param {Object} config
     * @param {!Array<string>} experiments
     * @return {!Array<string>} enabled columns, see isColumnEnabled().
     */
    getEnabledColumns(columns, config, experiments) {
      return columns.filter(
          col => this.isColumnEnabled(col, config, experiments));
    },

    /**
     * The Project column was renamed to Repo, but some users may have
     * preferences that use its old name. If that column is found, rename it
     * before use.
     *
     * @param {!Array<string>} columns
     * @return {!Array<string>} If the column was renamed, returns a new array
     *     with the corrected name. Otherwise, it returns the original param.
     */
    getVisibleColumns(columns) {
      const projectIndex = columns.indexOf('Project');
      if (projectIndex === -1) { return columns; }
      const newColumns = columns.slice(0);
      newColumns[projectIndex] = 'Repo';
      return newColumns;
    },
  };

  // eslint-disable-next-line no-unused-vars
  function defineEmptyMixin() {
    // This is a temporary function.
    // Polymer linter doesn't process correctly the following code:
    // class MyElement extends Polymer.mixinBehaviors([legacyBehaviors], ...) {...}
    // To workaround this issue, the mock mixin is declared in this method.
    // In the following changes, legacy behaviors will be converted to mixins.

    /**
     * @polymer
     * @mixinFunction
     */
    Gerrit.ChangeTableMixin = base =>
      class extends base {
        static get properties() {
          return {
            columnNames: {
              type: Array,
            },
          };
        }

        isColumnHidden(columnToCheck, columnsToDisplay) {}
      };
  }
})(window);
