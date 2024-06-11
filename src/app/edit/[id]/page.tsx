import { EditImageForm } from "@/components/edit-image";

type PathParams = {
  params: Params;
};

type Params = { id: string };

export default function EditPage({ params }: PathParams) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <EditImageForm id={params.id} />
    </div>
  );
}
