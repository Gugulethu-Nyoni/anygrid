"use strict";

import { resolveEditor } from './editors/index.js';




const ANYGRID_CSS = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');


/* ==================================================== */
/* ANYGRID CSS - COMPLETE CONSOLIDATED VERSION          */
/* All selectors scoped to .anygrid-container           */
/* Protected from external dashboard CSS interference   */
/* ==================================================== */

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

/* ==================================================== */
/* THEME DEFINITIONS                                    */
/* ==================================================== */

.default-theme {
    --background-dark: #121212;
    --background-light: #1e1e1e;
    --text-light: #e0e0e0;
    --border-color: #333333;
    --input-background: #1e1e1e;
    --input-background-disabled: #2a2a2a;
    --label-color: #a0a0a0;
    --radio-checkbox-accent: #666666;
    --button-background: #252525;
    --button-background-hover: #383838;
    --edit-background: #444444;
    --delete-background: #884d4d;
    --text-contrast: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.5);
    --primary-color: #444444;
    --primary-color-rgb: 68, 68, 68;
    --secondary-color: #666666;
    --secondary-color-rgb: 102, 102, 102;
}

.dark-theme {
    --background-dark: #121212;
    --background-light: #1e1e1e;
    --text-light: #e0e0e0;
    --border-color: #333333;
    --input-background: #1e1e1e;
    --input-background-disabled: #2a2a2a;
    --label-color: #a0a0a0;
    --radio-checkbox-accent: #666666;
    --button-background: #252525;
    --button-background-hover: #383838;
    --edit-background: #444444;
    --delete-background: #884d4d;
    --text-contrast: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.5);
    --primary-color: #444444;
    --primary-color-rgb: 68, 68, 68;
    --secondary-color: #666666;
    --secondary-color-rgb: 102, 102, 102;
}

.light-theme {
    --background-dark: #ededeb;
    --background-light: #f9f9f9;
    --text-light: #333333;
    --border-color: #cccccc;
    --input-background: #ffffff;
    --input-background-disabled: #e0e0e0;
    --label-color: #5a2d81;
    --radio-checkbox-accent: #5a2d81;
    --button-background: #8a8787;
    --button-background-hover: #666;
    --edit-background: #e91e63;
    --delete-background: #dc3545;
    --text-contrast: #ffffff;
    --shadow-color: rgba(79, 77, 77, 0.1);
    --primary-color: #4f4d4d;
    --primary-color-rgb: 79, 77, 77;
    --secondary-color: #5a2d81;
    --secondary-color-rgb: 90, 45, 129;
}

.pink-theme {
    --background-dark: #fce4ec;
    --background-light: #f8bbd0;
    --text-light: #880e4f;
    --border-color: #f48fb1;
    --input-background: #ffffff;
    --input-background-disabled: #f1f8e9;
    --label-color: #c2185b;
    --radio-checkbox-accent: #c2185b;
    --button-background: #c2185b;
    --button-background-hover: #ad1457;
    --edit-background: #ad1457;
    --delete-background: #d32f2f;
    --text-contrast: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --primary-color: #c2185b;
    --primary-color-rgb: 194, 24, 91;
    --secondary-color: #ad1457;
    --secondary-color-rgb: 173, 20, 87;
}

.indigo-theme {
    --background-dark: #2f3640;
    --background-light: #3b4151;
    --text-light: #f7f7f7;
    --border-color: #434a54;
    --input-background: #2f3640;
    --input-background-disabled: #3b4151;
    --label-color: #8b94b3;
    --radio-checkbox-accent: #8b94b3;
    --button-background: #452b8b;
    --button-background-hover: #3b2f6b;
    --edit-background: #452b8b;
    --delete-background: #e74c3c;
    --text-contrast: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --primary-color: #452b8b;
    --primary-color-rgb: 69, 43, 139;
    --secondary-color: #3b2f6b;
    --secondary-color-rgb: 59, 47, 107;
}

.blue-theme {
    --background-dark: #87ceeb;
    --background-light: #add8e6;
    --text-light: #1a237e;
    --border-color: #87ceeb;
    --input-background: #f7f7f7;
    --input-background-disabled: #e5e5e5;
    --label-color: #2196f3;
    --radio-checkbox-accent: #2196f3;
    --button-background: #03a9f4;
    --button-background-hover: #039be5;
    --edit-background: #03a9f4;
    --delete-background: #e74c3c;
    --text-contrast: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --primary-color: #03a9f4;
    --primary-color-rgb: 3, 169, 244;
    --secondary-color: #039be5;
    --secondary-color-rgb: 3, 155, 229;
}

.dark-orange-theme {
    --background-dark: #2f2f2f;
    --background-light: #3c3c3c;
    --text-light: #ffffff;
    --border-color: #666;
    --input-background: #3c3c3c;
    --input-background-disabled: #4c4c4c;
    --label-color: #ffa07a;
    --radio-checkbox-accent: #ffa07a;
    --button-background: #ff9900;
    --button-background-hover: #e68f00;
    --edit-background: #ff9900;
    --delete-background: #e74c3c;
    --text-contrast: #000000;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --primary-color: #ff9900;
    --primary-color-rgb: 255, 153, 0;
    --secondary-color: #e68f00;
    --secondary-color-rgb: 230, 143, 0;
}

.green-theme {
    --background-dark: #f2f9f2;
    --background-light: #e5e5e5;
    --text-light: #2f4f2f;
    --border-color: #c6efce;
    --input-background: #f7fff7;
    --input-background-disabled: #e5e5e5;
    --label-color: #87b087;
    --radio-checkbox-accent: #87b087;
    --button-background: #004d00;
    --button-background-hover: #003300;
    --button-text-color: #ffffff;
    --edit-background: #004d00;
    --delete-background: #990000;
    --text-contrast: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --primary-color: #004d00;
    --primary-color-rgb: 0, 77, 0;
    --secondary-color: #003300;
    --secondary-color-rgb: 0, 51, 0;
}

/* ==================================================== */
/* CONTAINER - ISOLATED FROM DASHBOARD                 */
/* ==================================================== */

.anygrid-container {
    width: 100%;
    max-width: 95%;
    min-width: 0;
    box-sizing: border-box;

    border-radius: 0.75rem;
    overflow: hidden;

    box-shadow: 0 4px 6px -1px var(--shadow-color),
                0 2px 4px -2px var(--shadow-color);

    background-color: var(--background-dark);
    margin: 1rem auto;

    display: flex;
    flex-direction: column;
}

/* ==================================================== */
/* TABLE WRAPPER - ISOLATED                            */
/* ==================================================== */

.anygrid-container .anygrid-table-wrapper {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;

    overflow-x: auto !important;
    overflow-y: auto !important;

    max-height: 70vh;

    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;

    position: relative;
}

/* ==================================================== */
/* TABLE - ISOLATED FROM DASHBOARD                     */
/* ==================================================== */

.anygrid-container .anygrid-table {
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;

    border-collapse: collapse;
    border-spacing: 0;

    table-layout: auto;

    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;

    background-color: var(--background-dark);
    color: var(--text-light);

    height: auto;
    max-height: none;
}

/* ==================================================== */
/* TABLE HEADER - STICKY & ISOLATED                    */
/* ==================================================== */

.anygrid-container .anygrid-table thead {
    position: sticky;
    top: 0;
    z-index: 10;
}

.anygrid-container .anygrid-table thead tr {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: var(--input-background);
    box-shadow: 0 1px 3px var(--shadow-color);
}

.anygrid-container .anygrid-table thead tr.sticky-active {
    box-shadow: 0 4px 6px -1px var(--shadow-color),
                0 2px 4px -2px var(--shadow-color);
}

.anygrid-container .anygrid-table th {
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
}

/* ==================================================== */
/* TABLE ROWS - RESTORE TABLE-ROW LAYOUT               */
/* ==================================================== */

.anygrid-container .anygrid-table tbody tr {
    display: table-row !important;
    position: static !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    transform: none !important;

    border-bottom: 1px solid var(--border-color);

    transition: transform 0.2s ease,
                box-shadow 0.2s ease,
                background-color 0.2s ease;
}

.anygrid-container .anygrid-table tbody tr:last-child {
    border-bottom: none;
}

.anygrid-container .anygrid-table tbody tr:nth-child(even) {
    background-color: var(--background-light);
}

.anygrid-container .anygrid-table tbody tr:hover {
    background-color: var(--button-background-hover);
    color: var(--text-contrast);
}

/* ==================================================== */
/* TABLE CELLS - RESTORE TABLE-CELL LAYOUT             */
/* ==================================================== */

.anygrid-container .anygrid-table th,
.anygrid-container .anygrid-table td {
    display: table-cell !important;
    position: static !important;

    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;

    box-sizing: border-box;
    vertical-align: middle;
    line-height: normal;

    border: none;
    text-align: left;
    padding: 0.75rem 1rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    min-width: 120px;
    max-width: 200px;
}

/* ==================================================== */
/* STICKY FIRST COLUMN - PRESERVED                     */
/* ==================================================== */

.anygrid-container .anygrid-table th:first-child,
.anygrid-container .anygrid-table td:first-child {
    position: sticky !important;
    left: 0;
    background-color: var(--input-background);
    z-index: 15;
    min-width: 80px;
}

.anygrid-container .anygrid-table tbody tr td:first-child {
    background-color: var(--background-dark);
}

.anygrid-container .anygrid-table tbody tr:nth-child(even) td:first-child {
    background-color: var(--background-light);
}

/* ==================================================== */
/* SEARCH CONTAINER - ISOLATED                         */
/* ==================================================== */

.anygrid-container .search-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--background-dark);
    border-bottom: 1px solid var(--border-color);
    flex-wrap: wrap;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
}

.anygrid-container input.anygrid-search-input,
.anygrid-container select.items-per-page {
    background-color: var(--input-background);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    color: var(--text-light);
    font-size: 0.875rem;
    padding: 0.6rem 0.8rem;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    height: 2.5rem;
    line-height: 1.5;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239CA3AF'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.25rem;
}

.anygrid-container input.anygrid-search-input {
    max-width: 18rem;
    color: var(--text-light);
}

.anygrid-container input.anygrid-search-input:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.25);
}

