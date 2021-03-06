/**
 * @license
 * Copyright (C) 2020 The Android Open Source Project
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
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

export const htmlTemplate = html`
    <style include="shared-styles">
      :host(.no-left) .sideBySide .left,
      :host(.no-left) .sideBySide .left + td,
      :host(.no-left) .sideBySide .right:not([data-value]),
      :host(.no-left) .sideBySide .right:not([data-value]) + td {
        display: none;
      }
      :host {
        font-family: var(--monospace-font-family, ''), 'Roboto Mono';
        font-size: var(--font-size, var(--font-size-code, 12px));
        line-height: var(--line-height-code, 1.334);
      }

      .thread-group {
        display: block;
        max-width: var(--content-width, 80ch);
        white-space: normal;
        background-color: var(--diff-blank-background-color);
      }
      .diffContainer {
        display: flex;
        font-family: var(--monospace-font-family);
        @apply --diff-container-styles;
      }
      .diffContainer.hiddenscroll {
        margin-bottom: var(--spacing-m);
      }
      table {
        border-collapse: collapse;
        border-right: 1px solid var(--border-color);
        table-layout: fixed;
      }
      .lineNum {
        background-color: var(--diff-blank-background-color);
      }
      .image-diff .gr-diff {
        text-align: center;
      }
      .image-diff img {
        box-shadow: var(--elevation-level-1);
        max-width: 50em;
      }
      .image-diff .right.lineNum {
        border-left: 1px solid var(--border-color);
      }
      .image-diff label,
      .binary-diff label {
        font-family: var(--font-family);
        font-style: italic;
      }
      .diff-row {
        outline: none;
        user-select: none;
      }
      .diff-row.target-row.target-side-left .lineNum.left,
      .diff-row.target-row.target-side-right .lineNum.right,
      .diff-row.target-row.unified .lineNum {
        background-color: var(--diff-selection-background-color);
        color: var(--primary-text-color);
      }
      .content {
        background-color: var(--diff-blank-background-color);
      }
      .contentText {
        background-color: var(--view-background-color);
      }
      .blank {
        background-color: var(--diff-blank-background-color);
      }
      .image-diff .content {
        background-color: var(--diff-blank-background-color);
      }
      .full-width {
        width: 100%;
      }
      .full-width .contentText {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .lineNum,
      .content {
        vertical-align: top;
        white-space: pre;
      }
      .contextLineNum,
      .lineNum {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        color: var(--deemphasized-text-color);
        padding: 0 var(--spacing-m);
        text-align: right;
      }
      .canComment .lineNum {
        cursor: pointer;
      }
      .content {
        /* Set min width since setting width on table cells still
           allows them to shrink. Do not set max width because
           CJK (Chinese-Japanese-Korean) glyphs have variable width */
        min-width: var(--content-width, 80ch);
        width: var(--content-width, 80ch);
      }
      .content.add .contentText .intraline,
      /* If there are no intraline info, consider everything changed */
      .content.add.no-intraline-info .contentText,
      .delta.total .content.add .contentText {
        background-color: var(--dark-add-highlight-color);
      }
      .content.add .contentText {
        background-color: var(--light-add-highlight-color);
      }
      .content.remove .contentText .intraline,
      /* If there are no intraline info, consider everything changed */
      .content.remove.no-intraline-info .contentText,
      .delta.total .content.remove .contentText  {
        background-color: var(--dark-remove-highlight-color);
      }
      .content.remove .contentText {
        background-color: var(--light-remove-highlight-color);
      }

      /* dueToRebase */
      .dueToRebase .content.add .contentText .intraline,
      .delta.total.dueToRebase .content.add .contentText {
        background-color: var(--dark-rebased-add-highlight-color);
      }
      .dueToRebase .content.add .contentText {
        background-color: var(--light-rebased-add-highlight-color);
      }
      .dueToRebase .content.remove .contentText .intraline,
      .delta.total.dueToRebase .content.remove .contentText {
        background-color: var(--dark-rebased-remove-highlight-color);
      }
      .dueToRebase .content.remove .contentText {
        background-color: var(--light-remove-add-highlight-color);
      }

      /* ignoredWhitespaceOnly */
      .ignoredWhitespaceOnly .content.add .contentText .intraline,
      .delta.total.ignoredWhitespaceOnly .content.add .contentText,
      .ignoredWhitespaceOnly .content.add .contentText,
      .ignoredWhitespaceOnly .content.remove .contentText .intraline,
      .delta.total.ignoredWhitespaceOnly .content.remove .contentText,
      .ignoredWhitespaceOnly .content.remove .contentText {
        background-color: var(--view-background-color);
      }

      .content .contentText:empty:after {
        /* Newline, to ensure empty lines are one line-height tall. */
        content: '\\A';
      }
      .contextControl {
        background-color: var(--diff-context-control-background-color);
        border: 1px solid var(--diff-context-control-border-color);
        color: var(--diff-context-control-color);
      }
      .contextControl gr-button {
        display: inline-block;
        text-decoration: none;
        vertical-align: top;
        line-height: var(--line-height-mono, 18px);
        --gr-button: {
          color: var(--diff-context-control-color);
          padding: var(--spacing-xxs) var(--spacing-l);
        }
      }
      .contextControl gr-button iron-icon {
        /* should match line-height of gr-button */
        width: var(--line-height-mono, 18px);
        height: var(--line-height-mono, 18px);
      }
      .contextControl td:not(.lineNum) {
        text-align: center;
      }
      .displayLine .diff-row.target-row td {
        box-shadow: inset 0 -1px var(--border-color);
      }
      .br:after {
        /* Line feed */
        content: '\\A';
      }
      .tab {
        display: inline-block;
      }
      .tab-indicator:before {
        color: var(--diff-tab-indicator-color);
        /* >> character */
        content: '\\00BB';
        position: absolute;
      }
      /* Is defined after other background-colors, such that this
         rule wins in case of same specificity. */
      .trailing-whitespace,
      .content .trailing-whitespace,
      .trailing-whitespace .intraline,
      .content .trailing-whitespace .intraline {
        border-radius: var(--border-radius, 4px);
        background-color: var(--diff-trailing-whitespace-indicator);
      }
      #diffHeader {
        background-color: var(--table-header-background-color);
        border-bottom: 1px solid var(--border-color);
        color: var(--link-color);
        padding: var(--spacing-m) 0 var(--spacing-m) 48px;
      }
      #loadingError,
      #sizeWarning {
        display: none;
        margin: var(--spacing-l) auto;
        max-width: 60em;
        text-align: center;
      }
      #loadingError {
        color: var(--error-text-color);
      }
      #sizeWarning gr-button {
        margin: var(--spacing-l);
      }
      #loadingError.showError,
      #sizeWarning.warn {
        display: block;
      }
      .target-row td.blame {
        background: var(--diff-selection-background-color);
      }
      col.blame {
        display: none;
      }
      td.blame {
        display: none;
        padding: 0 var(--spacing-m);
        white-space: pre;
      }
      :host(.showBlame) col.blame {
        display: table-column;
      }
      :host(.showBlame) td.blame {
        display: table-cell;
      }
      td.blame > span {
        opacity: 0.6;
      }
      td.blame > span.startOfRange {
        opacity: 1;
      }
      td.blame .blameDate {
        font-family: var(--monospace-font-family);
        color: var(--link-color);
        text-decoration: none;
      }
      .full-width td.blame {
        overflow: hidden;
        width: 200px;
      }
      /** Support the line length indicator **/
      .full-width td.content .contentText {
        /* Base 64 encoded 1x1px of #ddd */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+x8AAr8B3gzOjaQAAAAASUVORK5CYII=');
        background-position: var(--line-limit) 0;
        background-repeat: repeat-y;
      }
      .newlineWarning {
        color: var(--deemphasized-text-color);
        text-align: center;
      }
      .newlineWarning.hidden {
        display: none;
      }
      .lineNum.COVERED {
         background-color: var(--coverage-covered, #e0f2f1);
      }
      .lineNum.NOT_COVERED {
        background-color: var(--coverage-not-covered, #ffd1a4);
      }
      .lineNum.PARTIALLY_COVERED {
        background: linear-gradient(to right bottom, var(--coverage-not-covered, #ffd1a4) 0%,
                                                     var(--coverage-not-covered, #ffd1a4) 50%,
                                                     var(--coverage-covered, #e0f2f1) 50%,
                                                     var(--coverage-covered, #e0f2f1) 100%);
      }

      /** BEGIN: Select and copy for Polymer 2 */
      /** Below was copied and modified from the original css in gr-diff-selection.html */
      .content,
      .contextControl,
      .blame {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .selected-left:not(.selected-comment) .side-by-side .left + .content .contentText,
      .selected-right:not(.selected-comment) .side-by-side .right + .content .contentText,
      .selected-left:not(.selected-comment) .unified .left.lineNum ~ .content:not(.both) .contentText,
      .selected-right:not(.selected-comment) .unified .right.lineNum ~ .content .contentText,
      .selected-left.selected-comment .side-by-side .left + .content .message,
      .selected-right.selected-comment .side-by-side .right + .content .message :not(.collapsedContent),
      .selected-comment .unified .message :not(.collapsedContent),
      .selected-blame .blame {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      /** Make comments selectable when selected */
      .selected-left.selected-comment ::slotted(gr-comment-thread[comment-side=left]),
      .selected-right.selected-comment ::slotted(gr-comment-thread[comment-side=right]) {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      /** END: Select and copy for Polymer 2 */

      .whitespace-change-only-message {
        background-color: var(--diff-context-control-background-color);
        border: 1px solid var(--diff-context-control-border-color);
        text-align: center;
      }
    </style>
    <style include="gr-syntax-theme">
      /* Workaround for empty style block - see https://github.com/Polymer/tools/issues/408 */
    </style>
    <style include="gr-ranged-comment-theme">
      /* Workaround for empty style block - see https://github.com/Polymer/tools/issues/408 */
    </style>
    <div id="diffHeader" hidden\$="[[_computeDiffHeaderHidden(_diffHeaderItems)]]">
      <template is="dom-repeat" items="[[_diffHeaderItems]]">
        <div>[[item]]</div>
      </template>
    </div>
    <div class\$="[[_computeContainerClass(loggedIn, viewMode, displayLine)]]" on-tap="_handleTap">
      <gr-diff-selection diff="[[diff]]">
        <gr-diff-highlight id="highlights" logged-in="[[loggedIn]]" comment-ranges="{{_commentRanges}}">
          <gr-diff-builder id="diffBuilder" comment-ranges="[[_commentRanges]]" coverage-ranges="[[coverageRanges]]" project-name="[[projectName]]" diff="[[diff]]" path="[[path]]" change-num="[[changeNum]]" patch-num="[[patchRange.patchNum]]" view-mode="[[viewMode]]" is-image-diff="[[isImageDiff]]" base-image="[[baseImage]]" layers="[[layers]]" revision-image="[[revisionImage]]">
            <table id="diffTable" class\$="[[_diffTableClass]]" role="presentation"></table>

            <template is="dom-if" if="[[showNoChangeMessage(loading, prefs, _diffLength)]]">
              <div class="whitespace-change-only-message">
                This file only contains whitespace changes.
                Modify the whitespace setting to see the changes.
              </div>
            </template>
          </gr-diff-builder>
        </gr-diff-highlight>
      </gr-diff-selection>
    </div>
    <div class\$="[[_computeNewlineWarningClass(_newlineWarning, loading)]]">
      [[_newlineWarning]]
    </div>
    <div id="loadingError" class\$="[[_computeErrorClass(errorMessage)]]">
      [[errorMessage]]
    </div>
    <div id="sizeWarning" class\$="[[_computeWarningClass(_showWarning)]]">
      <p>
        Prevented render because "Whole file" is enabled and this diff is very
        large (about [[_diffLength]] lines).
      </p>
      <gr-button on-click="_handleLimitedBypass">
        Render with limited context
      </gr-button>
      <gr-button on-click="_handleFullBypass">
        Render anyway (may be slow)
      </gr-button>
    </div>
`;
