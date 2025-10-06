import DateInput from '../DateInput';
import MultiValueInput from '../MultiValueInput';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function FormControls({ formControls = [], formData, setFormData }) {
  const [passwordVisible, setPasswordVisible] = useState({});

  const togglePassword = (name) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderComponentByType = (ctrl) => {
    const value = formData[ctrl.name];

    switch (ctrl.componentType) {
      case 'input':
        if (ctrl.type === 'password') {
          return (
            <div className="relative">
              <Input
                id={ctrl.name}
                name={ctrl.name}
                placeholder={ctrl.placeholder}
                type={passwordVisible[ctrl.name] ? 'text' : 'password'}
                value={value || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [ctrl.name]: e.target.value })
                }
                className="pr-10 my-2"
              />
              <button
                type="button"
                onClick={() => togglePassword(ctrl.name)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
              >
                {passwordVisible[ctrl.name] ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          );
        }
        return (
          <Input
            id={ctrl.name}
            name={ctrl.name}
            placeholder={ctrl.placeholder}
            type={ctrl.type}
            value={value || ''}
            className="my-2"
            onChange={(e) =>
              setFormData({ ...formData, [ctrl.name]: e.target.value })
            }
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={ctrl.name}
            name={ctrl.name}
            placeholder={ctrl.placeholder}
            className="my-2"
            value={value || ''}
            onChange={(e) =>
              setFormData({ ...formData, [ctrl.name]: e.target.value })
            }
          />
        );

      case 'multipleInput':
        return (
          <MultiValueInput
            id={ctrl.name}
            name={ctrl.name}
            placeholder={ctrl.placeholder}
            value={Array.isArray(value) ? value : []} // important!
            onChange={(name, newValue) =>
              setFormData({ ...formData, [name]: newValue })
            }
          />
        );

      case 'date':
        return (
          <DateInput
            id={ctrl.name}
            label={ctrl.label}
            value={value || null}
            onChange={(newDate) =>
              setFormData({ ...formData, [ctrl.name]: newDate })
            }
          />
        );

      default:
        return (
          <Input
            id={ctrl.name}
            name={ctrl.name}
            placeholder={ctrl.placeholder}
            type={ctrl.type}
            value={value || ''}
            onChange={(e) =>
              setFormData({ ...formData, [ctrl.name]: e.target.value })
            }
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((ctrl) => (
        <div key={ctrl.name}>
          <Label htmlFor={ctrl.name}>{ctrl.label}</Label>
          {renderComponentByType(ctrl)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
