import { useQuery } from "@tanstack/react-query";
import { mealApi } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  // Demonstração de useQuery básico com refetch
  const { data: randomMeals, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["randomMeals"],
    queryFn: async () => {
      // Buscar 8 receitas aleatórias
      const promises = Array(8).fill(null).map(() => mealApi.getRandomMeal());
      return Promise.all(promises);
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background py-20">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Descubra Receitas
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Incríveis
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aprenda React Query explorando milhares de receitas deliciosas.
              Cache automático, refetch, loading states e muito mais!
            </p>
          </div>
        </div>
      </section>

      {/* Random Meals Section */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Receitas Aleatórias</h2>
            <p className="text-muted-foreground">
              Usando React Query: cache, refetch e loading states
            </p>
          </div>
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            size="lg"
            className="gap-2"
          >
            {isFetching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Novas Receitas
              </>
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(null).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {randomMeals?.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