.anygrid-container input.anygrid-search-input::placeholder {
    color: var(--label-color);
    opacity: 0.7;
}

.anygrid-container select.items-per-page {
    color: var(--text-light);
    max-width: 10rem;
}

.anygrid-container select.items-per-page:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.25);
}

/* CSV & Excel Export Buttons */
.anygrid-container .anygrid-export-csv,
.anygrid-container .anygrid-export-excel {
    background-color: var(--button-background);
    color: var(--text-contrast);
    border: 1px solid var(--border-color);
    padding: 0.6rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 1px 2px 0 var(--shadow-color);
}

.anygrid-container .anygrid-export-csv::before,
.anygrid-container .anygrid-export-excel::before {
    content: "↓";
    font-size: 1rem;
    line-height: 1;
}

.anygrid-container .anygrid-export-csv:hover,
.anygrid-container .anygrid-export-excel:hover {
    background-color: var(--button-background-hover);
    border-color: var(--button-background-hover);
    box-shadow: 0 2px 4px 0 var(--shadow-color);
}

.anygrid-container .anygrid-export-csv:disabled,
.anygrid-container .anygrid-export-excel:disabled {
    background-color: var(--input-background-disabled);
    color: var(--label-color);
    cursor: not-allowed;
    border-color: var(--border-color);
    box-shadow: none;
}

/* ==================================================== */
/* PAGINATION - ISOLATED                              */
/* ==================================================== */

.anygrid-container .pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--background-dark);
    border-top: 1px solid var(--border-color);
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.anygrid-container .pagination-info {
    font-size: 0.875rem;
    color: var(--text-light);
    font-family: 'Montserrat', sans-serif;
}

.anygrid-container .pagination-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.anygrid-container .pagination-button {
    background-color: var(--button-background);
    border: none;
    border-radius: 50%;
    color: var(--text-contrast);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    width: 2.5rem;
    height: 2.5rem;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s;
    box-shadow: 0 2px 4px 0 var(--shadow-color);
}

.anygrid-container .pagination-button.active {
    background-color: var(--primary-color);
    color: var(--text-contrast);
    box-shadow: 0 4px 8px 0 rgba(var(--primary-color-rgb), 0.3);
    transform: translateY(-1px);
}

.anygrid-container .pagination-button:hover:not(.active) {
    background-color: var(--button-background-hover);
    color: var(--text-contrast);
    box-shadow: 0 3px 6px 0 var(--shadow-color);
    transform: translateY(-1px);
}

.anygrid-container .pagination-button:disabled {
    background-color: var(--input-background-disabled);
    color: var(--label-color);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

/* ==================================================== */
/* ACTION BUTTONS - ISOLATED                           */
/* ==================================================== */

.anygrid-container .edit,
.anygrid-container .delete {
    border-radius: 0.375rem;
    padding: 0.4rem 0.75rem;
    color: var(--text-contrast);
    text-decoration: none;
    font-size: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 1px 2px 0 var(--shadow-color);
}

.anygrid-container .edit {
    background-color: var(--edit-background);
}

.anygrid-container .delete {
    background-color: var(--delete-background);
}

.anygrid-container .edit:hover {
    background-color: color-mix(in srgb, var(--edit-background) 80%, black);
    box-shadow: 0 2px 4px 0 var(--shadow-color);
}

.anygrid-container .delete:hover {
    background-color: color-mix(in srgb, var(--delete-background) 80%, black);
    box-shadow: 0 2px 4px 0 var(--shadow-color);
}

.anygrid-container .edit::before {
    content: '✎';
}

.anygrid-container .delete::before {
    content: '🗑';
}

/* ==================================================== */
/* SORTABLE COLUMNS - ISOLATED                         */
/* ==================================================== */

.anygrid-container .anygrid-column-sortable {
    cursor: pointer;
    position: relative;
}

.anygrid-container .anygrid-column-sortable:hover::after {
    opacity: 1;
}

.anygrid-container .anygrid-column-sortable.asc::after {
    content: '↑';
    opacity: 1;
}

.anygrid-container .anygrid-column-sortable.desc::after {
    content: '↓';
    opacity: 1;
}

/* ==================================================== */
/* STATUS BADGES - ISOLATED                            */
/* ==================================================== */

.anygrid-container .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.anygrid-container .status-active {
    background-color: rgba(46, 125, 50, 0.1);
    color: #2E7D32;
    border: 1px solid rgba(46, 125, 50, 0.3);
}

.anygrid-container .status-inactive {
    background-color: rgba(244, 67, 54, 0.1);
    color: #F44336;
    border: 1px solid rgba(244, 67, 54, 0.3);
}

/* ==================================================== */
/* SCROLLBAR - ISOLATED                               */
/* ==================================================== */

.anygrid-container .anygrid-table-wrapper::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}

.anygrid-container .anygrid-table-wrapper::-webkit-scrollbar-track {
    background: var(--background-light);
    border-radius: 4px;
}

.anygrid-container .anygrid-table-wrapper::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
}

.anygrid-container .anygrid-table-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
}

.anygrid-container .anygrid-table-wrapper {
    scrollbar-width: thin;
    scrollbar-color: var(--border-color) var(--background-light);
}

/* ==================================================== */
/* GENERAL UTILITIES - ISOLATED                        */
/* ==================================================== */

.anygrid-container .anygrid-table td * {
    max-width: 100%;
}

.anygrid-container .anygrid-table tbody tr {
    transition: transform 0.2s ease,
                box-shadow 0.2s ease,
                background-color 0.2s ease;
}

/* ==================================================== */
/* MODAL CSS - ISOLATED                               */
/* ==================================================== */

.anygrid-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1000;
    font-family: 'Montserrat', sans-serif;
}

.modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    color: #333333;
    width: 90%;
    max-width: 600px;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    z-index: 1001;
    max-height: 90vh;
    overflow-y: auto;
    border: 1px solid #cccccc;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1000;
}

.modal-body {
    padding: 1.5rem 0;
}

.modal-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #cccccc;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.record-field {
    display: flex;
    margin-bottom: 1.25rem;
    align-items: flex-start;
    flex-wrap: wrap;
}

.record-field strong,
.record-field label {
    flex: 0 0 150px;
    font-weight: 600;
    color: #5a2d81;
    padding-right: 1rem;
}

.record-field span {
    flex: 1;
    word-break: break-word;
    color: #333333;
}

.record-field.non-editable {
    background-color: #f5f5f5;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    cursor: not-allowed;
    opacity: 0.9;
}

.record-field.non-editable strong,
.record-field.non-editable span {
    color: #8a8787;
    opacity: 0.8;
}

.record-field:not(.non-editable) {
    cursor: pointer;
}

.record-field input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 0.9rem;
    background-color: #ffffff;
    color: #333333;
    transition: all 0.2s;
}

.record-field input:focus {
    border-color: #4f4d4d;
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 77, 77, 0.25);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: #5a2d81;
    padding: 0.25rem;
    line-height: 1;
    transition: color 0.2s;
}

.modal-close:hover {
    color: #333333;
}

.anygrid-btn-delete,
.btn-save,
.retry-btn {
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s ease, box-shadow 0.2s ease;
    color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(79, 77, 77, 0.1);
}

.anygrid-btn-delete,
.retry-btn {
    background-color: #dc3545;
}

.btn-save {
    background-color: #8a8787;
}

.anygrid-btn-delete:hover,
.retry-btn:hover {
    background-color: #c82333;
    box-shadow: 0 2px 4px 0 rgba(79, 77, 77, 0.1);
}

.btn-save:hover {
    background-color: #666666;
    box-shadow: 0 2px 4px 0 rgba(79, 77, 77, 0.1);
}

.anygrid-modal.fade .modal-content {
    animation: fadeIn 0.3s ease-out;
}

