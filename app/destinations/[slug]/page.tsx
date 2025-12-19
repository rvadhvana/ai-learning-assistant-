import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { getDestinationBySlug } from "@/data/destinations";
import { DestinationDetails } from "@/features/destination/DestinationDetails";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return notFound();

  return (
    <AppShell>
      <DestinationDetails destination={destination} />
    </AppShell>
  );
}

