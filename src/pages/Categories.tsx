import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mealApi } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");

  // Query para listar categorias
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: mealApi.getCategories,
    staleTime: Infinity, // Categorias não mudam, cache permanente
  });

  // Query para receitas por categoria (demonstra queries dependentes)
  const { data: meals, isLoading: mealsLoading } = useQuery({
    queryKey: ["mealsByCategory", selectedCategory],
    queryFn: () => mealApi.getMealsByCategory(selectedCategory),
    enabled: !!selectedCategory,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Categorias</h1>
          <p className="text-muted-foreground">
            Demonstração de múltiplas queries e cache infinito
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Escolha uma categoria:</h2>
          {categoriesLoading ? (
            <div className="flex gap-2 flex-wrap">
              {Array(8).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {categories?.map((category) => (
                <Button
                  key={category.idCategory}
                  variant={selectedCategory === category.strCategory ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.strCategory)}
                >
                  {category.strCategory}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Meals Grid */}
        {mealsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(12).fill(null).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {meals?.length} receita{meals?.length !== 1 ? "s" : ""} em {selectedCategory}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meals?.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
