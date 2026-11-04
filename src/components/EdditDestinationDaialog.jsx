
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

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
  console.log(destination)

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const res = await fetch(
        `http://localhost:8000/destination/${destination._id}`,
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

      setOpen(false);
      router.refresh();

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* Edit Button */}
      <DialogTrigger
        render={
          <Button
            type="button"
            className="flex items-center gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
          >
            <Pencil size={16} />
            Edit
          </Button>
        }
      />

      {/* Edit Form */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">

        <form onSubmit={handleSubmit}>

          <DialogHeader>
            <DialogTitle>
              Edit Destination
            </DialogTitle>

            <DialogDescription>
              Update your destination information.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-6">

            <Field>
              <Label htmlFor="name">
                Destination Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={destination.name || ""}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="country">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                defaultValue={destination.country || ""}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="imageUrl">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={destination.imageUrl || ""}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="price">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                defaultValue={destination.price ?? ""}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="duration">
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                defaultValue={destination.duration || ""}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="rating">
                Rating
              </Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={destination.rating ?? ""}
              />
            </Field>

            <Field>
              <Label htmlFor="reviews">
                Reviews
              </Label>
              <Input
                id="reviews"
                name="reviews"
                type="number"
                min="0"
                defaultValue={destination.reviews ?? ""}
              />
            </Field>

            <Field>
              <Label htmlFor="departureDate">
                Departure Date
              </Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                defaultValue={
                  destination.departureDate &&
                  !Number.isNaN(
                    new Date(destination.departureDate).getTime()
                  )
                    ? new Date(destination.departureDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
              />
            </Field>

            <Field>
              <Label htmlFor="description">
                Description
              </Label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={destination.description || ""}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </Field>

          </FieldGroup>

          {error && (
            <p className="mb-4 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3">

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-cyan-600 text-white hover:bg-cyan-700"
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
