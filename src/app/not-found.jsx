import Button from "@/composants/Button";

export default function NotFound() {
  return (
    <div className="flex  flex-col gap-2.5 justify-center items-center h-screen">
      <h2 className="text-3xl">404 Not Found </h2>
      <p>Could not find requested resource</p>
      <Button href="/">return</Button>
    </div>
  );
}
