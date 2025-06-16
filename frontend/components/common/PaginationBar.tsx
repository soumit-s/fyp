import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PaginationBar({
  numPages,
  currentPage,
  onPageSelect,
}: {
  numPages: number;
  currentPage: number;
  onPageSelect: (pageNumber: number) => any;
}) {
  const series = useMemo(() => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    if (numPages <= 5) {
      return Array(numPages)
        .fill(0)
        .map((_, idx) => idx + 1);
    } else if (currentPage == numPages) {
      return [1, NaN, currentPage - 2, currentPage - 1, currentPage];
    } else if (currentPage == 1) {
      return [1, 2, 3, NaN, numPages];
    } else if (nextPage == numPages) {
      return [1, NaN, currentPage - 1, currentPage, numPages];
    } else if (previousPage == 1) {
      return [1, currentPage, currentPage + 1, NaN, numPages];
    } else {
      return [1, NaN, previousPage, currentPage, nextPage, NaN, numPages];
    }
  }, [numPages, currentPage]);

  const onNextArrowClick = useCallback(() => {
    if (currentPage < numPages) onPageSelect(currentPage + 1);
  }, [currentPage, numPages, onPageSelect]);

  const onPrevArrowClick = useCallback(() => {
    if (currentPage > 1) onPageSelect(currentPage - 1);
  }, [currentPage, numPages, onPageSelect]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {series.map((p, idx) => {
          if (isNaN(p)) {
            return <div key={idx}>...</div>;
          } else {
            return (
              <div
                key={idx}
                className={cn(
                  "hover:underline cursor-pointer",
                  currentPage == p && "underline font-bold"
                )}
                onClick={() => onPageSelect(p)}
              >
                {p}
              </div>
            );
          }
        })}
      </div>
      <div className="flex">
        <Button
          variant="ghost"
          className="w-8 h-8"
          onClick={onPrevArrowClick}
          disabled={currentPage == 1}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          className="w-8 h-8"
          onClick={onNextArrowClick}
          disabled={currentPage == numPages}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
