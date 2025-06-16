"use client";
import WishlistCard from "@/components/common/WishlistCard";
import { useWishlists } from "@/lib/hooks";
import { IndianRupeeIcon, Loader2Icon } from "lucide-react";
import { Fragment } from "react";

export default function Wishlists() {
  const wishlists = useWishlists();
  if (wishlists.isLoading) {
    return (
      <div className="w-full p-20">
        <Loader2Icon className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!wishlists.data?.length) {
    return (
      <div className="w-full flex items-center justify-center py-20 px-10">
        No wishlists
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-8 mb-8">
      {wishlists.data.map((w, idx) => {
        return (
          <Fragment key={w.id}>
            <WishlistCard wishlist={w} />
            {idx + 1 < (wishlists.data?.length ?? 0) && <hr className="border-gray-200" />}
          </Fragment>
        );
      })}
    </div>
  );
}
