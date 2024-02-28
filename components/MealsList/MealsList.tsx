import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MealItem from "./MealItem";

type Props = {
  items: any;
};

const MealsList = ({ items }: Props) => {
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealItem
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            affordability={item.affordability}
            complexity={item.complexity}
            duration={item.duration}
          />
        )}
      />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({});
