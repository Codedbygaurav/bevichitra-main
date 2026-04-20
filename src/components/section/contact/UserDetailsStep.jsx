"use client";

import Field from "../../ui/Field";
import Button from "../../ui/Button";
import { useState } from "react";

export default function UserDetailsStep({ data, setData, next }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(data.email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] font-[var(--font-heading)]">
        Your details
      </h2>

      <Field
        label="Your Name"
        name="name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        error={errors.name}
      />

      <Field
        label="Email Address"
        name="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        error={errors.email}
      />

      <div className="flex justify-center">
        <Button variant="primary" onClick={handleNext} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
}
