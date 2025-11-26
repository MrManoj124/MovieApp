import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { movies } from "../../assets/data/movies";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode

  // --- Dynamic Theme Colors ---
  const theme = {
    bg: isDark ? "#0f172a" : "#ffffff",
    card: isDark ? "#1e293b" : "#f1f5f9",
    text: isDark ? "#fff" : "#1e293b",
    subText: isDark ? "#94a3b8" : "#64748b",
    inputBg: isDark ? "#1e293b" : "#e2e8f0",
    icon: isDark ? "#fff" : "#1e293b",
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase()) ||
      movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderMovie = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => router.push(`/movie/movieid/${item.id}`)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.movieName, { color: theme.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Update Status Bar based on theme */}
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header with Toggle Button */}
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: theme.text }]}>
          🎬 Movie Suggestions
        </Text>
        <TouchableOpacity
          onPress={() => setIsDark(!isDark)}
          style={styles.themeBtn}
        >
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={theme.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}>
        <TextInput
          placeholder="Search by name or genre..."
          placeholderTextColor={theme.subText}
          style={[styles.searchInput, { color: theme.text }]}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={[styles.cbutton, { backgroundColor: theme.card }]}
          onPress={() => setSearch("")}
        >
          <Text style={[styles.cbuttonText, { color: theme.text }]}>X</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMovies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.noResults, { color: theme.subText }]}>
            No movies found
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
  },
  themeBtn: {
    padding: 5,
  },
  searchContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: (screenWidth / 2) - 24,
    height: 220,
    resizeMode: "cover",
  },
  movieName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
  },
  cbutton: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
  cbuttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});