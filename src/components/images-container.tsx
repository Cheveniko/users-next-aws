"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageOptions } from "@/components/image-options";
import React from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  createdAt: string;
};

export const ImagesContainer: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    fetch(
      "http://ec2-34-228-145-128.compute-1.amazonaws.com/api/users/get-all-users",
    ).then((res) =>
      res.json().then((data) => {
        console.log(data);
        setUsers(data);
      }),
    );
  }, []);

  return (
    <div className="grid grid-cols-12 items-center justify-between gap-6">
      {users.map((user, index) => (
        <ImageCard key={index} user={user} />
      ))}
    </div>
  );
};

type ImageCardProps = { user: User };

export const ImageCard: React.FC<ImageCardProps> = ({ user }) => {
  const { firstName, lastName, email, photoUrl, id, createdAt } = user;

  return (
    <Card className="col-span-4">
      <CardHeader className="px-0 pt-0">
        <img src={photoUrl} alt={firstName} className="rounded-t-md" />
      </CardHeader>
      <CardContent>
        <CardTitle>
          {firstName} {lastName}
        </CardTitle>
        <CardDescription>
          {email} <br />
          Creado el: {createdAt.slice(0, 10)}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <ImageOptions firstName={firstName} id={id} />
      </CardFooter>
    </Card>
  );
};
