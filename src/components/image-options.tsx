"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const ImageOptions: React.FC = () => {
  // Todo
  const handleEdit = () => {
    console.log("Edit");
  };

  // Todo
  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <div className="flex flex-grow gap-x-4">
      <Button onClick={handleEdit} variant="secondary" className="grow gap-x-2">
        Editar
        <Pencil className="size-4" />
      </Button>
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="grow gap-x-2"
      >
        Borrar
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};
