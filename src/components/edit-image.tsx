/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type EditImageFormProps = {
  id: string;
};

export const EditImageForm: React.FC<EditImageFormProps> = ({ id }) => {
  const router = useRouter();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");

  const formSchema = z.object({
    firstName: z.string().min(1, "Debes ingresar el nombre"),
    lastName: z.string().min(1, "Debes ingresar el apellido"),
    email: z.string().email("Debes ingresar un correo válido"),
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, "Por favor sube una imagen"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  // Aquí se debe subir a S3 la imagen y guardar en la BDD el link de la imagen subida
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append("image", values.image, values.image.name);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);

    console.log(formData);
    const reponse = await fetch(
      `http://ec2-34-228-145-128.compute-1.amazonaws.com/api/users/${id}`,
      { method: "PUT", body: formData, redirect: "follow" },
    );
    const data = await reponse.json();
    console.log(data);
    toast.success(`Usuario editado correctamente 🎉 ${values.image.name}`);
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto w-[650px]">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Sube tu imagen
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-8 shadow-sm"
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[500px] rounded-lg"
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p>Suelta la imagen!</p>
                  ) : (
                    <p>Da click aquí o arrastra una imagen para subirla</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    La imagen debe pesar menos de 1MB y de tipo png, jpg o jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mx-auto block h-auto rounded-lg px-8 py-3 text-xl"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
};
