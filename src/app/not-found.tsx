import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <Container className="pt-40 pb-24">
      <p className="font-mono text-xs text-fg-faint">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-fg">Page not found</h1>
      <p className="mt-3 text-sm text-fg-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 inline-flex items-center gap-1.5 text-sm text-fg hover:text-accent">
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to home
      </Link>
    </Container>
  );
}
