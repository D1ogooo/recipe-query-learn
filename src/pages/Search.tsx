import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mealApi } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Demonstração de queries dependentes e debouncing
  const { data: meals, isLoading, isFetching } = useQuery({
    queryKey: ["searchMeals", searchTerm],
    queryFn: () => mealApi.searchMeals(searchTerm),
    enabled: searchTerm.length > 2, // Só busca se tiver mais de 2 caracteres
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Pesquisar Receitas</h1>
          <p className="text-muted-foreground text-center mb-8">
            Demonstração de queries dependentes e enabled queries
          </p>
          
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Digite o nome de uma receita (ex: chicken, pasta...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {searchTerm.length > 0 && searchTerm.length <= 2 && (
            <p className="text-sm text-muted-foreground mt-2">
              Digite pelo menos 3 caracteres para buscar
            </p>
          )}
        </div>

        {isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(null).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!isFetching && meals && meals.length === 0 && searchTerm.length > 2 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Nenhuma receita encontrada para "{searchTerm}"
            </p>
          </div>
        )}

        {!isFetching && meals && meals.length > 0 && (
          <>
            <p className="text-muted-foreground mb-6">
              {meals.length} receita{meals.length !== 1 ? "s" : ""} encontrada{meals.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
