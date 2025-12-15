import { Select } from '@/components/atoms/select';
import { Label } from '@/components/atoms/label';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, name, error, options, ...props }: SelectFieldProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} id={name} {...props}>
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

