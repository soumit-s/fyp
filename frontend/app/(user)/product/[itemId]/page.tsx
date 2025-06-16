"use client";
import React from "react";
import { useEffect, useState } from "react";
import data from "@/lib/data";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import toast from "react-hot-toast";
import Rating from "@mui/material/Rating";
import ItemCard from "@/components/common/ItemCard";
import LinkSection from "@/components/ui/LinkSection";
import { use } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftCircleIcon,
  ChevronLeftIcon,
  ChevronRightCircleIcon,
  ChevronRightIcon,
  CircleIcon,
  DotIcon,
  HeartIcon,
  IndianRupeeIcon,
  Loader2Icon,
  ShoppingCartIcon,
} from "lucide-react";
import { Item } from "@/lib/types";
import { Input } from "@/components/ui/input";
import StyledRating from "@/components/common/StyledRating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAddToCart, useProduct, useWishlistProduct } from "@/lib/hooks";

interface ItemDetails {
  imgUrl: string[];
  name: string;
  ratings: string;
  specs: string;
  price: string;
}
interface SimilarItem {
  imgUrl: string[];
  name: string;
  price: string;
  duration: string;
}

const formSchema = z.object({
  pincode: z.preprocess(
    (val) =>
      typeof val === "string" || typeof val === "number"
        ? Number(val)
        : undefined,
    z
      .number({
        required_error: "Pincode is required",
        invalid_type_error: "Pincode must be a number",
      })
      .int()
      .min(100000, "Pincode must be at least 6 digits")
      .max(999999, "Pincode must be at most 6 digits")
  ),
});

type FormSchema = z.infer<typeof formSchema>;

const { obj1, similarItem } = data;

const page = ({ params }: { params: Promise<{ itemId: string }> }) => {
  const { itemId } = use(params);

  // db call to fetch item details from DB based on itemId;
  // let obj = DB call  ;
  const [urlImg, setUrlImg] = useState<string>(obj1?.imgUrl[0]);
  const product = useProduct({ productId: itemId });
  const { addToCart } = useAddToCart({ productId: Number.parseInt(itemId) });
  const { wishlist, dewishlist } = useWishlistProduct({ productId: Number.parseInt(itemId) });
  const [itemDetails, setitemDetails] = useState<ItemDetails>({
    imgUrl: [],
    name: "",
    ratings: "",
    specs: "",
    price: "",
  });

  useEffect(() => {
    const fetchDetails = () => {
      toast("ID changed to " + itemId);
      // api call to fetch item details based on itemId
      let { imgUrl, name, rating, specs, price } = obj1;
      let ratings = rating.toString();
      setitemDetails({ imgUrl, name, ratings, specs, price });
      // console.log(rating);
    };
    fetchDetails();
    // console.log(obj1);
  }, [itemId]);

  const [imgIndex, setImgIndex] = useState(0);
  let n = itemDetails.imgUrl.length;

  const handleRightArrowClick = () => {
    // Logic to handle right arrow click
    // console.log("Right arrow clicked");
    let newIndex = (imgIndex + 1) % n;
    setImgIndex(newIndex);
    setUrlImg(itemDetails.imgUrl[newIndex]);
    // console.log("img setted , next index ->" , newIndex )
  };
  const handleLeftArrowClick = () => {
    // Logic to handle right arrow click
    // console.log("Left arrow clicked");
    let newIndex = imgIndex - 1 >= 0 ? imgIndex - 1 : n - 1;
    setImgIndex(newIndex);
    setUrlImg(itemDetails.imgUrl[newIndex]);
    // console.log("img setted ->" , newIndex )
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      pincode: undefined,
    },
    resolver: zodResolver(formSchema),
  });
  const submitHandler = async (data: FormSchema) => {
    // console.log("pincode", data.pincode)
    // api call backkend-> check pincode
    reset();
  };

  const handleRentNow = () => {
    // api call to rent now -> id :: itemId
    toast("moved to buy now page");
  };
  //Similar item load
  const [similarItems, setSimilarItems] = useState<Item[]>([]);
  useEffect(() => {
    // api call to get similar items based on itemId
    setSimilarItems(similarItem);
  }, [itemId]);

  if (product.isLoading) {
    return (
      <div className="h-40 w-full">
        <Loader2Icon className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!product.data) {
    return <div className="h-40 w-full">Oops :( Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-8 pb-20 mt-8">
      <div className="flex mx-auto gap-x-16">
        {/* left */}
        <div className="relative w-1/2">
          <div className="h-full mx-auto overflow-hidden rounded-2xl">
            <img src={urlImg} className="w-full h-full" />
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-4">
            {/* left */}
            <button
              onClick={handleLeftArrowClick}
              className="bg-white rounded-full p-2"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            {/* right  */}
            <button
              onClick={handleRightArrowClick}
              className="bg-white rounded-full p-2"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col w-1/2 justify-center gap-y-6">
          <h1 className="font-bold text-4xl"> {product.data.name} </h1>
          <div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <StyledRating
                  name="read-only"
                  value={product.data.ratingAverage}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <span className="text-sm font-semibold">
                  ({product.data.ratingCount})
                </span>
              </div>
              {/* <CircleIcon className="w-[0.2rem] h-[0.2rem] text-neutral-400" /> */}
              <DotIcon className="text-neutral-400" />
              <div className="items-center flex gap-1">
                <IndianRupeeIcon className="w-4 h-4" />{" "}
                <b>{product.data.dailyPrice}</b>{" "}
                <span className="text-xs">per day</span>
              </div>
              <DotIcon className="text-neutral-400" />
              <div className="text-sm font-semibold">
                {product.data.remainingStock} remaining
              </div>
            </div>
            <div className="text-sm leading-relaxed mt-4">
              {product.data.description}
            </div>
          </div>
          <div>
            {/* delivery date call */}
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex gap-x-4 items-center">
                <label className="flex gap-x-4 justify-center items-center text-sm">
                  <p className="text-left text-neutral-600">
                    Check delivery date
                  </p>
                  <Input type="number" {...register("pincode")} />
                </label>
                <Button type="submit" variant="outline">
                  Check
                </Button>
              </div>
              {errors.pincode && (
                <div className="mt-4 text-sm">
                  <ErrorMessage message={errors.pincode.message} />
                </div>
              )}
            </form>

            <div>{/* delivery Date */}</div>
          </div>
          <div className="w-full">
            <Button onClick={handleRentNow} className="w-full py-6">
              Rent Now
            </Button>
          </div>
          <div className="w-full flex items-center gap-x-4">
            <Button onClick={() => product.data?.isWishlisted ? dewishlist() : wishlist()} variant="ghost">
              {!product.data.isWishlisted ? (
                <>
                  <HeartIcon />
                  Add to Wishlist
                </>
              ) : (
                <>
                  <HeartIcon fill="red" />
                  Wishlisted
                </>
              )}
            </Button>
            <div className="h-6 border-l border-l-neutral-200"></div>
            <Button onClick={() => addToCart()} variant="ghost">
              <ShoppingCartIcon />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* similar items  */}

      <Carousel className="mt-8">
        <CarouselContent className="-ml-10">
          {similarItems.length > 0 &&
            similarItems.map((item, index) => {
              // ** fix ::  add item id in schema and pass it to item card
              return (
                <CarouselItem key={index} className="basis-1/6 pl-10">
                  <ItemCard item={item} />
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default page;
