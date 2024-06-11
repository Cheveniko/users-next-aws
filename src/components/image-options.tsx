"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./delete-button";

type ImageOptionsProps = {
  firstName: string;
  id: string;
};

export const ImageOptions: React.FC<ImageOptionsProps> = ({
  id,
  firstName,
}) => {
  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <div className="flex flex-grow gap-x-4">
      <Link href="/edit" className="inline-flex grow">
        <Button variant="secondary" className="grow gap-x-2">
          Editar
          <Pencil className="size-4" />
        </Button>
      </Link>
      <DeleteButton id={id} firstName={firstName} />
    </div>
  );
};
