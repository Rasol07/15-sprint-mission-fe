export function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  multiline = false,
}) {
  return (
    <label>
      <span>{label}</span>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></input>
      )}
    </label>
  );
}