.anygrid-modal.slide .modal-content {
    animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

@keyframes slideIn {
    from {
        transform: translate(-50%, -40px);
        opacity: 0;
    }
    to {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}

.modal-status {
    padding: 1rem;
    margin-top: 1.5rem;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: 500;
    font-size: 0.9rem;
}

.modal-status.loading {
    background: rgba(79, 77, 77, 0.1);
    color: #4f4d4d;
}

.modal-status.success {
    background: #e6f4ea;
    color: #137333;
}

.modal-status.error {
    background: #fce8e6;
    color: #d93025;
}

.anygrid-container .delete-confirmation,
.delete-error {
    text-align: center;
    padding: 2.5rem;
    font-size: 1rem;
}

.delete-confirmation {
    color: #137333;
}

.delete-error {
    color: #d93025;
}

.checkmark,
.crossmark {
    width: 70px;
    height: 70px;
    margin: 0 auto 2rem;
    display: block;
}

.checkmark circle {
    stroke: #4CAF50;
    stroke-width: 2.5;
}

.checkmark path {
    stroke: #4CAF50;
    stroke-width: 2.5;
    stroke-linecap: round;
    animation: checkmark 0.6s ease-in-out forwards;
}

.crossmark circle {
    stroke: #F44336;
    stroke-width: 2.5;
}

.crossmark path {
    stroke: #F44336;
    stroke-width: 2.5;
    stroke-linecap: round;
    animation: crossmark 0.6s ease-in-out forwards;
}

@keyframes checkmark {
    0% {
        stroke-dashoffset: 100px;
        stroke-dasharray: 100px;
    }
    100% {
        stroke-dashoffset: 0;
        stroke-dasharray: 100px;
    }
}

@keyframes crossmark {
    0% {
        stroke-dashoffset: 100px;
        stroke-dasharray: 100px;
    }
    100% {
        stroke-dashoffset: 0;
        stroke-dasharray: 100px;
    }
}

/* ==================================================== */
/* ROW STATES - ISOLATED                              */
/* ==================================================== */

.anygrid-container .row-deleting {
    animation: pulseWarning 0.8s infinite alternate;
}

.anygrid-container .row-updated {
    animation: highlightUpdate 2s ease-out;
}

@keyframes pulseWarning {
    from {
        background-color: var(--background-dark);
    }
    to {
        background-color: color-mix(in srgb, var(--delete-background) 15%, var(--background-dark));
    }
}

@keyframes highlightUpdate {
    from {
        background-color: color-mix(in srgb, var(--primary-color) 15%, var(--background-dark));
    }
    to {
        background-color: transparent;
    }
}

/* ==================================================== */
/* MOBILE RESPONSIVE LAYOUT (768px and below)          */
/* ==================================================== */

@media (max-width: 768px) {
    /* Mobile search container */
    .anygrid-container .search-container {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }

    .anygrid-container input.anygrid-search-input,
    .anygrid-container select.items-per-page,
    .anygrid-container .anygrid-export-csv,
    .anygrid-container .anygrid-export-excel {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        min-height: 44px;
    }

    .anygrid-container input.anygrid-search-input,
    .anygrid-container select.items-per-page {
        max-width: 100% !important;
        text-align: left;
        font-size: 1rem;
    }

    .anygrid-container input.anygrid-search-input::placeholder {
        text-align: left;
    }

    .anygrid-container select.items-per-page option {
        text-align: left;
    }

    .anygrid-container .anygrid-export-csv,
    .anygrid-container .anygrid-export-excel {
        width: 100%;
        justify-content: center;
        padding: 0.75rem;
        margin-top: 0.5rem;
        text-align: center;
    }

    .anygrid-container .anygrid-export-csv {
        margin-bottom: 0.5rem;
    }

    /* Override desktop table-row with flex/card layout */
    .anygrid-container .anygrid-table-wrapper {
        overflow-x: hidden !important;
        overflow-y: visible !important;
        max-height: none !important;
    }

    .anygrid-container .anygrid-table,
    .anygrid-container .anygrid-table tbody,
    .anygrid-container .anygrid-table tr,
    .anygrid-container .anygrid-table td {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        min-width: unset !important;
        max-width: unset !important;
        white-space: normal !important;
    }

    .anygrid-container .anygrid-table thead {
        display: none !important;
    }

    .anygrid-container .anygrid-table tbody tr {
        display: flex !important;
        flex-direction: column !important;
        padding: 1.25rem !important;
        margin-bottom: 1rem !important;
        background-color: var(--background-light) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 0.75rem !important;
        box-shadow: 0 4px 8px 0 var(--shadow-color) !important;
        position: relative !important;
        overflow: hidden !important;
        gap: 0.75rem !important;
        transition: all 0.25s ease !important;
    }

    /* Remove alternating row colors on mobile */
    .anygrid-container .anygrid-table tbody tr:nth-child(even) {
        background-color: var(--background-light) !important;
    }

    /* Hover effect for cards */
    .anygrid-container .anygrid-table tbody tr:hover {
        background-color: var(--button-background) !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 6px 12px 0 var(--shadow-color) !important;
    }

    /* Style each cell as a field within the card - RIGHT ALIGNED */
    .anygrid-container .anygrid-table td {
        padding: 0 !important;
        border: none !important;
        border-bottom: 1px solid rgba(var(--primary-color-rgb), 0.15) !important;
        padding-bottom: 0.75rem !important;
        margin-bottom: 0.75rem !important;
        text-align: right !important;
        display: block !important;
        position: relative !important;
        min-width: unset !important;
        max-width: unset !important;
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: normal !important;
    }

    .anygrid-container .anygrid-table td:last-child {
        border-bottom: none !important;
        padding-bottom: 0 !important;
        margin-bottom: 0 !important;
    }

    /* Style the cell content - RIGHT ALIGNED */
    .anygrid-container .anygrid-table td > * {
        width: 100% !important;
        word-break: break-word !important;
        font-size: 0.95rem !important;
        line-height: 1.4 !important;
        color: var(--text-light) !important;
        text-align: right !important;
    }

    /* Style links within cells */
    .anygrid-container .anygrid-table td a {
        color: var(--primary-color) !important;
        text-decoration: none !important;
        font-weight: 500 !important;
        display: inline-block !important;
        text-align: right !important;
        width: auto !important;
    }

    .anygrid-container .anygrid-table td a:hover {
        color: var(--secondary-color) !important;
        text-decoration: underline !important;
    }

    /* Style strong elements within cells */
    .anygrid-container .anygrid-table td strong {
        color: var(--secondary-color) !important;
        font-weight: 600 !important;
        text-align: right !important;
    }

    /* Status badges on mobile */
    .anygrid-container .status-badge {
        padding: 0.2rem 0.5rem !important;
        font-size: 0.7rem !important;
        margin-left: auto !important;
    }

    /* Action buttons styling - right aligned */
    .anygrid-container .anygrid-table td .edit,
    .anygrid-container .anygrid-table td .delete {
        margin-left: auto !important;
        margin-right: 0 !important;
        text-align: center !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-width: 44px !important;
        min-height: 44px !important;
        padding: 0.5rem 1rem !important;
        font-size: 0.875rem !important;
    }

    /* Stack action buttons */
    .anygrid-container .anygrid-table td .edit + .delete {
        margin-left: 0.5rem !important;
        margin-top: 0.25rem !important;
        display: inline-flex !important;
    }

    /* Reset sticky positioning on mobile */
    .anygrid-container .anygrid-table th:first-child,
    .anygrid-container .anygrid-table td:first-child {
        position: static !important;
        background-color: unset !important;
        min-width: unset !important;
        z-index: auto !important;
    }

    /* Reset sticky header on mobile */
    .anygrid-container .anygrid-table thead tr {
        position: static !important;
        z-index: auto !important;
    }

    /* Hide sort indicators on mobile */
    .anygrid-container .anygrid-column-sortable {
        display: none !important;
    }

    /* Adjust container for mobile */
    .anygrid-container {
        margin: 0.75rem auto !important;
        max-width: 100% !important;
        border-radius: 0.75rem !important;
        padding: 0.75rem !important;
    }

    /* Adjust pagination for mobile */
    .anygrid-container .pagination-wrapper {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 1rem !important;
        padding: 1rem !important;
    }

    .anygrid-container .pagination-buttons {
        justify-content: center !important;
        gap: 0.5rem !important;
    }

    .anygrid-container .pagination-button {
        width: 2.5rem !important;
        height: 2.5rem !important;
        font-size: 0.875rem !important;
        min-width: 44px !important;
        min-height: 44px !important;
    }

    .anygrid-container .pagination-info {
        text-align: center !important;
    }
}

/* ==================================================== */
/* VERY SMALL SCREENS (480px and below)                 */
/* ==================================================== */

@media (max-width: 480px) {
    .anygrid-container .anygrid-table tbody tr {
        padding: 1rem !important;
        margin-bottom: 0.75rem !important;
        gap: 0.5rem !important;
    }

    .anygrid-container .anygrid-table td {
        padding-bottom: 0.5rem !important;
        margin-bottom: 0.5rem !important;
    }

    .anygrid-container .anygrid-table td > * {
        font-size: 0.875rem !important;
    }

    /* Stack buttons horizontally when in same cell */
    .anygrid-container .anygrid-table td .edit + .delete {
        margin-left: 0.5rem !important;
        margin-top: 0 !important;
    }

    /* Adjust container padding */
    .anygrid-container {
        padding: 0.5rem !important;
    }

    /* Adjust pagination buttons */
    .anygrid-container .pagination-button {
        width: 2.25rem !important;
        height: 2.25rem !important;
        font-size: 0.8125rem !important;
    }
}

/* ==================================================== */
/* MEDIA QUERIES FOR DIFFERENT DESKTOP SIZES            */
/* ==================================================== */

/* Small desktop/laptop */
@media (min-width: 769px) and (max-width: 1024px) {
    .anygrid-container {
        max-width: 98%;
    }

    .anygrid-container .anygrid-table th,
    .anygrid-container .anygrid-table td {
        min-width: 100px;
        max-width: 180px;
        padding: 0.6rem 0.8rem;
    }
}

/* Large desktop */
@media (min-width: 1025px) {
    .anygrid-container {
        max-width: 90%;
    }

    .anygrid-container .anygrid-table th,
    .anygrid-container .anygrid-table td {
        min-width: 140px;
        max-width: 220px;
    }
}

/* Very large desktop */
@media (min-width: 1440px) {
    .anygrid-container {
        max-width: 85%;
    }

    .anygrid-container .anygrid-table th,
    .anygrid-container .anygrid-table td {
        min-width: 150px;
        max-width: 250px;
    }
}

`;


class AnyGrid {
  constructor(data, columns, options = {}) {
    // Inject styles unless disabled
    if (!options.disableStyles) {
      this._injectStyles();
    }
    
    this.data = data;
    this.dataApiEndPoint = options.dataApiEndPoint || null;
    this.totalRecords = data.length;
    this.columns = columns;
    this.itemsPerPage = options.initialItemsPerPage || 10;
    this.currentPage = 1;
    this.tbody = null;
    this.searchInput = null;
    this.paginationContainer = null;
    this.filteredData = this.data;
    this.sortingOrder = {};
    this.dataTableId = this.generateUniqueId('anygrid-datatable');
    this.paginationContainerId = this.generateUniqueId('anygrid-pagination');
    this.searchInputId = this.generateUniqueId('search-input');
    this.itemsPerPageId = this.generateUniqueId('items-per-page');
    this.gridContainerId = options.gridContainerId || 'anygrid';
    this.disableStyles = options.disableStyles || false;

    // NEW: Store field metadata for editor system
    this.fieldMetadata = options.fieldMetadata || { fields: {} };

    // AnyGrid Default Settings
    const defaultFeatures = {
      // Core Grid Features
      search: true,
      sort: true,
      actions: true,
      pagination: true,
      itemsPerPage: true,
      dynamicHeaders: true,
      mode: 'datagrid',
      theme: 'light',
      initialItemsPerPage: 10,
      
      // Modal Features
      gridModal: false,
      modalConfig: {
        editable: false,
        nonEditableFields: ['id'],
        hiddenFields: ['metadata'],
        deletable: false,
        animation: 'fade',
        closeOnOutsideClick: true,
        confirmDelete: true,
        confirmEdit: true
      }
    };

    // Merging user defined features with defaults
    this.features = {
      ...defaultFeatures,
      ...options,
      modalConfig: {
        ...defaultFeatures.modalConfig,
        ...(options.modalConfig || {})
      }
    };

    // Initialize the data grid FIRST (creates HTML elements)
    this.initializeDataGrid();

    // THEN set up search input (only if search is enabled) - MOVED AFTER initializeDataGrid()
    if (this.features.search) {
      this.searchInput = document.getElementById(`${this.searchInputId}`);
      // Add null check for safety
      if (this.searchInput) {
        this.searchInput.addEventListener('input', this.searchTable.bind(this));
      } else {
        console.warn('Search input element not found');
      }
    }

    // Apply theme (updated - no longer fetches external CSS)
    if (options.themeColor) {
      this.applyDynamicTheme(options.themeColor, this.gridContainerId);
    } else if (this.features.theme) {
      let theme = this.features.theme;
      //if (theme === 'light') theme = 'default';
      this.applyTheme(theme, this.gridContainerId);
    } else {
      this.applyTheme('default', this.gridContainerId);
    }

    // Edit state for modal
    this._editState = {
      originalRecord: null,
      pendingChanges: {}
    };

    // Modal initialization (also after initializeDataGrid)
    if (this.features.gridModal) {
      this._initModalStructure();
      this._setupRowClickHandlers();

      // Add null check for modal elements
      const deleteBtn = this.modalElement?.querySelector('.anygrid-btn-delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          this._handleDeleteRecord();
        });
      }
    }
  }
  
  // CLOSE CONSTRUCTOR HERE


 // Method to inject CSS into the page
  _injectStyles() {
    // Check if styles are already injected
    if (document.getElementById('anygrid-styles')) {
      return;
    }
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'anygrid-styles';
    styleElement.textContent = ANYGRID_CSS;
    
    // Insert at the beginning of head to ensure it loads first
    document.head.insertBefore(styleElement, document.head.firstChild);
  }



  // UPDATED: Theme application methods
applyTheme(theme, gridContainerId) {
  // Get injected anyGrid styles
  const stylesheet = document.getElementById('anygrid-styles');

  if (!stylesheet) {
    console.error("Injected anyGrid styles not found (id='anygrid-styles')");
    return;
  }

  // Read CSS directly from <style>
  const cssText = stylesheet.textContent;

  // Extract theme-specific CSS rules
  const themeRules = cssText.match(
    new RegExp(`\\.${theme}-theme\\s*{([^}]*)}`, 'i')
  );

  if (!themeRules) {
    console.error(`Theme rules for '${theme}' not found in injected styles.`);
    return;
  }

  const themeCSS = themeRules[1].trim();
  const gridContainer = document.getElementById(gridContainerId);

  if (!gridContainer) {
    console.error(`Grid container with ID '${gridContainerId}' not found.`);
    return;
  }

  // Apply theme class
  gridContainer.classList.add(`${theme}-theme`);

  // Inject scoped override style
  const scopedStyleId = `anygrid-theme-${gridContainerId}`;

  // Prevent duplicate theme injection
  if (!document.getElementById(scopedStyleId)) {
    const clonedStyle = document.createElement('style');
    clonedStyle.id = scopedStyleId;
    clonedStyle.textContent = `
      #${gridContainerId} {
        ${themeCSS}
      }
    `;

    gridContainer.parentNode.insertBefore(clonedStyle, gridContainer);
  }

  console.log(`Applied '${theme}' theme to grid container: ${gridContainerId}`);
}

  // UPDATED: Dynamic theme application
  applyDynamicTheme(color, gridContainerId) {
    const gridContainer = document.getElementById(gridContainerId);
    if (!gridContainer) {
      console.error(`Grid container with ID '${gridContainerId}' not found.`);
      return;
    }

    // Remove any existing theme classes
    const themeClasses = Array.from(gridContainer.classList).filter(cls => 
      cls.endsWith('-theme')
    );
    themeClasses.forEach(cls => gridContainer.classList.remove(cls));

    // Add dynamic theme class
    gridContainer.classList.add('dynamic-theme');

    // Generate CSS variables based on the provided color
    const primaryColor = this.hexToRgb(color);
    const style = document.createElement('style');
    style.id = 'anygrid-dynamic-theme';
    
    // Remove existing dynamic theme if it exists
    const existingStyle = document.getElementById('anygrid-dynamic-theme');
    if (existingStyle) existingStyle.remove();

    // Calculate theme colors - mostly using light theme values with accent color for key elements
    const themeCSS = `
      .dynamic-theme {
        --background-dark: #ededeb; /* Keep light theme value */
        --background-light: #f9f9f9; /* Keep light theme value */
        --text-light: #333333; /* Keep light theme value */
        --border-color: #cccccc; /* Keep light theme value */
        --input-background: #ffffff; /* Keep light theme value */
        --input-background-disabled: #e0e0e0; /* Keep light theme value */
        --label-color: ${color}; /* Use theme color */
        --radio-checkbox-accent: ${color}; /* Use theme color */
        --button-background: ${this.lightenColor(color, 20)}; /* Very light version of theme color */
        --button-background-hover: ${this.lightenColor(color, 25)};
        --edit-background: #e91e63; /* Keep light theme value (red) */
        --delete-background: #dc3545; /* Keep light theme value (red) */
        --text-contrast: #ffffff; /* Keep light theme value */
        --shadow-color: rgba(79, 77, 77, 0.1); /* Keep light theme value */
        --primary-color: ${color}; /* Use theme color */
        --primary-color-rgb: ${primaryColor};
        --hover-bg: ${this.lightenColor(color, 90)}; /* Very subtle hover effect */
        
        /* Additional variables for consistency */
        --focus-shadow: 0 0 0 0.2rem ${this.hexToRgb(color, 0.25)};
        --link-color: ${color};
        --link-hover-color: ${this.lightenColor(color, 30)};
      }
    `;

    style.textContent = themeCSS;
    document.head.appendChild(style);
}
  // Helper function to lighten a color
  lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1)}`;
  }


  darkenColor(hex, percent) {
    const f = parseInt(hex.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      "#" +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
      .toString(16)
      .slice(1)
    );
  };

  // Helper function to convert hex to rgb
  hexToRgb(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return alpha === 1 
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }


