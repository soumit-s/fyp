import { HeartIcon, IndianRupeeIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import StyledRating from "./StyledRating";
import Image from "next/image";
import { Wishlist } from "@/lib/types";
import { useAddToCart, useWishlistProduct } from "@/lib/hooks";

export default function WishlistCard({ wishlist: w }: { wishlist: Wishlist }) {
  const { dewishlist } = useWishlistProduct({ productId: w.product.id });
  const { addToCart } = useAddToCart({ productId: w.product.id });
  return (
    <div className="flex gap-4">
      <Image
        width={400}
        height={400}
        className="w-40 h-40 aspect-square overflow-hidden rounded-lg border border-neutral-200"
        alt=":("
        src="/phones.jpg"
      />
      <div>
        <h1 className="font-bold text-xl">{w.product.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <StyledRating
            precision={0.5}
            defaultValue={0}
            value={w.product.ratingAverage}
            readOnly
            size="small"
          />
          <span className="text-xs">({w.product.ratingCount})</span>
        </div>
        <div className="flex items-center gap-1 text-xs mt-2">
          <IndianRupeeIcon className="w-3 h-3" /> <b>{w.product.dailyPrice}</b>{" "}
          per day
        </div>
        <div className="mt-4 mb-2 text-sm">{w.product.description}</div>
        <div className="w-full flex items-center gap-x-4">
          <Button onClick={() => dewishlist()} variant="ghost">
            <HeartIcon fill="red" />
            Wishlisted
          </Button>
          <div className="h-6 border-l border-l-neutral-200"></div>
          <Button onClick={() => addToCart()} variant="ghost">
            <ShoppingCartIcon />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
