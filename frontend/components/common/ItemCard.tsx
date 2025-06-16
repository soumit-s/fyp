"use client";
import Image from "next/image";
import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";
import { IndianRupeeIcon } from "lucide-react";
import StyledRating from "./StyledRating";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ItemCardProps {
  item: Item;
  className?: string;
}

export default function ItemCard({ item, className }: ItemCardProps) {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  return (
    <div
      className={cn("cursor-pointer", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/home/product/${item.id}`)}
    >
      <Image
        width={300}
        height={400}
        src={item.imgUrl}
        alt=":("
        className="rounded-lg overflow-hidden aspect-[40/41]"
      />
      <div className="mt-4">
        <span
          className={cn("font-semibold text-sm", hover && "underline underline-offset-4 decoration-2")}
        >
          {item.name}
        </span>
        <div className="flex items-center gap-2 mt-2">
          <StyledRating
            precision={0.5}
            defaultValue={0}
            value={item.rating}
            readOnly
            size="small"
          />
          <span className="text-xs">({item.numRatings})</span>
        </div>
        <div className="flex items-center gap-1 text-xs mt-2">
          <IndianRupeeIcon className="w-3 h-3" /> {item.price}
        </div>
      </div>
    </div>
  );
}
