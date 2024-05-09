import { Link } from "expo-router";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import NoteList from "@/components/notes/NoteList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/hooks/useStore";

const Home = () => {
  const notes = useAppSelector((state) => state.note);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <Text style={styles.header}>All notes</Text>
        <Text style={styles.subHeader}>{notes.length} notes</Text>
        <View style={styles.noteListContainer}>
          <NoteList notes={notes} />
        </View>
        <Link href="/note-form" asChild>
          <TouchableOpacity style={styles.fab}>
            <Icon name="add" size={40} color="#3f51b5" />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    fontSize: 32,
    textAlign: "center",
  },
  subHeader: {
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },
  noteListContainer: {
    width: "100%",
    flex: 1,
    marginBottom: 30,
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

export default Home;
