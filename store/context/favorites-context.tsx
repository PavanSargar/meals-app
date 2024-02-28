import { PropsWithChildren, createContext, useState } from "react";

export const FavoritesContext = createContext<{
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}>({
  ids: [],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {},
});

const FavoritesContextProvider = ({ children }: PropsWithChildren) => {
  const [ids, setIds] = useState<string[]>([""]);

  const addFavorite = (id: string) => {
    setIds((prevIds) => [...prevIds, id]);
  };
  const removeFavorite = (id: string) => {
    setIds((prevIds) => prevIds.filter((item) => item !== id));
  };

  const values = {
    ids,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