// ==============================================
// NEW: METADATA-DRIVEN EDITOR METHODS
// ==============================================

/**
 * Get effective field metadata (server metadata + column overrides)
 * @param {string} fieldName - The field name to look up
 * @returns {Object} Effective editor metadata
 */
_getFieldMetadata(fieldName) {
  const base = this.fieldMetadata?.fields?.[fieldName] || {};
  const rawEditor = base.editor;

  // Accept both:
  //   editor: "text"
  //   editor: { type: "text", ... }
  const normalizedEditor = typeof rawEditor === 'string'
    ? { type: rawEditor }
    : { ...(rawEditor || {}) };

  const column = this.columns?.find(c => c.name === fieldName);
  const columnEditor = column?.editor || {};

  const merged = {
    ...normalizedEditor,
    ...columnEditor
  };

  // Guarantee a valid type
  if (!merged.type) {
    merged.type = 'text';
  }

  return {
    ...base,
    editor: merged
  };
}

/**
 * Resolve editor class from registry
 * @param {string} editorType - The editor type (e.g., 'text', 'number')
 * @returns {Class|null} Editor class
 */
_resolveEditor(editorType) {
  return resolveEditor(editorType);
}

/**
 * Create and mount editor in field - uses currentRecord for raw value
 */
_createAndMountEditor(fieldElement, metadata, EditorClass) {
  if (fieldElement._editor) {
    fieldElement._editor.focus();
    return;
  }

  const fieldName = fieldElement.dataset.field;

  const currentValue = this.currentRecord
    ? this.currentRecord[fieldName]
    : null;

  const editor = new EditorClass({
    value: currentValue,
    metadata: metadata.editor,
    onCommit: (newValue) => {
      this._commitEditorValue(
        fieldElement,
        fieldName,
        newValue
      );
    }
  });

  const editorElement = editor.render();

  const wrapper = document.createElement('div');
  wrapper.className = 'anygrid-editor-wrapper';
  wrapper.appendChild(editorElement);

  // Enter commits the active field for all editor types.
  // Textareas retain normal Enter/newline behaviour.
  const handleEditorKeydown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    if (event.target.tagName === 'TEXTAREA') {
      return;
    }

    event.preventDefault();

    const pendingValue =
      this._editState?.pendingChanges?.[fieldName];

    if (pendingValue !== undefined) {
      this._saveSingleField(
        fieldElement,
        fieldName
      );
    }
  };

  wrapper.addEventListener(
    'keydown',
    handleEditorKeydown
  );

  const valueElement =
    fieldElement.querySelector('.field-value');

  if (!valueElement) {
    console.warn(
      `Field value element not found for "${fieldName}".`
    );
    return;
  }

  valueElement.replaceChildren(wrapper);

  fieldElement._editor = editor;
  fieldElement._editing = true;
  fieldElement.dataset.editing = 'true';
  fieldElement._editorWrapper = wrapper;

  setTimeout(() => {
    editor.focus();
  }, 0);

  wrapper.addEventListener('focusout', (event) => {
    const nextTarget = event.relatedTarget;

    // Focus is still inside this editor.
    if (nextTarget && wrapper.contains(nextTarget)) {
      return;
    }

    // Allow focus to move to the field-level Save button.
setTimeout(() => {
      if (!fieldElement.isConnected) return;
      if (!fieldElement._editing) return;

      this._handleEditorBlur(
        fieldElement,
        fieldName
      );
    }, 0);
  });
}

_handleEditorBlur(fieldElement, fieldName) {
  const hasPending =
    this._editState.pendingChanges[fieldName] !== undefined;

  // Mark the editor as no longer active immediately so a second
  // focusout/click cannot trigger another save while the request runs.
  fieldElement._editing = false;

  if (hasPending) {
    this._saveSingleField(
      fieldElement,
      fieldName
    );
  } else {
    fieldElement._editor = null;
    fieldElement._editorWrapper = null;
  }
}

/**
 * Save the active field when the user clicks/focuses
 * outside the field currently being edited.
 */
