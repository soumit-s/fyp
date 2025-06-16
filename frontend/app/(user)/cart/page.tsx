"use client";

import StyledRating from "@/components/common/StyledRating";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/hooks";
import { CartItem } from "@/lib/types";
import {
  DotIcon,
  IndianRupeeIcon,
  Loader2Icon,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const cart = useCart();
  if (cart.isLoading) {
    return (
      <div className="mx-auto h-40 w-full flex items-center justify-center">
        <Loader2Icon className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!cart.data?.cartItems.length) {
    return (
      <div className="mx-auto h-40 w-full flex items-center justify-center">
        No items in cart
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex gap-4 mt-4">
        <Input type="datetime-local" />
        -
        <Input type="datetime-local" />
      </div>
      <div className="gap-12 flex flex-col">
        {cart.data.cartItems.map((item) => {
          return (
            <div key={item.id}>
              <CartItemCard item={item} />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-4 py-4 mt-20 border-t">
        <Button variant={"destructive"}>Cancel</Button>
        <Button>Place Order</Button>
      </div>
    </div>
  );
}

function CartItemCard({ item }: { item: CartItem }) {
  return (
    <div className="flex gap-8">
      <Image
        width={600}
        height={600}
        src={"/images/homeappliances_category_banner.jpg"}
        alt={":)"}
        className="rounded-lg overflow-hidden w-40 h-40"
      />
      <div>
        <h1>
          <a href={"/product/" + item.product.id} className="font-bold text-xl">
            {item.product.name}
          </a>
        </h1>
        <div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <StyledRating
                name="read-only"
                value={item.product.ratingAverage}
                precision={0.5}
                readOnly
                size="small"
              />
              <span className="text-sm font-semibold">
                ({item.product.ratingCount})
              </span>
            </div>
            {/* <CircleIcon className="w-[0.2rem] h-[0.2rem] text-neutral-400" /> */}
            <DotIcon className="text-neutral-400" />
            <div className="items-center flex gap-1">
              <IndianRupeeIcon className="w-4 h-4" />{" "}
              <b>{item.product.dailyPrice}</b>{" "}
              <span className="text-xs">per day</span>
            </div>
            <DotIcon className="text-neutral-400" />
            <div className="text-sm font-semibold">
              {item.product.remainingStock} remaining
            </div>
          </div>
          <div className="text-sm leading-relaxed mt-4">
            {item.product.description}
          </div>
        </div>
        {/* <div className="text-xs text-neutral-400 mt-4">
          Added on {item.createdAt}
        </div> */}
        <div className="flex gap-4 items-center text-sm mt-4">
          Quantity <Input className="w-20 h-8" />
        </div>
      </div>
    </div>
  );
}
