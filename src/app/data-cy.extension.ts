import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

export const dataCyExtension: FormlyExtension = {
  prePopulate(field: FormlyFieldConfig) {
    field.templateOptions = {
      ...(field.templateOptions || {}),
      attributes: {
        'data-cy': field.key
      }
    };
  }
};
