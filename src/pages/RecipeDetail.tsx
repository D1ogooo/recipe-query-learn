import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { mealApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Query para detalhes da receita
  const { data: meal, isLoading, error } = useQuery({
    queryKey: ["meal", id],
    queryFn: () => mealApi.getMealById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Receita não encontrada</h1>
          <Button onClick={() => navigate("/")}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  // Extrair ingredientes
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{meal.strMeal}</h1>
            
            <div className="flex gap-2 mb-6">
              <Badge variant="default" className="text-sm">
                {meal.strCategory}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {meal.strArea}
              </Badge>
              {meal.strTags?.split(",").map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {meal.strYoutube && (
              <Button asChild variant="outline" className="mb-6">
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver no YouTube
                </a>
              </Button>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Modo de Preparo</h2>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
