// Import all editors first
import BaseEditor from './BaseEditor.js';
import TextEditor from './TextEditor.js';
import NumberEditor from './NumberEditor.js';
import SelectEditor from './SelectEditor.js';
import DateTimeEditor from './DateTimeEditor.js';
import CheckboxEditor from './CheckboxEditor.js';
import TextareaEditor from './TextareaEditor.js';
import DecimalEditor from './DecimalEditor.js';
import JsonEditor from './JsonEditor.js';
import TagsEditor from './TagsEditor.js';
import ArrayEditor from './ArrayEditor.js';
import {
  registerEditor,
  resolveEditor,
  getRegistry,
} from './EditorRegistry.js';

// Register all editors
registerEditor('text', TextEditor);
registerEditor('number', NumberEditor);
registerEditor('select', SelectEditor);
registerEditor('datetime', DateTimeEditor);
registerEditor('datetime-local', DateTimeEditor);
registerEditor('checkbox', CheckboxEditor);
registerEditor('textarea', TextareaEditor);
registerEditor('decimal', DecimalEditor);
registerEditor('json', JsonEditor);
registerEditor('tags', TagsEditor);
registerEditor('array', ArrayEditor);

// Named exports for direct imports
export {
  BaseEditor,
  TextEditor,
  NumberEditor,
  SelectEditor,
  DateTimeEditor,
  CheckboxEditor,
  TextareaEditor,
  DecimalEditor,
  JsonEditor,
  TagsEditor,
  ArrayEditor,
  registerEditor,
  resolveEditor,
  getRegistry,
};

// Default export for convenient bundling
export default {
  BaseEditor,
  TextEditor,
  NumberEditor,
  SelectEditor,
  DateTimeEditor,
  CheckboxEditor,
  TextareaEditor,
  DecimalEditor,
  JsonEditor,
  TagsEditor,
  ArrayEditor,
  register: registerEditor,
  resolve: resolveEditor,
  getRegistry: getRegistry,
};
