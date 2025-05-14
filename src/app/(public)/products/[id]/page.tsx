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

  console.log(1)
  console.log({data})

  if (!data) {
    notFound();
  }
  
  console.log(2)
  console.log({data});

  return <PageContent product={data} />;
}
