import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";

type Props = {};

const FavoriteScreen = (props: Props) => {
  const favoritesCtx = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter((meal) =>
    favoritesCtx.ids.includes(meal.id)
  );

  if (!favoriteMeals.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>You Have no Favorite Meals!</Text>
      </View>
    );
  }

  return (
    <View>
      <MealsList items={favoriteMeals} />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
