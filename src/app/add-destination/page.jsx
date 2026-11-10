"use client";

import * as React from "react";
import { CheckIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

const categories = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "Luxury",
  "City Break",
];

const initialForm = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const inputClass = "border-border bg-background text-foreground transition-all duration-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20";

// Reusable Form Field
function FormField({ label, htmlFor, className, children }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="font-semibold text-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function AddPackageForm({ className }) {
  const [form, setForm] = React.useState(initialForm);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Handle Input Changes
  const setField = (field) => (event) => {
    const value = event?.target ? event.target.value : event;

    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setSubmitted(false);
  };

  // Handle Form Submit
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    // Validation
    if (!form.name.trim() || !form.country.trim()) {
      setError("Destination Name and Country are required.");
      return;
    }

    try {
      setLoading(true);

      // POST Request
      const res = await fetch(`https://wander-last-server-dun.vercel.app/add-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Read Response
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add travel package.");
      }

      // Success
      console.log("Destination added successfully:", data);

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error("Submission error:", err);

      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  // Cancel Form
  function handleCancel() {
    setForm(initialForm);
    setError("");
    setSubmitted(false);
  }

  return (
    <form
      data-slot="add-package-form"
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-border/80 bg-card text-card-foreground p-6 shadow-sm md:p-10 transition-all duration-300 animate-fade-in",
        className,
      )}
      noValidate
    >
      <div className="flex flex-col gap-5">
        {/* Destination Name */}
        <FormField label="Destination Name" htmlFor="package-name">
          <Input
            id="package-name"
            name="name"
            type="text"
            placeholder="Bali Paradise"
            value={form.name}
            onChange={setField("name")}
            className={inputClass}
          />
        </FormField>

        {/* Country and Category */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Country" htmlFor="package-country">
            <Input
              id="package-country"
              name="country"
              type="text"
              placeholder="Indonesia"
              value={form.country}
              onChange={setField("country")}
              className={inputClass}
            />
          </FormField>

          <FormField label="Category" htmlFor="package-category">
            <Select value={form.category} onValueChange={setField("category")}>
              <SelectTrigger
                id="package-category"
                className={cn("w-full bg-background border-border text-foreground", inputClass)}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="bg-card text-card-foreground border-border">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {/* Price and Duration */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Price (USD)" htmlFor="package-price">
            <Input
              id="package-price"
              name="price"
              type="number"
              min="0"
              placeholder="e.g. 1299"
              value={form.price}
              onChange={setField("price")}
              className={inputClass}
            />
          </FormField>

          <FormField label="Duration" htmlFor="package-duration">
            <Input
              id="package-duration"
              name="duration"
              type="text"
              placeholder="e.g. 7 Days/6 Nights"
              value={form.duration}
              onChange={setField("duration")}
              className={inputClass}
            />
          </FormField>
        </div>

        {/* Departure Date */}
        <FormField label="Departure Date" htmlFor="package-date">
          <Input
            id="package-date"
            name="departureDate"
            type="date"
            value={form.departureDate}
            onChange={setField("departureDate")}
            className={inputClass}
          />
        </FormField>

        {/* Image URL */}
        <FormField label="Image URL" htmlFor="package-image-url">
          <Input
            id="package-image-url"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={setField("imageUrl")}
            className={inputClass}
          />
        </FormField>

        {/* Description */}
        <FormField label="Description" htmlFor="package-description">
          <Textarea
            id="package-description"
            name="description"
            placeholder="Describe the travel experience..."
            rows={4}
            value={form.description}
            onChange={setField("description")}
            className={cn(inputClass, "min-h-28 rounded-xl")}
          />
        </FormField>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-sm text-destructive font-medium" role="alert">
          {error}
        </p>
      )}

      {/* Success Message */}
      {submitted && (
        <p
          className="mt-4 flex items-center gap-1.5 text-sm text-cyan-600 dark:text-cyan-400 font-medium"
          role="status"
        >
          <CheckIcon className="size-4" />
          Travel package added successfully.
        </p>
      )}

      {/* Buttons */}
      <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
          className="gap-2 rounded-xl border-border text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200 active:scale-95"
        >
          <Trash2Icon className="size-4" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="gap-2 rounded-xl bg-cyan-600 text-white shadow-xs transition-all duration-200 hover:bg-cyan-700 active:scale-95"
        >
          <SaveIcon className="size-4" />
          {loading ? "Adding..." : "Add Travel Package"}
        </Button>
      </div>
    </form>
  );
}

// Main Page
export default function AddDestinationPage() {
  return (
    <main className="min-h-full bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-20 md:pt-16">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Expand the catalog
          </span>
          <h1 className="mt-2 text-4xl font-normal tracking-tight text-foreground md:text-5xl font-serif">
            Add New Travel Package
          </h1>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <AddPackageForm />
        </div>
      </div>
    </main>
  );
}
