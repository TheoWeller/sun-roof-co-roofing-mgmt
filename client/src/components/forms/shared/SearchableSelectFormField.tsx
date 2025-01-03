import { Select, SelectProps } from "@mantine/core";

interface SearchableSelectProps extends Omit<SelectProps, "data"> {
  label: string;
  placeholder?: string;
  data: Array<{ value: string; label: string } | string>;
  required?: boolean;
  error?: string;
  onChange?: (value: string | null) => void;
  value?: string | null;
  disabled?: boolean;
}

function SearchableSelect({
  label,
  placeholder = "Select an option",
  data,
  required = false,
  error,
  onChange,
  value,
  disabled = false,
  ...props
}: SearchableSelectProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      searchable
      required={required}
      error={error}
      onChange={onChange}
      value={value}
      disabled={disabled}
      clearable
      {...props}
    />
  );
}

export default SearchableSelect;
