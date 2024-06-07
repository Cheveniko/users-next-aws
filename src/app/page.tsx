import { Footer } from "@/components/footer";
import { ImagesContainer } from "@/components/images-container";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container min-h-screen space-y-8 pb-4 pt-20">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          Proyecto primer bimestre Cloud Computing
        </h1>
        <h3 className="scroll-m-20 text-center text-xl font-semibold tracking-tight text-muted-foreground">
          Grupo 5: Nicolás Baquero, Adhisson Cedeño, José Guzmán, Alejandra Oña,
          Ivonne Ramirez
        </h3>
      </div>
      <div className="space-y-8 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
            Imágenes subidas
          </h3>
          <Link href="/new">
            <Button className="flex gap-x-2 text-base">
              <CirclePlus /> Nueva imagen
            </Button>
          </Link>
        </div>
        <ImagesContainer />
      </div>
      <Footer />
    </main>
  );
}
