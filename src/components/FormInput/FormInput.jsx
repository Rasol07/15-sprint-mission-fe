import styles from "./FormInput.module.css";

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
    <label className={styles.inputContainer}>
      <span className={styles.inputTitle}>{label}</span>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.inputContent}
        />
      )}
    </label>
  );
}
