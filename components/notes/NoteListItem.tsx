import { deleteNote } from "@/features/note/noteSlice";
import { useAppDispatch } from "@/hooks/useStore";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

type Props = {
  id: string;
  title: string;
  description: string;
  updatedAt?: string;
  onPress: any;
};

const NoteListItem = ({
  id,
  title,
  description,
  updatedAt,
  onPress,
}: Props) => {
  const date = new Date();
  const updatedAtDate = new Date(updatedAt!);
  
  const titleFormattedDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  const updatedAtformattedDate = `${updatedAtDate.getMonth()}/${updatedAtDate.getDate()} ${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}`;

  const finalTitle = `Note ${titleFormattedDate}`;

  const dispatch = useAppDispatch();
  const getPreview = (text: string, length = 80) => {
    return text.length > length ? text.substring(0, length - 3) + "..." : text;
  };

  const handleDelete = () => {
    dispatch(deleteNote(id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
          <Icon
            name="delete"
            style={{
              padding: 6,
            }}
            size={30}
            color="#ef5350"
          />
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title ? title : finalTitle}</Text>
              <Text style={{ width: "100%" }}>{getPreview(description)}</Text>
            </View>
            <Text style={styles.updatedAt}>{updatedAtformattedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deleteIcon: {
    backgroundColor: "white",
    borderRadius: 100,
    position: "absolute",
    top: -6,
    right: -12,
    zIndex: 10,
  },
  card: {
    flex: 1,
    width: "100%",
    height: 150,
    backgroundColor: "#e8eaf6",
    padding: 20,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    width: "100%",
    fontSize: 20,
    color: "#383838",
  },
  updatedAt: {
    width: "100%",
    fontSize: 12,
  },
});

export default NoteListItem;
