import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
} from "@/components/pages/events/config/events.config";
import { CategoryPageContent } from "@/components/pages/events/CategoryPageContent";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Kashi Yatra 2027",
    };
  }

  return {
    title: `${category.name} | Kashi Yatra 2027`,
    description: `${category.description} Explore all ${category.name} events at Kashi Yatra 2027.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryPageContent category={category} />;
}
