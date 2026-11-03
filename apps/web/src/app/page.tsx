import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-semibold tracking-tight">Hackathon</h1>
      <p className="text-muted-foreground">Скелет готов. Начинайте с src/app/page.tsx.</p>
      <Button>Начать</Button>
    </main>
  );
}