_setupEditorOutsideClickSave() {
  this._removeEditorOutsideClickSave();

  this._editorOutsideClickHandler = (event) => {
    const activeField = this.modalElement?.querySelector(
      '.record-field[data-editing="true"]'
    );

    if (!activeField) {
      return;
    }

    // Interaction remains inside the active field.
    if (activeField.contains(event.target)) {
      return;
    }

    const fieldName = activeField.dataset.field;

    if (
      this._editState?.pendingChanges &&
      this._editState.pendingChanges[fieldName] !== undefined
    ) {
      this._saveSingleField(
        activeField,
        fieldName
      );
    }
  };

  document.addEventListener(
    'pointerdown',
    this._editorOutsideClickHandler,
    true
  );
}

/**
 * Remove the document-level editor outside-click handler.
 */
_removeEditorOutsideClickSave() {
  if (!this._editorOutsideClickHandler) {
    return;
  }

  document.removeEventListener(
    'pointerdown',
    this._editorOutsideClickHandler,
    true
  );

  this._editorOutsideClickHandler = null;
}


/**
 * Fallback editor when registry not available
 */
_setupFallbackEditor(field) {
  field.style.cursor = 'pointer';
  field.addEventListener('click', () => {
    const valueElement = field.querySelector('.field-value');
    const currentValue = valueElement.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    
    const save = () => {
      this._commitEditorValue(field, field.dataset.field, input.value);
    };
    
    input.addEventListener('blur', save);
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') save();
    });
    
    valueElement.innerHTML = '';
    valueElement.appendChild(input);
    input.focus();
    input.select();
  });
}

// ============================================================
// CELL SAVE SYSTEM - NEW METHODS
// ============================================================

/**
 * Compare two values for equality (handles objects/arrays)
 */
_isValueChanged(original, current) {
  if (original === current) return false;
  if (original === null || current === null) return original !== current;
  if (typeof original === 'object' && typeof current === 'object') {
    return JSON.stringify(original) !== JSON.stringify(current);
  }
  return true;
}

/**
 * Update the main data collection with a record change
 * Used after successful persistence to keep data in sync
 */
_updateDataRecord(recordId, changes) {
  if (!recordId || !changes) return;

  const index = this.data.findIndex(item => item.id === recordId);
  if (index !== -1) {
    this.data[index] = { ...this.data[index], ...changes };
  }

  const filteredIndex = this.filteredData.findIndex(item => item.id === recordId);
  if (filteredIndex !== -1) {
    this.filteredData[filteredIndex] = { ...this.filteredData[filteredIndex], ...changes };
  }
}

/**
 * Update Save All Changes button with pending count
 */
_updateSaveButtonStatus() {
  const footer = this.modalElement?.querySelector('.modal-footer');
  const saveBtn = footer?.querySelector('.btn-save');
  if (!saveBtn) return;

  const count = this._editState?.pendingChanges ?
    Object.keys(this._editState.pendingChanges).length : 0;

  if (count > 0) {
    saveBtn.textContent = `Save All Changes (${count} pending)`;
    saveBtn.classList.add('btn-save-pending');
    saveBtn.disabled = false;
  } else {
    saveBtn.textContent = 'Save All Changes';
    saveBtn.classList.remove('btn-save-pending');
    saveBtn.disabled = false;
  }
}

/**
 * Show save icon on field when pending change exists
 */
/**
 * Remove cell save control from field
 */
/**
 * Disable all cell save buttons
 */
/**
 * Remove all cell save controls
 */
/**
 * Extract meaningful error message from backend response
 * Handles error as string, object, or nested structures
 */
_extractErrorMessage(error) {
  if (!error) {
    return 'Unable to save this field.';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error.error === 'string') {
    return error.error;
  }

  if (typeof error.error === 'object' && error.error !== null) {
    if (typeof error.error.message === 'string') {
      return error.error.message;
    }
    if (typeof error.error.error === 'string') {
      return error.error.error;
    }
  }

  if (typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error.details === 'string') {
    return error.details;
  }

  if (typeof error.msg === 'string') {
    return error.msg;
  }

  if (error.status) {
    const statusMessages = {
      400: 'The update could not be processed.',
      401: 'Authentication is required. Please sign in again.',
      403: 'You do not have permission to update this record.',
      404: 'The record could not be found.',
      409: 'The record has changed since it was loaded.',
      422: 'The submitted value is not valid.',
      500: 'The server could not process the update.'
    };
    return statusMessages[error.status] || `Update failed (${error.status}).`;
  }

  return 'Unable to save this field.';
}

/**
 * Commit editor value - central state management
 */
_commitEditorValue(fieldElement, fieldName, newValue) {
  if (this.currentRecord) {
    this.currentRecord[fieldName] = newValue;
  }

  const originalValue =
    this._editState.originalRecord?.[fieldName];

  if (this._isValueChanged(originalValue, newValue)) {
    this._editState.pendingChanges[fieldName] = newValue;
    fieldElement.classList.add('has-pending-change');
  } else {
    delete this._editState.pendingChanges[fieldName];
    fieldElement.classList.remove('has-pending-change');
  }

  this._updateSaveButtonStatus();
}

/**
 * Save a single field via PUT
 * Uses existing PUT endpoint with single-field payload
 */
/**
 * Replace the active editor with the formatted display value
 * after successful persistence.
 */
_replaceEditorWithDisplay(fieldElement, fieldName, value) {
  const column =
    this.columns?.find(column => column.name === fieldName);

  let displayValue = value;

  if (column?.render) {
    displayValue = column.render(
      value,
      this.currentRecord
    );
  } else {
    displayValue =
      value !== null && value !== undefined
        ? String(value)
        : 'null';
  }

  const valueElement =
    fieldElement.querySelector('.field-value');

  if (valueElement) {
    valueElement.textContent = displayValue;
  }

  // Clear editor lifecycle state only after persistence succeeds.
  delete fieldElement.dataset.editing;

  fieldElement._editor = null;
  fieldElement._editorWrapper = null;
  fieldElement._editing = false;
}

_showFieldStatus(
  fieldElement,
  status,
  message = ''
) {
  const existing =
    fieldElement.querySelector('.field-status');

  if (existing) {
    existing.remove();
  }

  const statusEl =
    document.createElement('span');

  statusEl.className =
    `field-status field-status-${status}`;

  if (status === 'saving') {
    statusEl.textContent = 'Saving...';
  }

  if (status === 'saved') {
    statusEl.textContent = '✓ Saved';
    fieldElement.classList.add('cell-saved');

    setTimeout(() => {
      if (statusEl.isConnected) {
        statusEl.remove();
      }

      fieldElement.classList.remove(
        'has-pending-change',
        'cell-saved'
      );

      delete fieldElement.dataset.editing;

      fieldElement._editor = null;
      fieldElement._editorWrapper = null;
    }, 2000);
  }

  if (status === 'error') {
    statusEl.textContent =
      `✗ ${message || 'Unable to save this field.'}`;
  }

  const valueElement =
    fieldElement.querySelector('.field-value');

  if (valueElement) {
    valueElement.after(statusEl);
  } else {
    fieldElement.appendChild(statusEl);
  }
}

async _saveSingleField(fieldElement, fieldName) {
  const valueToSave =
    this._editState.pendingChanges[fieldName];

  if (valueToSave === undefined) {
    return;
  }

  const existingStatus =
    fieldElement.querySelector('.field-status');

  if (existingStatus) {
    existingStatus.remove();
  }

  fieldElement.classList.add('cell-saving');

  this._showFieldStatus(
    fieldElement,
    'saving'
  );

  try {
    await this._recordUpdateApi(
      { [fieldName]: valueToSave },
      'PUT'
    );

    const recordId =
      this.currentRecord?.id;

    this._editState.originalRecord[fieldName] =
      valueToSave;

    if (recordId) {
      this._updateDataRecord(
        recordId,
        { [fieldName]: valueToSave }
      );
    }

    /*
     * Only clear the pending value if the user has not
     * changed the field again while the request was running.
     */
    if (
      this._editState.pendingChanges[fieldName] ===
      valueToSave
    ) {
      delete this._editState.pendingChanges[fieldName];
    }

    this._replaceEditorWithDisplay(
      fieldElement,
      fieldName,
      valueToSave
    );

    fieldElement.classList.remove(
      'cell-saving'
    );

    this._showFieldStatus(
      fieldElement,
      'saved'
    );

    this.renderData();

    if (recordId) {
      this._highlightUpdatedRow(recordId);
    }

    this._updateSaveButtonStatus();

  } catch (error) {
    fieldElement.classList.remove(
      'cell-saving'
    );

    this._showFieldStatus(
      fieldElement,
      'error',
      this._extractErrorMessage(error)
    );

    /*
     * Keep pendingChanges intact so the user can retry.
     */
  }
}

// ========================
// MODAL METHODS (SEQUENTIAL ORDER)
// ========================

/**
 * 1. Initialize modal structure
 */
