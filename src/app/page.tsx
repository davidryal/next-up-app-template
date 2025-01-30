import { getPaths } from '@/lib/paths';
import { HomePageClient } from '@/components/HomePageClient';
import React from 'react';

interface HomePageProps {
  paths: Awaited<ReturnType<typeof getPaths>>;
}

const HomePage: React.FC<HomePageProps> = async () => {
  const paths = await getPaths();
  return <HomePageClient paths={paths} />;
};

export default HomePage;
