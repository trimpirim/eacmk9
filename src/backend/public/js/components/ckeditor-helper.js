const CKEditorHelper = {
  selector: '.js-ckeditor-replace',
  instances: [],

  load() {
    this.replace()
  },

  replace() {
    const replaceElements = $(this.selector)
    if (typeof CKEDITOR !== 'undefined') {
      if (replaceElements.length > 0) {
        replaceElements.each((index, item) => {
          const replaceElement = $(item)
          if (!!(replaceElement.attr('id'))) {
            const id = replaceElement.attr('id')
            const instance = CKEDITOR.replace(id)
            if (!!(replaceElement.data('upload-url'))) {
              instance.config.extraPlugins = 'uploadimage';
              instance.config.uploadUrl = replaceElement.data('upload-url');
            }
            CKEditorHelper.instances.push(instance)

            CKEditorHelper.limitChars(instance, replaceElement)
          }
        })
      }
    }
  },

  limitChars(instance, element) {
    const limit = element.data('js-ckeditor-limit')
    if (limit) {
      instance.on('key', () => {
        const text = instance.document.getBody().getText()
        return text.length <= limit
      })
    }
  }
}

export default CKEditorHelper