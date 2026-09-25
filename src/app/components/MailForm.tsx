import { useState, type FormEvent } from "react";
import { site } from "../content/site";
import Btn from "./Btn";

type Field = { name: string; label: string; type?: string; textarea?: boolean; options?: string[]; required?: boolean; auto?: string };

/**
 * No backend on a static site: the form validates on blur and then opens
 * the visitor's mail app with everything pre-filled.
 */
export default function MailForm({ subject, fields, submit }: { subject: string; fields: Field[]; submit: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const check = (f: Field, v = values[f.name] ?? "") => {
    if (f.required && !v.trim()) return `Please enter ${f.label.toLowerCase()}.`;
    if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) return "That email doesn't look right — check for typos.";
    return "";
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      const m = check(f);
      if (m) next[f.name] = m;
    });
    setErrors(next);
    const first = fields.find((f) => next[f.name]);
    if (first) {
      document.getElementById(`f-${first.name}`)?.focus();
      return;
    }
    const body = fields.map((f) => `${f.label}: ${values[f.name] ?? ""}`).join("\n\n");
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          "aria-invalid": !!errors[f.name],
          "aria-describedby": errors[f.name] ? `${id}-err` : undefined,
          onChange: (e: { target: { value: string } }) => setValues({ ...values, [f.name]: e.target.value }),
          onBlur: () => setErrors({ ...errors, [f.name]: check(f) }),
        };
        return (
          <div className="field" key={f.name}>
            <label htmlFor={id}>
              {f.label}
              {f.required && <span aria-hidden="true"> *</span>}
            </label>
            {f.textarea ? (
              <textarea {...common} />
            ) : f.options ? (
              <select {...common}>
                <option value="">Choose…</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} autoComplete={f.auto} />
            )}
            {errors[f.name] && <span className="err" id={`${id}-err`} role="alert">{errors[f.name]}</span>}
          </div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", gap: "20rem", flexWrap: "wrap" }}>
        <Btn type="submit">{submit}</Btn>
        <span className="note">Opens your mail app · <a className="link" href={`mailto:${site.email}`}>{site.email}</a></span>
      </div>
      {sent && <p className="ok" role="status">Your mail app should open with the message ready. If it didn't, write to {site.email}.</p>}
    </form>
  );
}
