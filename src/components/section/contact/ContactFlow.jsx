"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import UserDetailsStep from "../contact/UserDetailsStep";
import CallDecision from "../contact/CallDecision";
import Success from "../../ui/Success";
import Button from "../../ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ContactFlow({ step, setStep }) {
  const totalSteps = 5;

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const packageOption = "Complete Brand Package";

  const [data, setData] = useState({
    service: [],
    message: "",
    name: "",
    email: "",
    availability: "",
    contactMethod: "",
    availabilityType: "slot",
    selectedSlot: "",
    fromTime: "",
    toTime: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  // ================= SUBMIT FUNCTION =================
  const handleSubmit = async () => {
    setError("");

    let finalAvailability = "";

    if (data.availabilityType === "slot") {
      if (!data.selectedSlot) {
        setError("Please select a time slot");
        return;
      }
      finalAvailability = data.selectedSlot;
    }

    if (data.availabilityType === "custom") {
      if (!data.fromTime || !data.toTime) {
        setError("Please select both time fields");
        return;
      }

      if (data.fromTime >= data.toTime) {
        setError("End time must be after start time");
        return;
      }

      finalAvailability = `${data.fromTime} - ${data.toTime}`;
    }

    const payload = {
      ...data,
      contactMethod: "manual",
      availability: finalAvailability,
    };

    try {
      setLoading(true);
      setLoadingMessage("Setting up your call...");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed request");

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setStep(1);
        resetForm();
      },1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ================= CALENDLY FLOW =================
  const handleCalendly = async () => {
    setError("");

    const payload = {
      ...data,
      contactMethod: "calendly",
      availability: "scheduled via calendly",
    };

    try {
      setLoading(true);
      setLoadingMessage("Setting up your call...");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed request");

      setLoading(false);
      setSuccess(true);

      const base = "https://calendly.com/bevichitra1/30min";

      const params = new URLSearchParams({
        name: data.name || "",
        email: data.email || "",
        a1: data.message || "",
      });

      const calendlyUrl = `${base}?${params.toString()}`;

      setTimeout(() => {
        window.open(calendlyUrl, "_blank");
        setStep(1);
        resetForm();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setData({
      service: [],
      message: "",
      name: "",
      email: "",
      availability: "",
      contactMethod: "",
      availabilityType: "slot",
      selectedSlot: "",
      fromTime: "",
      toTime: "",
    });
  };

  const services = [
    "Brand Strategy",
    "Content Writing",
    "Website Creation",
    "SEO Strategy",
    "Video Production",
    "Social Media Management",
    packageOption,
  ];

  return (
    <>
      <Reveal>
        <div
          className={`flex justify-center w-full ${loading ? "pointer-events-none opacity-70" : ""}`}
        >
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 md:p-8 shadow-[var(--shadow-soft)] max-w-4xl w-full">
            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-6">
              {step > 1 ? (
                <button
                  onClick={back}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-blue)]"
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

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">What do you need?</h3>

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
                            className={`p-4 rounded-xl border ${
                              selected
                                ? "bg-[var(--text-primary)] text-[var(--bg-main)] border-[var(--text-primary)]"
                                : "border-[var(--border)] text-[var(--text-primary)]"
                            } ${
                              isLastSingle
                                ? "col-span-2 mx-auto w-[60%]" // 👈 center it
                                : "w-full"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-center">
                      <Button onClick={next} disabled={!data.service.length}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-semibold">
                      Tell us about your project
                    </h3>

                    <textarea
                      value={data.message}
                      onChange={(e) =>
                        setData({ ...data, message: e.target.value })
                      }
                      className="w-full p-4 rounded-xl border"
                    />

                    {data.message.length < 10 && (
                      <p className="text-sm text-red-500">
                        Minimum 10 characters required
                      </p>
                    )}

                    <div className="flex justify-center">
                      <Button
                        onClick={next}
                        disabled={data.message.length < 10}
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
                    onCalendly={handleCalendly}
                    onManual={() => {
                      setData({ ...data, contactMethod: "manual" });
                      setStep(5);
                    }}
                  />
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      When are you available?
                    </h3>

                    {/* 🔹 PREDEFINED SLOTS */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "09:00 - 11:00",
                        "11:00 - 13:00",
                        "14:00 - 17:00",
                        "18:00 - 20:00",
                      ].map((slot) => (
                        <button
                          key={slot}
                          onClick={() =>
                            setData({
                              ...data,
                              availabilityType: "slot",
                              selectedSlot: slot,
                              fromTime: "",
                              toTime: "",
                            })
                          }
                          className={`p-3 rounded-xl border transition ${
                            data.selectedSlot === slot
                              ? "bg-[var(--text-primary)] text-[var(--bg-main)] border-[var(--text-primary)]"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    {/* 🔹 CUSTOM TIME TOGGLE */}
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          availabilityType: "custom",
                          selectedSlot: "",
                        })
                      }
                      className="text-sm underline text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      Prefer custom time?
                    </button>

                    {/* 🔹 CUSTOM TIME INPUT */}
                    {data.availabilityType === "custom" && (
                      <div className="flex gap-4">
                        <div className="w-full">
                          <label className="text-sm text-[var(--text-secondary)]">
                            From
                          </label>
                          <input
                            type="time"
                            value={data.fromTime || ""}
                            onChange={(e) =>
                              setData({
                                ...data,
                                fromTime: e.target.value,
                              })
                            }
                            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                          />
                        </div>

                        <div className="w-full">
                          <label className="text-sm text-[var(--text-secondary)]">
                            To
                          </label>
                          <input
                            type="time"
                            value={data.toTime || ""}
                            onChange={(e) =>
                              setData({
                                ...data,
                                toTime: e.target.value,
                              })
                            }
                            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                          />
                        </div>
                      </div>
                    )}

                    {/* 🔹 ERROR */}
                    {error && (
                      <p className="text-sm text-[var(--color-red)] text-center">
                        {error}
                      </p>
                    )}

                    {/* 🔹 SUBMIT */}
                    <div className="flex justify-center">
                      <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      {loading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white px-6 py-5 rounded-xl text-center shadow-xl">
            <p className="text-lg font-medium">
              {loadingMessage || "Processing..."}
            </p>

            {loadingMessage === "Redirecting to booking page..." && (
              <p className="text-sm text-gray-500 mt-1">
                Opening Calendly in a new tab...
              </p>
            )}
          </div>
        </div>
      )}
      <Success success={success} />
    </>
  );
}
