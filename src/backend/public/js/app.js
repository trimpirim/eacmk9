import CKEditorHelper from './components/ckeditor-helper'
import CheckboxCollapse from './components/checkbox-collapse'
import Form from './components/form'
import Datepicker from './components/datepicker'

$(document).ready(() => {
  CKEditorHelper.load()
  CheckboxCollapse.init()
  Form.init()
  Datepicker.init()
})