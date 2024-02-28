import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import {
  NavigationProp,
  Route,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamsList } from "../App";
import MealItem from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";

type Props = {
  route: RouteProp<RootStackParamsList, "MealsOverview">;
  navigation: NavigationProp<any>;
};

const MealsOverviewScreen = ({ route, navigation }: Props) => {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => catId === category.id
    )?.title;
    if (categoryTitle) {
      navigation.setOptions({
        title: categoryTitle,
      });
    }
  }, [catId, navigation]);

  return (
    <View>
      <MealsList items={displayedMeals} />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({});
