import { EditImageForm } from "@/components/edit-image";

type PathParams = {
  params: Params;
};

type Params = { id: string };

export default function EditPage({ params }: PathParams) {
  return (
    <div className="container flex justify-center py-20">
      <EditImageForm id={params.id} />
    </div>
  );
}
