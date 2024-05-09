import { NoteData } from "@/features/note/noteSlice";
import React, { useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import NoteListItem from "./NoteListItem";
import { useRouter } from "expo-router";

type Props = {
  notes: NoteData[];
};

const NoteList = ({ notes }: Props) => {
  const router = useRouter();

  const handlePress = useCallback(
    (itemId: string) => {
      router.push({
        pathname: "note-form",
        params: { noteId: itemId },
      });
    },
    [router]
  );

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <FlatList
        style={styles.flatList}
        data={notes}
        renderItem={({ item }) => {
          return (
            <NoteListItem
              id={item.id}
              title={item.title}
              description={item.description}
              updatedAt={item.updatedAt}
              onPress={() => handlePress(item.id)}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: "100%",
    padding: 20,
    marginVertical: 30,
  },
});

export default NoteList;
