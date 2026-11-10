
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

export default function DeleteDestinationButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/destination/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to delete destination"
        );
      }

      toast.success("Destination deleted successfully!");
      router.push("/destination");
      router.refresh();

    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" className="gap-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <Trash2 size={16} />
            Delete
          </Button>
        }
      />

      <AlertDialogContent className="bg-card text-card-foreground border-border sm:max-w-md animate-scale-in">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently
            delete this destination from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} className="rounded-xl border-border hover:bg-accent">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            disabled={loading}
            className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-200"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
