import React, { useContext, useLayoutEffect } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamsList } from "../App";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

type Props = {
  route: RouteProp<RootStackParamsList, "MealDetail">;
};

const MealDetailScreen = ({ route }: Props) => {
  const favoriteCtx = useContext(FavoritesContext);
  const mealId = route.params?.mealId;
  const navigation = useNavigation();

  const selectedMeal = MEALS.find((meal) => mealId === meal.id);

  const isFavorite = favoriteCtx.ids.includes(mealId);

  const changeFavoriteHandler = () => {
    if (isFavorite) {
      favoriteCtx.removeFavorite(mealId);
    } else {
      favoriteCtx.addFavorite(mealId);
    }
  };

  useLayoutEffect(() => {
    if (mealId && selectedMeal) {
      navigation.setOptions({
        title: selectedMeal?.title,
        headerRight: () => {
          return (
            <IconButton
              icon={isFavorite ? "star" : "star-outline"}
              color="white"
              onPress={changeFavoriteHandler}
            />
          );
        },
      });
    }
  }, [mealId, navigation, selectedMeal, changeFavoriteHandler]);

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: selectedMeal?.imageUrl }} />
      <Text style={styles.title}>{selectedMeal?.title}</Text>
      <MealDetails
        duration={selectedMeal?.duration as number}
        affordability={selectedMeal?.affordability as string}
        complexity={selectedMeal?.complexity as string}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          {selectedMeal?.ingredients.map((ingredient) => (
            <View style={styles.mealItem} key={ingredient}>
              <Text style={styles.itemText}>{ingredient}</Text>
            </View>
          ))}
          <Subtitle>Steps</Subtitle>
          {selectedMeal?.steps.map((step) => (
            <View style={styles.mealItem} key={step}>
              <Text style={styles.itemText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  mealItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
