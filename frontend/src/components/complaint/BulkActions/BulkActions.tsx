import Button from "@/components/ui/Button/Button";

export default function BulkActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">
        Assign Selected
      </Button>

      <Button variant="secondary">
        Export CSV
      </Button>

      <Button variant="secondary">
        Mark Resolved
      </Button>

      <Button variant="danger">
        Delete
      </Button>
    </div>
  );
}