_initModalStructure() {
  // Create modal container
  this.modalElement = document.createElement('div');
  this.modalElement.className = `anygrid-modal ${this.features.modalConfig.animation}`;
  this.modalElement.style.display = 'none';

  // Modal structure
  this.modalElement.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">×</button>
      <div class="modal-body"></div>
      ${this.features.modalConfig.deletable ? 
        '<div class="modal-footer"><button class="anygrid-btn-delete">Delete</button></div>' : ''}
    </div>
    <div class="modal-backdrop"></div>
  `;

  document.body.appendChild(this.modalElement);
  
  // Close handlers
  this.modalElement.querySelector('.modal-close').addEventListener('click', () => {
    this._hideModal();
  });
  
  if (this.features.modalConfig.closeOnOutsideClick) {
    this.modalElement.querySelector('.modal-backdrop').addEventListener('click', () => {
      this._hideModal();
    });
  }
}

/**
 * 2. Setup row click handlers (triggered from constructor)
 */
_setupRowClickHandlers() {
  if (!this.tbody) {
    console.warn('Tbody not found - check initializeGrid()');
    return;
  }

  this.tbody.addEventListener('click', (event) => {
    // Check if click originated from a no-modal cell
    const clickedCell = event.target.closest('td');
    if (clickedCell && clickedCell.hasAttribute('data-no-modal')) {
      return; // Skip modal for action cells
    }

    const row = event.target.closest('tr');
    if (!row) return;

    const rowIndex = row.dataset.rowIndex || 
                    Array.from(this.tbody.children).indexOf(row);
    const record = this.filteredData[rowIndex];

    if (record) {
      this._showModalWithData(record);
    }
  });

  this.tbody.style.cursor = 'pointer';
}

/**
 * 3. Show modal with record data - UPDATED with metadata support
 */
_formatModalValue(value) {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (Array.isArray(value)) {
    return value
      .map(item => this._formatModalValue(item))
      .join(', ');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

_showModalWithData(record) {
  if (!this.modalElement) return;
  
  this.currentRecord = record; // Store current record
  const modalBody = this.modalElement.querySelector('.modal-body');

  // Get hidden fields configuration (new feature)
  const hiddenFields = this.features.modalConfig.hiddenFields || [];

  if (this.features.modalConfig.editable) {
    // Click-to-edit version - filter out hidden fields
    modalBody.innerHTML = Object.entries(record)
      .filter(([key]) => !hiddenFields.includes(key)) // New: Hide specified fields
      .map(([key, value]) => {
        const nonEditable = this.features.modalConfig.nonEditableFields || ['id', 'createdAt', 'updatedAt'];
        const isEditable = !nonEditable.includes(key);

        return `
          <div class="record-field" data-field="${key}" data-editable="${isEditable}">
            <strong>${key}:</strong>
            <span class="field-value">${this._formatModalValue(value)}</span>
          </div>
        `;
      }).join('');
      
    this._setupClickToEdit();
  } else {
    // Read-only version - filter out hidden fields
    modalBody.innerHTML = Object.entries(record)
      .filter(([key]) => !hiddenFields.includes(key)) // New: Hide specified fields
      .map(([key, value]) => `
        <div class="record-field">
          <strong>${key}:</strong>
          <span class="field-value">${this._formatModalValue(value)}</span>
        </div>
      `).join('');
  }

  // Setup footer buttons if editable
  if (this.features.modalConfig.editable) {
    this._setupModalFooter();
  }

  this._editState.originalRecord = {...record};
  this._setupEditorOutsideClickSave();
  this._editState.pendingChanges = {};

  // Reset save button
  this._updateSaveButtonStatus();

  this.modalElement.style.display = 'block';
  document.body.style.overflow = 'hidden';
}


/**
 * 4. Setup click-to-edit handlers - UPDATED with metadata-driven editors
 */
_setupClickToEdit() {
  const fields = this.modalElement.querySelectorAll('.record-field');
  
  // Define non-editable fields
  const nonEditableFields = [
    ...['id', 'uuid', 'created_at', 'updated_at'],
    ...(this.features.modalConfig.nonEditableFields || [])
  ];
  
  fields.forEach(field => {
    const fieldName = field.dataset.field;
    const isEditable = !nonEditableFields.includes(fieldName);
    
    if (!isEditable) {
      field.classList.add('non-editable');
      field.style.cursor = 'not-allowed';
      return;
    }

    // Get metadata for this field
    const metadata = this._getFieldMetadata(fieldName);
    
    if (!metadata?.editor) {
      metadata.editor = { type: 'text' };
    }

    // Resolve editor class
    const EditorClass = this._resolveEditor(metadata.editor.type);
    if (!EditorClass) {
      console.warn(`No editor found for type "${metadata.editor.type}", using fallback`);
      this._setupFallbackEditor(field);
      return;
    }
    
    field.style.cursor = 'pointer';
    field._editorMetadata = metadata;
    
  field.addEventListener('click', (e) => {
    if (e.target.closest('input, select, textarea, button')) {
      return;
    }
    if (!isEditable) return;
    if (field._editor) {
      return;
    }
    this._createAndMountEditor(field, metadata, EditorClass);
  });
  });
}

/**
 * 5. Setup modal footer buttons
 */
_setupModalFooter() {
  // Get or create footer
  let footer = this.modalElement.querySelector('.modal-footer');
  if (!footer) {
    footer = document.createElement('div');
    footer.className = 'modal-footer';
    this.modalElement.querySelector('.modal-content').appendChild(footer);
  }
  
  // Clear existing save button (if any)
  const existingSaveBtn = footer.querySelector('.btn-save');
  if (existingSaveBtn) {
    existingSaveBtn.remove();
  }
  
  // Add new save button if editable
  if (this.features.modalConfig.editable) {
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-save';
    saveBtn.textContent = 'Save All Changes';
    saveBtn.addEventListener('click', () => this._saveAllEdits());
    footer.prepend(saveBtn);
    
    // Set initial state
    this._updateSaveButtonStatus();
  }
  
  // Handle delete button (only add once)
  if (this.features.modalConfig.deletable && !footer.querySelector('.anygrid-btn-delete')) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'anygrid-btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => this._handleDelete());
    footer.appendChild(deleteBtn);
  }
}

/**
 * 6. Save all edits (footer button) - Batch save
 */
_saveAllEdits() {
  const changes = {
    ...this._editState.pendingChanges
  };

  if (Object.keys(changes).length === 0) {
    this._showStatusMessage(
      'No changes to save',
      'info'
    );
    return;
  }

  console.log(
    'Saving all changes:',
    changes
  );


  const saveBtn =
    this.modalElement?.querySelector('.btn-save');

  if (saveBtn) {
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
  }

  this._recordUpdateApi(
    { ...changes },
    'PUT'
  )
    .then(() => {
      const recordId =
        this.currentRecord?.id;

      // Update original values for what this request saved.
      Object.entries(changes).forEach(
        ([key, value]) => {
          this._editState.originalRecord[key] =
            value;
        }
      );

      if (recordId) {
        this._updateDataRecord(
          recordId,
          changes
        );
      }

      // Only clear pending values that still equal
      // the values that this request saved.
      Object.entries(changes).forEach(
        ([key, savedValue]) => {
          const currentPending =
            this._editState.pendingChanges[key];

          if (!this._isValueChanged(
            savedValue,
            currentPending
          )) {
            delete this._editState.pendingChanges[key];
          }
        }
      );

      if (
        Object.keys(
          this._editState.pendingChanges
        ).length === 0
      ) {
        }

      this._showSuccessMessage();

      if (saveBtn) {
        saveBtn.textContent = 'Saved ✓';
        saveBtn.disabled = false;
        saveBtn.classList.add('btn-save-saved');

        setTimeout(() => {
          saveBtn.classList.remove(
            'btn-save-saved'
          );

          this._updateSaveButtonStatus();
        }, 2000);
      }

      this.renderData();

      if (recordId) {
        this._highlightUpdatedRow(recordId);
      }

    })
    .catch((error) => {
      this._showErrorMessage(error);

      if (saveBtn) {
        saveBtn.textContent = 'Retry Save';
        saveBtn.disabled = false;
      }

      // Preserve pending changes and cell controls.
    });
}

/**
 * 7. Hide modal
 */
_hideModal() {
  if (!this.modalElement) return;
  this.modalElement.style.display = 'none';
  document.body.style.overflow = '';
  this.currentRecord = null;
  this._removeEditorOutsideClickSave();
}
 
  // ==============================================
  // EXISTING METHODS (below)
  // ==============================================
  

  generateUniqueId(prefix) {
    const randomPart = Math.random().toString(36).substring(2, 7); // Generate a 5-character random string
    return `${prefix}-${randomPart}`;
  }

  // Initialize the data grid layout and event listeners
  initializeDataGrid() {
  const dataGrid = document.getElementById(this.gridContainerId);

  if (!dataGrid) {
    console.error(`Grid container with ID '${this.gridContainerId}' not found.`);
    return;
  }

  // Establish AnyGrid's root component class.
  // Preserve any existing theme/configuration classes.
  dataGrid.classList.add('anygrid-container');

  // Generate select options dynamically if itemsPerPage feature is enabled
  const options = [5, 10, 20, 50, 100];
  const selectOptions = this.features.itemsPerPage ? options.map(option => `
    <option value="${option}" ${option === this.itemsPerPage ? 'selected' : ''}>${option}</option>
  `).join('') : '';

  const exportButtonHTML = this.features.csvExport ? `
    <button id="export-csv-${this.gridContainerId}" class="anygrid-export-csv">Export CSV</button>
  ` : '';

  const exportExcelButtonHTML = this.features.excelExport ? `
    <button id="export-excel-${this.gridContainerId}" class="anygrid-export-excel">Export EXCEL</button>
  ` : '';

  const htmlContent = `
    <div class="search-container"> 
      ${this.features.search ? `<input type="text" id="${this.searchInputId}" class="anygrid-search-input" placeholder="Search...">` : ''}
      ${this.features.itemsPerPage ? `<select id="${this.itemsPerPageId}" class="items-per-page">${selectOptions}</select>` : ''}
      ${exportButtonHTML} ${exportExcelButtonHTML}
    </div>
    
    <div class="anygrid-table-wrapper">
    <table class="anygrid-table" id="${this.dataTableId}">
      <thead>
        <tr></tr>
      </thead>
      <tbody></tbody>
    </table>
    </div>
    ${this.features.pagination ? `<div id="${this.paginationContainerId}" class="anygrid-pagination"></div>` : ''}
  `;

  const template = document.createElement('template');
  template.innerHTML = htmlContent.trim();
  const clone = template.content.cloneNode(true);
  dataGrid.appendChild(clone);

  // Bind the CSV export button click event
  if (this.features.csvExport) {
    const exportButton = document.getElementById(`export-csv-${this.gridContainerId}`);
    exportButton.addEventListener('click', this.exportToCSV.bind(this));
  }

  if (this.features.excelExport) {
    const exportExcelButton = document.getElementById(`export-excel-${this.gridContainerId}`);
    exportExcelButton.addEventListener('click', this.exportToExcel.bind(this));
  }

  // Set up event listeners for items per page and search input
  if (this.features.itemsPerPage) {
    const itemsPerPageSelect = document.getElementById(`${this.itemsPerPageId}`);
    itemsPerPageSelect.value = this.itemsPerPage;
    itemsPerPageSelect.addEventListener('change', (event) => {
      this.itemsPerPage = parseInt(event.target.value);
      this.currentPage = 1;
      this.renderData();
      this.updatePagination();
    });
  }

  if (this.features.search) {
    this.searchInput = document.getElementById(this.searchInputId);
    this.searchInput.addEventListener('input', this.searchTable.bind(this));
  }

  this.tbody = document.querySelector(`#${this.dataTableId} tbody`);
  this.paginationContainer = document.getElementById(`${this.paginationContainerId}`);

  this.renderData(this.filteredData);
  this.updatePagination();
}







 renderData() {
  // Safeguard: Ensure filteredData is always an array
  if (!Array.isArray(this.filteredData)) {
    console.warn('filteredData is not an array - resetting to empty array');
    this.filteredData = [];
  }

  // Clear existing content
  this.tbody.innerHTML = '';
  const headerRow = document.querySelector(`#${this.dataTableId} thead tr`);
  
  // Safeguard: Ensure headerRow exists
  if (!headerRow) {
    console.error('Header row not found!');
    return;
  }
  
  headerRow.innerHTML = '';

  // Create table headers (only if dynamic headers are enabled)
  if (this.features.dynamicHeaders) {
    this.columns.forEach((column, index) => {
      // Skip if column is hidden or invalid
      if (!column || column.hidden) return;

      const headerCell = document.createElement('th');
      
      // Safeguard: Fallback for missing label/header
      headerCell.textContent = column.label || column.header || `Column ${index}`;
      
      if (column.joinedColumns) {
        // Safeguard: Ensure joinedColumns is an array
        if (Array.isArray(column.joinedColumns)) {
          // Don't set colspan here - we'll handle it in the data cells
        }
      } else if (this.features.sort && column.sortable) {
        headerCell.dataset.index = index;
        
        // Safeguard: Ensure sortTable exists before adding listener
        if (typeof this.sortTable === 'function') {
          headerCell.addEventListener('click', () => this.sortTable(index));
        }

        const sortableIcon = document.createElement('span');
        sortableIcon.innerHTML = ' ⇅';
        sortableIcon.style.fontSize = '1.1em';
        sortableIcon.style.marginLeft = '0.2em';
        sortableIcon.className = 'anygrid-column-sortable';
        headerCell.appendChild(sortableIcon);
      }
      
      headerRow.appendChild(headerCell);
    });
  }

  // Calculate pagination bounds
  let startIndex, endIndex;
  
  if (this.features.pagination) {
    const itemsPerPage = Math.max(1, parseInt(this.itemsPerPage) || 10);
    startIndex = (Math.max(1, this.currentPage) - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, this.filteredData.length);
  } else {
    startIndex = 0;
    endIndex = this.filteredData.length;
  }

  // Safeguard: Ensure slice bounds are valid
  const displayData = this.filteredData.slice(
    Math.max(0, startIndex),
    Math.min(this.filteredData.length, endIndex)
  );

  // Render rows
  displayData.forEach((row, rowIndex) => {
    // Safeguard: Skip invalid rows
    if (!row || typeof row !== 'object') return;
    const tr = document.createElement('tr');

    this.columns.forEach((column) => {
      if (!column || column.hidden) return;

      const cell = document.createElement('td');
      
      // Add data attribute for modal exclusion
      if (column.noModal) {
        cell.setAttribute('data-no-modal', 'true');
      }

      if (column.joinedColumns && Array.isArray(column.joinedColumns)) {
        // Handle joined columns - create one cell that combines all values
        const value = column.joinedColumns.map(col => row[col]).join(' ');
        cell.textContent = value;
      } else {
        // Normal column
        let value = row[column.name];
        cell.setAttribute('data-id', column.name);

        if(column.name === 'id') tr.setAttribute('data-id', value); 

        // Handle null/undefined values
        if (value == null) value = '';

        if (column.render) {
          try {
            if (typeof column.render === 'string') {
              cell.innerHTML = column.render.replace(`{${column.name}}`, value);
            } else if (typeof column.render === 'function') {
              cell.innerHTML = column.render(value, row);
            }
          } catch (e) {
            console.error('Error in column render:', e);
            cell.textContent = value;
          }
        } else {
          cell.textContent = value;
        }
      }
      
      tr.appendChild(cell);
    });

    this.tbody.appendChild(tr);
  });

  // Update pagination if enabled
  if (this.features.pagination) {
    this.updatePagination();
  }
}



  updatePagination() {
  if (this.features.pagination) {
    const itemsPerPage = this.itemsPerPage;
    const totalPages = Math.ceil(this.filteredData.length / itemsPerPage);
    const startPage = Math.max(1, this.currentPage - 5);
    const endPage = Math.min(startPage + 9, totalPages);

    // Clear the pagination container
    this.paginationContainer.innerHTML = '';

    // Create a container for pagination info and buttons
    const paginationWrapper = document.createElement('div');
    paginationWrapper.classList.add('pagination-wrapper');

    // Add the "Showing X to Y of Z records" text
    const startIndex = (this.currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(this.currentPage * itemsPerPage, this.totalRecords);
    const totalRecords = this.totalRecords;

    const paginationInfo = document.createElement('div');
    paginationInfo.classList.add('pagination-info');
    paginationInfo.textContent = `Showing ${startIndex} to ${endIndex} of ${totalRecords} records`;

    // Create a container for the buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pagination-buttons');

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');

      if (i === this.currentPage) {
        button.classList.add('active');
      }

      button.onclick = () => {
        this.currentPage = i;
        this.renderData();
      };

      buttonsContainer.appendChild(button);
    }

    // Append info and buttons to the wrapper
    paginationWrapper.appendChild(paginationInfo);
    paginationWrapper.appendChild(buttonsContainer);

    // Append the wrapper to the pagination container
    this.paginationContainer.appendChild(paginationWrapper);
  }
}

  // Implement sorting functionality (only if sorting is enabled)
  sortTable(index) {
  if (this.features.sort) {
    const column = this.columns[index];
    const isAsc = this.sortingOrder[column.name] !== 'asc';
    
    const sortedData = [...this.filteredData].sort((a, b) => {
      let valueA = a[column.name];
      let valueB = b[column.name];
      
      // Handle null/undefined values
      if (valueA == null) valueA = '';
      if (valueB == null) valueB = '';
      
      // Convert to numbers if column is numeric
      if (column.type === 'number') {
        valueA = parseFloat(valueA) || 0;
        valueB = parseFloat(valueB) || 0;
        return isAsc ? valueA - valueB : valueB - valueA;
      }
      
      // For strings, use localeCompare for proper alphabetical sorting
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAsc ? 
          valueA.localeCompare(valueB, undefined, { sensitivity: 'base' }) : 
          valueB.localeCompare(valueA, undefined, { sensitivity: 'base' });
      }
      
      // Fallback for mixed types
      const strA = String(valueA);
      const strB = String(valueB);
      return isAsc ? 
        strA.localeCompare(strB, undefined, { sensitivity: 'base' }) : 
        strB.localeCompare(strA, undefined, { sensitivity: 'base' });
    });

    this.filteredData = sortedData;
    this.sortingOrder[column.name] = isAsc ? 'asc' : 'desc';
    this.renderData();
  }
}

  // Implement search functionality (only if search is enabled)
