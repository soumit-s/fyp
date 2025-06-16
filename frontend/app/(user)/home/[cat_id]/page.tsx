"use client";
import Navbar from "@/components/ui/navbar";
import React, { useEffect, useState } from "react";
import data from "@/lib/data";
import ItemCard from "@/components/common/ItemCard";
import RentalDuration from "@/components/ui/RentalDuration";
import LinkSection from "@/components/ui/LinkSection";
import { Item } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationBar from "@/components/common/PaginationBar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const filterSchema = z.object({
  currentPage: z.number(),
});

type FilterSchema = z.infer<typeof filterSchema>;

const page = () => {
  const { similarItem } = data;
  const [displayItem, setDisplayItem] = useState<Item[]>([]);
  const [isLoading, setLoading] = useState(false);
  const filterForm = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      currentPage: 1,
    },
  });
  const [currentPage] = filterForm.watch(["currentPage"]);

	useEffect(()=>{
		setDisplayItem(similarItem) ; 
		console.log(similarItem) ; 

	} , [similarItem])

  return (
    <div className="w-full flex flex-col">
      <div className="justify-end flex mb-4">
        <PaginationBar
          currentPage={currentPage}
          numPages={20}
          onPageSelect={(p) => filterForm.setValue("currentPage", p)}
        />
      </div>
      <div className="mx-auto  grid grid-cols-6 gap-8 mb-8">
        {isLoading ? (
          <div className="font-bold text-4xl">Loading ... </div>
        ) : (
          displayItem.length > 0 &&
          displayItem.map((item, index) => {
            return <ItemCard key={index} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default page;
