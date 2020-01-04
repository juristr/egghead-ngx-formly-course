import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

export class TranslateExtension {
  constructor(private translate: TranslateService) {}

  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};

    if (!to.label || to._translated) {
      return;
    }

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': this.translate.stream(
        field.templateOptions.label
      )
    };
  }
}

export function registerTranslateExtension(translate: TranslateService) {
  return {
    extensions: [
      {
        name: 'translate-extension',
        extension: new TranslateExtension(translate)
      }
    ]
  };
}
