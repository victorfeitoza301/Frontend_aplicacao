import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input id={id} className={styles.input} {...props} />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Input;