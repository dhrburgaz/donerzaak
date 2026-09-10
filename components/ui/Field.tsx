import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
};

const fieldClasses =
  "w-full rounded-xl border border-border bg-warm-white px-4 py-3 text-base text-charcoal placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

function FieldShell({
  label,
  name,
  error,
  hint,
  children,
}: BaseProps & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Field({
  label,
  name,
  error,
  hint,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} name={name} error={error} hint={hint}>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${fieldClasses} ${error ? "border-red" : ""}`}
        {...props}
      />
    </FieldShell>
  );
}

export function TextareaField({
  label,
  name,
  error,
  hint,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} name={name} error={error} hint={hint}>
      <textarea
        id={name}
        name={name}
        aria-invalid={!!error}
        className={`${fieldClasses} min-h-28 resize-y ${error ? "border-red" : ""}`}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} name={name} error={error} hint={hint}>
      <select
        id={name}
        name={name}
        aria-invalid={!!error}
        className={`${fieldClasses} ${error ? "border-red" : ""}`}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