searchTable() {
  const query = this.searchInput.value.toLowerCase();  // Get search query and make it lowercase

  // Filter the data based on the query
  this.filteredData = this.data.filter((row) =>
    this.columns.some((column) => {
      // Retrieve the column value to search through
      let value = column.joinedColumns ? 
        column.joinedColumns.map(col => row[col]).join(' ') : 
        row[column.name];

      // Ensure the value is a string and make it lowercase
      if (value == null) value = '';  // Handle null or undefined
      if (typeof value !== 'string') value = String(value);  // Convert non-strings to strings

      return value.toLowerCase().includes(query);  // Return true if query is found in the column value
    })
  );

  // Reset to first page on new search to avoid displaying empty pages
  this.currentPage = 1;

  // Re-render the table with filtered data
  this.renderData();
}





/* PREMIUM FEATURES BLOCK */

exportToCSV(event) {
  const tableId = event.target.id.replace('export-csv-', ''); // Extract the dataTableId
  const tableInstance = this;  // `this` refers to the instance calling the method
  
  if (this.features.csvExport) {
    const headers = this.columns.map(col => col.label || col.header).join(',');
    const rows = this.filteredData.map(row => {
      return this.columns.map(col => {
        let value = col.joinedColumns ? col.joinedColumns.map(c => row[c]).join(' ') : row[col.name];
        return `"${String(value).replace(/"/g, '""')}"`; // Escape quotes
      }).join(',');
    }).join('\n');

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data-${tableId}.csv`);
    link.click();
  }
}


exportToExcel(event) {
  const tableId = event.target.id.replace('export-excel-', ''); // Extract the dataTableId
  const tableInstance = this; // `this` refers to the instance calling the method

  if (this.features.excelExport) {
    // Create Excel XML content
    let xml = `
      <xml version="1.0" encoding="UTF-8"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                xmlns:html="http://www.w3.org/TR/REC-html40">
        <Worksheet ss:Name="Sheet1">
          <Table>
    `;

    // Add headers
    xml += '<Row>';
    this.columns.forEach(col => {
      xml += `<Cell><Data ss:Type="String">${col.label || col.header}</Data></Cell>`;
    });
    xml += '</Row>';

    // Add data rows
    this.filteredData.forEach(row => {
      xml += '<Row>';
      this.columns.forEach(col => {
        let value = col.joinedColumns ? col.joinedColumns.map(c => row[c]).join(' ') : row[col.name];
        const cellType = isNaN(value) ? 'String' : 'Number';
        xml += `<Cell><Data ss:Type="${cellType}">${value}</Data></Cell>`;
      });
      xml += '</Row>';
    });

    xml += `
          </Table>
        </Worksheet>
      </Workbook>
    `;

    // Create Blob and download
    const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-${tableId}.xls`);
    link.click();
  }
}

// ========================
// MODAL EDITING SEQUENCE (with UI updates)
// ========================

// 1. FIRST: Called when user clicks Save button
// ========================
// MODAL CONTENT METHODS
// ========================

/**
 * Generates read-only modal content
 */
_getReadOnlyContent(record) {
  return Object.entries(record)
    .filter(([key]) => !key.startsWith('_')) // Skip internal fields
    .map(([key, value]) => `
      <div class="record-field">
        <strong>${key}:</strong>
        <span class="field-value">${value !== null ? value : 'null'}</span>
      </div>
    `).join('');
}

/**
 * Refreshes modal content while preserving state
 */
