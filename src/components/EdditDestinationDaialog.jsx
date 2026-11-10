
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditDestinationDialog = ({ destination, id }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedDestination = {
      name: formData.get("name"),
      country: formData.get("country"),
      imageUrl: formData.get("imageUrl"),
      price: Number(formData.get("price")),
      duration: formData.get("duration"),
      rating: Number(formData.get("rating")),
      reviews: Number(formData.get("reviews")),
      departureDate: formData.get("departureDate"),
      description: formData.get("description"),
    };

    try {
      setLoading(true);
      setError("");

      const destinationId = destination?._id || id;

      if (!destinationId) {
        throw new Error("Destination ID is missing!");
      }

      const res = await fetch(
        `http://localhost:8000/destination/${destinationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDestination),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to update destination"
        );
      }

      toast.success("Destination updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Update destination error:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const departureDate =
    destination?.departureDate &&
    !Number.isNaN(new Date(destination.departureDate).getTime())
      ? new Date(destination.departureDate)
          .toISOString()
          .split("T")[0]
      : "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Edit Button */}
      <DialogTrigger
        render={
          <Button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-cyan-600 text-white shadow-xs transition-all duration-200 hover:bg-cyan-700 active:scale-95"
          >
            <Pencil size={16} />
            Edit
          </Button>
        }
      />

      {/* Edit Form */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg bg-card text-card-foreground border-border animate-scale-in">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Destination</DialogTitle>

            <DialogDescription className="text-muted-foreground">
              Update your destination details and information.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-6">
            {/* Destination Name */}
            <Field>
              <Label htmlFor="name" className="text-foreground">Destination Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={
                  destination?.name || destination?.title || ""
                }
                className="bg-background border-border text-foreground focus:ring-cyan-500"
                required
              />
            </Field>

            {/* Country */}
            <Field>
              <Label htmlFor="country" className="text-foreground">Country</Label>
              <Input
                id="country"
                name="country"
                defaultValue={destination?.country || ""}
                className="bg-background border-border text-foreground focus:ring-cyan-500"
                required
              />
            </Field>

            {/* Image URL */}
            <Field>
              <Label htmlFor="imageUrl" className="text-foreground">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={
                  destination?.imageUrl || destination?.image || ""
                }
                className="bg-background border-border text-foreground focus:ring-cyan-500"
                required
              />
            </Field>

            {/* Price */}
            <Field>
              <Label htmlFor="price" className="text-foreground">Price ($ USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                defaultValue={destination?.price ?? ""}
                className="bg-background border-border text-foreground focus:ring-cyan-500"
                required
              />
            </Field>

            {/* Duration */}
            <Field>
              <Label htmlFor="duration" className="text-foreground">Duration</Label>
              <Input
                id="duration"
                name="duration"
                defaultValue={destination?.duration || ""}
                className="bg-background border-border text-foreground focus:ring-cyan-500"
                required
              />
            </Field>

            {/* Rating */}
            <Field>
              <Label htmlFor="rating" className="text-foreground">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={destination?.rating ?? ""}
                className="bg-background border-border text-foreground focus:ring-cyan-500"
              />
            </Field>

            {/* Reviews */}
            <Field>
              <Label htmlFor="reviews" className="text-foreground">Reviews</Label>
              <Input
                id="reviews"
                name="reviews"
                type="number"
                min="0"
                defaultValue={destination?.reviews ?? ""}
                className="bg-background border-border text-foreground focus:ring-cyan-500"
              />
            </Field>

            {/* Departure Date */}
            <Field>
              <Label htmlFor="departureDate" className="text-foreground">
                Departure Date
              </Label>

              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                defaultValue={departureDate}
                className="bg-background border-border text-foreground focus:ring-cyan-500"
              />
            </Field>

            {/* Description */}
            <Field>
              <Label htmlFor="description" className="text-foreground">Description</Label>

              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={destination?.description || ""}
                className="w-full rounded-xl border border-border bg-background text-foreground px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </Field>
          </FieldGroup>

          {/* Error Message */}
          {error && (
            <p className="mb-4 text-sm text-destructive font-medium">
              {error}
            </p>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="rounded-xl border-border hover:bg-accent"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 shadow-xs transition-all duration-200"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
