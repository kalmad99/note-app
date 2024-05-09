import { addNote, updateNote } from "@/features/note/noteSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { RootState } from "@/store/store";
import { nanoid } from "@reduxjs/toolkit";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const NoteForm = (props: Props) => {
  const router = useRouter();
  const { noteId } = useLocalSearchParams();

  const existing_note = useAppSelector((state) =>
    state.note.find((note) => note.id === noteId)
  );

  const note = useMemo(() => {
    return noteId ? existing_note : { id: "", title: "", description: "" };
  }, [noteId]);

  const [title, setTitle] = useState(note ? note.title : "");
  const [description, setDescription] = useState(note ? note.description : "");
  const [id, setId] = useState(note?.id);

  const dispatch = useAppDispatch();

  const handleDone = useCallback(() => {
    if (title !== "" || description !== "") {
      if (!id) {
        dispatch(addNote(title, description));
      } else {
        dispatch(updateNote({ id, title, description }));
      }
    }
    router.back();
  }, [title, description, id, dispatch, router]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === 'ios' ? 0 : 20,
      }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          placeholder="Untitled"
          placeholderTextColor="#5c5c5c"
          onChangeText={setTitle}
          value={title}
          multiline={true}
        />
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.description}
            value={description}
            placeholder="Tap here to continue..."
            placeholderTextColor="#3d3c3c"
            onChangeText={setDescription}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={handleDone} style={styles.fab}>
          <Icon name="done" size={40} color="#3f51b5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 25,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    width: "100%",
    fontSize: 32,
    textAlign: "left",
  },
  descriptionContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  description: {
    flex: 1,
    width: "100%",
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "left",
  },
  fab: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#3f51b5",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoteForm;
