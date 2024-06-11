import { Github } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <div className="text-muted-foreground">
      <p>EPN 2024-A</p>
      <Link
        href="https://github.com/Cheveniko/users-next-aws"
        className="flex w-fit gap-x-2 transition-all hover:text-foreground"
      >
        <Github />
        Repositorio
      </Link>
    </div>
  );
};
