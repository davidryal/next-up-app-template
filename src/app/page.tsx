import { getPaths } from '@/lib/paths';
import { HomePageClient } from '@/components/HomePageClient';
import React from 'react';

interface HomePageProps {
  paths: Awaited<ReturnType<typeof getPaths>>;
}

export default async function HomePage() {
  const paths = await getPaths();
  return <HomePageClient paths={paths} />;
}
