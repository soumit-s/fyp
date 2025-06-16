import { useProductCategories } from "@/lib/hooks";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CategorySection() {
  const categories = useProductCategories();
  const router = useRouter();

  if (categories.isLoading) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <Loader2Icon className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-6">
      {categories.data?.map((c) => {
        return (
          <div
            key={c.id}
            className="flex flex-col items-center justify-between transition cursor-pointer"
            onClick={() => router.push(`/home/${c.id}`)}
            role="button"
            tabIndex={0}
          >
            <Image
              src={c.imageUrl ?? "/cameras.jpg"}
              alt={c.name}
              width={600}
              height={800}
              className="border border-neutral-200 aspect-square rounded-t-lg overflow-hidden"
            />
            <div className="w-full py-2 text-center text-xs font-medium min-h-[24px] border border-t-0 border-gray-800 rounded-b-lg bg-gray-800  text-white">
              {c.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
