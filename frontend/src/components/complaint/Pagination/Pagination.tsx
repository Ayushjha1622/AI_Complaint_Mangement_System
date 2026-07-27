import Button from "@/components/ui/Button/Button";

interface Props {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-3">
        <Button
          onClick={onPrevious}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
