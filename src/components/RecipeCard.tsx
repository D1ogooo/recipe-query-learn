import { Meal } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  meal: Meal;
}

export const RecipeCard = ({ meal }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1 mb-2">{meal.strMeal}</h3>
        <div className="flex gap-2 flex-wrap">
          {meal.strCategory && (
            <Badge variant="secondary" className="text-xs">
              {meal.strCategory}
            </Badge>
          )}
          {meal.strArea && (
            <Badge variant="outline" className="text-xs">
              {meal.strArea}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