_refreshModalContent(updatedRecord) {
  const modalBody = this.modalElement.querySelector('.modal-body');
  if (!modalBody) return;
  
  const isEditMode = modalBody.querySelector('input') !== null;
  
  if (isEditMode) {
    // Update existing inputs without rebuilding
    this.columns.forEach(column => {
      const input = modalBody.querySelector(`input[data-field="${column.field}"]`);
      if (input) input.value = updatedRecord[column.field] ?? '';
    });
  } else {
    // Rebuild read-only view using the new method
    modalBody.innerHTML = this._getReadOnlyContent(updatedRecord);
  }
}

// ========================
// UPDATED SAVE METHOD
// ========================

// 2. SECOND: Field value extraction
_getFieldValue(element) {
  // Handle all standard input types
  if (element.tagName === 'INPUT') {
    switch (element.type) {
      case 'checkbox':
      case 'radio':
        return element.checked;
      case 'number':
        return element.value ? Number(element.value) : null;
      case 'date':
        return element.valueAsDate;
      default:
        return element.value;
    }
  }
  
  if (element.tagName === 'SELECT') {
    return element.multiple 
      ? Array.from(element.selectedOptions).map(opt => opt.value)
      : element.value;
  }
  
  return element.textContent;
}

// 3. THIRD: Gets changed fields from DOM - DEPRECATED, use pendingChanges
_getChangedFields() {
  const changes = {};
  const fields = this.modalElement.querySelectorAll('.record-field[data-field]');
  
  fields.forEach(field => {
    const fieldName = field.dataset.field;
    const valueEl = field.querySelector('.field-value');
    if (!valueEl) return;
    
    const currentValue = this._extractCleanValue(valueEl.textContent);
    const originalValue = this._editState.originalRecord[fieldName];
    
    if (currentValue !== originalValue) {
      changes[fieldName] = currentValue;
    }
  });
  
  return changes;
}

_extractCleanValue(formattedText) {
  if (!formattedText) return null;
  const value = formattedText.split(':').pop().replace('✓ Saved', '').trim();
  if (value === 'null') return null;
  
  if (formattedText.includes('metadata:')) {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  }
  
  return value;
}

// 4. FOURTH: API communication - UPDATED to support method param and preserve errors
async _recordUpdateApi(dataUpdate, method = 'PUT') {
  const recordId = dataUpdate.recordId ?? this.currentRecord?.id;

  if (!recordId) {
    throw new Error('Record ID is required for update.');
  }

  const payload = { ...dataUpdate };
  delete payload.recordId;

  const endpoint = `${this.dataApiEndPoint}/${recordId}`;

  const nonEditable = (this.features?.modalConfig?.nonEditableFields || []);
  Object.keys(payload).forEach(key => {
    if (nonEditable.includes(key)) {
      delete payload[key];
    } else {
      payload[key] = this._cleanPayloadValue(payload[key]);
    }
  });

  console.debug(`API ${method}:`, endpoint, payload);

  try {
    this._showLoadingState(true);

    const response = await fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    let result;
    const responseText = await response.text();
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      result = { message: responseText || response.statusText || `HTTP ${response.status}` };
    }

    if (!response.ok) {
      const error = {
        status: response.status,
        response: result,
        message: this._extractErrorMessage(result)
      };
      throw error;
    }

    return result;

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    this._showLoadingState(false);
  }
}


_cleanPayloadValue(value) {
  if (value === undefined) return null;
  return value;
}

// ========================
// UI UPDATE METHODS (NEW)
// ========================
/**
 * Refreshes all UI elements after edit
 */
_refreshUIAfterEdit(updatedRecord) {
  // Update current record
  this.currentRecord = updatedRecord;
  console.log("current Update Record", JSON.stringify(updatedRecord));

  // Update data grid
  this._updateDataObject();
  
  // Update data grid
  //this._updateDataGridRow(updatedRecord);

  this.renderData();


  this._showModalWithData(updatedRecord);

  
  // Update modal if open
  /*
  if (this.modalElement.style.display === 'block') {
    this._refreshModalContent(updatedRecord);
  }
  */
  // Visual feedback
  this._highlightUpdatedRow(updatedRecord.id);
}



/**
 * update data object first
 */

_updateDataObject() {

  const index = this.data.findIndex(item => item.id === this.currentRecord.id);
  if (index !== -1) {
    this.data[index] = { ...this.data[index], ...this.currentRecord };
  }

  //console.log("DO Updated", JSON.stringify(this.data,null,2));
}


_deleteFromDataObject() {
  const index = this.data.findIndex(item => item.id === this.currentRecord.id);
  if (index !== -1) {
    this.data.splice(index, 1); // Removes the item at the found index
  }

  // console.log("DO Updated (After Delete)", JSON.stringify(this.data, null, 2));
}



/**
 * Updates specific row in data grid
 */
/*
_updateDataGridRow() {
  if (!this.tbody || !this.currentRecord || !this.currentRecord.id) return;

  const recordId = String(this.currentRecord.id);
  const row = this.tbody.querySelector(`tr[data-id="${recordId}"]`);
  if (!row) return;

  const cells = row.querySelectorAll('td[data-id]');

  cells.forEach(cell => {
    const field = cell.getAttribute('data-id');
    const value = this.currentRecord[field] ?? '';

    // If cell contains an <a>, update its text and href (for id fields)
    const anchor = cell.querySelector('a');
    if (anchor) {
      anchor.textContent = value;
      if (field === 'id') {
        anchor.href = `/user/profile/${value}`;
      }
    } else {
      cell.textContent = value;
    }
  });
}
*/


/**
 * Refreshes modal content while preserving state
 */

/*
_refreshModalContent(updatedRecord) {
  const modalBody = this.modalElement.querySelector('.modal-body');
  if (!modalBody) return;
  
  const isEditMode = modalBody.querySelector('input') !== null;
  
  if (isEditMode) {
    // Update inputs without rebuilding
    this.columns.forEach(column => {
      const input = modalBody.querySelector(`input[data-field="${column.field}"]`);
      if (input) input.value = updatedRecord[column.field] ?? '';
    });
  } else {
    // Rebuild read-only view
    modalBody.innerHTML = this._getReadOnlyContent(updatedRecord);
  }
}

*/


/**
 * Visual feedback for updated row
 */
_highlightUpdatedRow(recordId) {
  if (!this.tbody || !recordId) return;

  const row = this.tbody.querySelector(`tr[data-id="${String(recordId)}"]`);
  if (!row) return;

  row.classList.remove('row-updated'); // reset
  void row.offsetWidth;                // force reflow
  row.classList.add('row-updated');    // reapply class

  setTimeout(() => {
    row.classList.remove('row-updated');
  }, 10000);
}


/**
 * Minimal UI Status Methods
 */
_showLoadingState(show) {
  const footer = this.modalElement.querySelector('.modal-footer');
  if (!footer) return;
  
  if (show) {
    const loader = document.createElement('div');
    loader.className = 'modal-status loading';
    loader.textContent = 'Saving...';
    footer.appendChild(loader);
  } else {
    footer.querySelector('.modal-status.loading')?.remove();
  }
}

_showSuccessMessage() {
  const footer = this.modalElement.querySelector('.modal-footer');
  const successMsg = document.createElement('div');
  successMsg.className = 'modal-status success';
  successMsg.textContent = '✓ Saved successfully';
  footer.appendChild(successMsg);
  setTimeout(() => successMsg.remove(), 3000);
}

_showErrorMessage(error) {
  const footer = this.modalElement.querySelector('.modal-footer');

  const message = this._extractErrorMessage(error);

  const existing = footer?.querySelector('.modal-status.error');
  if (existing) existing.remove();

  const errorMsg = document.createElement('div');
  errorMsg.className = 'modal-status error';

  const textSpan = document.createElement('span');
  textSpan.textContent = `✗ Error: ${message}`;
  errorMsg.appendChild(textSpan);

  const retryBtn = document.createElement('button');
  retryBtn.className = 'btn-retry';
  retryBtn.textContent = 'Retry';
  retryBtn.addEventListener('click', () => {
    this._saveAllEdits();
  });
  errorMsg.appendChild(retryBtn);

  footer.appendChild(errorMsg);
}

// =================
// DELETE A RECORD 
// ===================

async _handleDeleteRecord() {
  if (!this.currentRecord?.id) return;
  
  // Confirm deletion
  if (this.features.modalConfig.confirmDelete && 
      !confirm(`Delete record ${this.currentRecord.id}?`)) {
    return;
  }

  try {
    // Get row element before API call
    const row = this._getRowElement(this.currentRecord.id);
    
    // Visual feedback before deletion
    if (row) {
      row.classList.add('row-deleting');
      await new Promise(resolve => setTimeout(resolve, 300)); // Brief visual feedback
    }
    
    // API call
    await this._deleteRecordApi(this.currentRecord.id);
    
    // Update data immediately
    this._deleteFromDataObject();
    
    // Show success message in modal
    const modalBody = this.modalElement.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="delete-confirmation">
          ✓ Record ${this.currentRecord.id} deleted
        </div>
      `;
    }
    
    // Close modal after delay
    setTimeout(() => {
      this._hideModal();
      this.renderData(); // Refresh grid
    }, 1500);

  } catch (error) {
    // Remove visual feedback if error occurs
    const row = this._getRowElement(this.currentRecord.id);
    if (row) row.classList.remove('row-deleting');
    
    // Show error in modal
    const modalBody = this.modalElement.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="delete-error">
          ✗ Delete failed: ${error.message}
          <button class="retry-btn">Retry</button>
        </div>
      `;
      
      modalBody.querySelector('.retry-btn').addEventListener('click', () => {
        this._handleDeleteRecord();
      });
    }
  }
}





// Reuse your existing API method with DELETE method
async _deleteRecordApi(recordId) {
  if (!this.dataApiEndPoint) {
    throw new Error('API endpoint not configured');
  }

  const response = await fetch(`${this.dataApiEndPoint}/${recordId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

// Reuse existing row highlight method
_getRowElement(recordId) {
  return this.tbody?.querySelector(`tr[data-id="${recordId}"]`);
}


/* END PREMIUM FEATURES BLOCK */

  
}


export default AnyGrid;