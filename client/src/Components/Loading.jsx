import { Spinner } from "flowbite-react";
export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" color="success" />
      </div>
    </div>
  );
}
