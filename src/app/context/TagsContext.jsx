"use client";
import { createContext, useContext, useState } from "react";

const TagsContext = createContext();

export function useTagsContext() {
  return useContext(TagsContext);
}

export const TagsProvider = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const selectTag = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <TagsContext.Provider value={{ selectedTag, selectTag }}>
      {children}
    </TagsContext.Provider>
  );
};
