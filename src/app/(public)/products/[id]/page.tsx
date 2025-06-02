import { notFound } from "next/navigation";
import PageContent from "./_components/page-content";
import serverFetch from "@/api/server-fetch";
import { ProductDetail as ProductDetailT } from "@/types/index";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const slug = params.id;

  const { data: { data } = {} } = await serverFetch<{ data: ProductDetailT }>(
    `/products/slug/${slug}`,
    {},
  );

  if (!data) {
    notFound();
  }

  return <PageContent product={data} />;
}
