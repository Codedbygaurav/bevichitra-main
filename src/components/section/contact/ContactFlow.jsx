"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import UserDetailsStep from "../contact/UserDetailsStep";
import CallDecision from "../contact/CallDecision";
import CalendlyModal from "../contact/CanlendlyModal";
import Success from "../../ui/Success";
import Button from "../../ui/Button";

export default function ContactFlow({ step, setStep }) {
  const totalSteps = 5;

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const packageOption = "Complete Brand Package";

  const [data, setData] = useState({
    service: [],
    message: "",
    name: "",
    email: "",
    availability: "",
    contactMethod: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = async () => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setSuccess(true);
      setStep(1);
    } catch {
      alert("Something went wrong");
    }
  };

  const services = [
    "Brand Strategy",
    "Content Writing",
    "Website Creation",
    "SEO Strategy",
    "Video Production",
    packageOption,
  ];

  return (
    <>
      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 md:p-8 shadow-[var(--shadow-soft)]">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between mb-6">
          {step > 1 ? (
            <button
              onClick={back}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-blue)] transition"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <span className="text-sm text-[var(--text-secondary)]">
            Step {step} of {totalSteps}
          </span>
        </div>

        {/* ================= STEPS ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  What do you need?
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {services.map((item, index) => {
                    const selected = data.service.includes(item);

                    const isLastSingle =
                      services.length % 2 !== 0 &&
                      index === services.length - 1;

                    return (
                      <button
                        key={item}
                        onClick={() => {
                          let updated = [...data.service];

                          if (item === packageOption) {
                            updated = selected ? [] : [packageOption];
                          } else {
                            updated = updated.filter(
                              (s) => s !== packageOption,
                            );

                            updated = selected
                              ? updated.filter((s) => s !== item)
                              : [...updated, item];
                          }

                          setData({ ...data, service: updated });
                        }}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          selected
                            ? "bg-[var(--color-blue)] text-white border-[var(--color-blue)] shadow-[var(--shadow-soft)]"
                            : "bg-[var(--bg-secondary)] border-[var(--border)] hover:bg-[var(--bg-elevated)] hover:border-[var(--color-blue)]"
                        } ${
                          isLastSingle ? "col-span-2 mx-auto w-[60%]" : "w-full"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={next}
                    disabled={data.service.length === 0}
                    className="w-full sm:w-[220px]"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Tell us about your project
                </h3>
                <textarea
                  value={data.message}
                  onChange={(e) =>
                    setData({ ...data, message: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  placeholder="Describe your idea..."
                />

                {data.message.trim().length > 0 &&
                  data.message.trim().length < 10 && (
                    <p className="text-sm text-[var(--color-red)]">
                      Please enter at least 10 characters
                    </p>
                  )}

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={next}
                    disabled={data.message.trim().length < 10}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <UserDetailsStep data={data} setData={setData} next={next} />
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <CallDecision
                onCalendly={() => {
                  setData({
                    ...data,
                    contactMethod: "calendly",
                  });
                  setOpen(true);
                }}
                onManual={() => {
                  setData({
                    ...data,
                    contactMethod: "manual",
                  });
                  setStep(5);
                }}
              />
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  When are you available?
                </h3>

                <textarea
                  value={data.availability}
                  onChange={(e) =>
                    setData({
                      ...data,
                      availability: e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  placeholder="Preferred time..."
                />
                <div className="flex justify-center">
                  <Button
                    variant="warm"
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <CalendlyModal open={open} setOpen={setOpen} />
      <Success success={success} />
    </>
  );
}
