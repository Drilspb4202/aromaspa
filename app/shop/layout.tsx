import { Metadata } from 'next';
import { metadata as shopMetadata } from './metadata';

export const metadata: Metadata = shopMetadata;

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}

