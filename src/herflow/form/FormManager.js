import T from 'i18n-react';
import _ from 'lodash';

class FormManager {
  constructor(form) {
    this.form = form;
    this.fields = form.getFields();
  }

  

  validate(value, context){
    let errors = {};
    if (this.form.validate){
      let error =  this.form.validate(value,context);
      if (error){
        errors['form'] = error;
      }
    }

    this.fields.forEach(function(field){
      if (field.required){
        if (!value[field.name]){
          errors[field.name] = T.translate("required");
            return;
        }
      }
      if (field.validate){
        let error = field.validate(value[field.name],value,context);
        if (error){
          errors[field.name] = error;
          return;
        }
      }
    });

    if (_.isEmpty(errors)){
      return null;
    } else {
      return errors;
    }
  }
}

export default FormManager;