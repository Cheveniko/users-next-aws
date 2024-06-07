import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageOptions } from "@/components/image-options";

// Podemos cambiarle el nombre si quieren xd
type Image = {
  url: string;
  alt: string;
  label: string;
};

// Aquí deberíamos hacer un fetch a la base de datos para obtener un array con las imágenes
// const images = getImages()
const images: Image[] = [
  {
    url: "https://media.licdn.com/dms/image/D4D03AQEQpyKvGBV1Kw/profile-displayphoto-shrink_400_400/0/1674006881410?e=1723075200&v=beta&t=2jNnAtM72m9QYF4dx8oWXnZ-nDNZ-XlKXQsuYJl2Ww0",
    alt: "Adhi",
    label: "Adhi",
  },
  {
    url: "https://media.licdn.com/dms/image/D4D03AQEQpyKvGBV1Kw/profile-displayphoto-shrink_400_400/0/1674006881410?e=1723075200&v=beta&t=2jNnAtM72m9QYF4dx8oWXnZ-nDNZ-XlKXQsuYJl2Ww0",
    alt: "Adhi",
    label: "Adhi",
  },
  {
    url: "https://media.licdn.com/dms/image/D4D03AQEQpyKvGBV1Kw/profile-displayphoto-shrink_400_400/0/1674006881410?e=1723075200&v=beta&t=2jNnAtM72m9QYF4dx8oWXnZ-nDNZ-XlKXQsuYJl2Ww0",
    alt: "Adhi",
    label: "Adhi",
  },
  {
    url: "https://media.licdn.com/dms/image/D4D03AQEQpyKvGBV1Kw/profile-displayphoto-shrink_400_400/0/1674006881410?e=1723075200&v=beta&t=2jNnAtM72m9QYF4dx8oWXnZ-nDNZ-XlKXQsuYJl2Ww0",
    alt: "Adhi",
    label: "Adhi",
  },
];

export const ImagesContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-12 items-center justify-between gap-6">
      {images.map((image, index) => (
        <ImageCard key={index} image={image} />
      ))}
    </div>
  );
};

type ImageCardProps = { image: Image };

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const { url, label, alt } = image;

  return (
    <Card className="col-span-4">
      <CardHeader className="px-0 pt-0">
        <img src={url} alt={alt} className="rounded-t-md" />
      </CardHeader>
      <CardContent>
        <CardTitle>{label}</CardTitle>
      </CardContent>
      <CardFooter>
        <ImageOptions />
      </CardFooter>
    </Card>
  );
};
