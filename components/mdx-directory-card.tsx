import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Route } from "next"
import { Icons } from "./ui/icons"

interface DirectoryProps {
  name: string
  email: string
  position: string
  image?: string
}

export const DirectoryCard = ({
    name,
    email,
    position,
    image,
    ...props
}: DirectoryProps) => {
    return (
        <div className={cn("my-6 flex items-start p-4")} {...props}>
            {image && (
                <Image
                    src={image}
                    alt={name}
                    width={250}
                    height={250}
                    className="mr-4 rounded-full h-28 w-28"
                />
            )}
            <div>
                <h3 className="text-3xl font-semibold">{name}</h3>
                <p>{position}</p>
<div className="inline-flex items-center">
    <Icons.mail className="mr-2 h-4 w-4" />
                <Link href={`mailto:${email}`} className="hover:underline" >{email}</Link>
</div>
            </div>
        </div>
    );
};