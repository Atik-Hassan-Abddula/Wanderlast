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

const inputClass = "border-input/50 bg-[#f7f9fc]";

// Reusable Form Field
function FormField({ label, htmlFor, className, children }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="font-semibold">
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
      const res = await fetch("http://localhost:8000/add-destination", {
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
        "rounded-md bg-background p-6 shadow-sm md:p-10",
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
                className={cn("w-full bg-[#f7f9fc]", inputClass)}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
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
            className={cn(inputClass, "min-h-28")}
          />
        </FormField>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {/* Success Message */}
      {submitted && (
        <p
          className="mt-4 flex items-center gap-1.5 text-sm text-[#1d9cb2]"
          role="status"
        >
          <CheckIcon className="size-4" />
          Travel package added successfully.
        </p>
      )}

      {/* Buttons */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
          className="gap-2 text-destructive hover:text-destructive"
        >
          <Trash2Icon className="size-4" />
          Cancel
        
        </Button>
        

        <Button
          type="submit"
          disabled={loading}
          className="gap-2 bg-[#1d9cb2] text-white hover:bg-[#17869a]"
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
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-20 md:pt-16">
        <h1 className="text-4xl font-normal tracking-tight md:text-5xl">
          Add New Travel Package
        </h1>

        <div className="mx-auto mt-10 max-w-xl">
          <AddPackageForm />
        </div>
      </div>
    </main>
  );
}
