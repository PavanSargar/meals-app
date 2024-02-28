import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import { NavigationProp, StackNavigationState } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any>;
};

const CategoriesScreen = ({ navigation }: Props) => {
  const pressHandler = (id: string) => {
    navigation.navigate("MealsOverview", {
      categoryId: id,
    });
  };
  return (
    <FlatList
      key={"#"}
      data={CATEGORIES}
      renderItem={(itemData) => (
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          onPress={pressHandler.bind(this, itemData.item.id)}
        />
      )}
      keyExtractor={(item) => "#" + item.id}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
