import { useRouter } from "expo-router";
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
import StarRating from "../movie/movieid/StarRating"; // Adjust the path



const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [darkTheme, setDarkTheme] = useState(true);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase()) ||
      movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderMovie = ({ item }) => (
  <TouchableOpacity
    style={[
      styles.card,
      { backgroundColor: darkTheme ? "#1e293b" : "#e2e8f0" },
    ]}
    onPress={() => router.push(`/movie/movieid/${item.id}`)}
  >
    <Image source={item.image} style={styles.image} />

    <Text
      style={[
        styles.movieName,
        { color: darkTheme ? "#fff" : "#111" },
      ]}
    >
      {item.name}
    </Text>

    {/* ⭐ Rating Component */}
    <StarRating movieId={item.id} />
  </TouchableOpacity>
);

return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkTheme ? "#0f172a" : "#ffffff" },
      ]}
    >
      {/* Theme Switch Button */}
      <TouchableOpacity
        style={styles.themeSwitch}
        onPress={() => setDarkTheme(!darkTheme)}
      >
        <Text style={{ color: darkTheme ? "#fff" : "#111", fontSize: 18 }}>
          {darkTheme ? "🌞Light" : "🌙Dark"}
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.header,
          { color: darkTheme ? "#fff" : "#111" },
        ]}
      >
        🎬 Movie Suggestions
      </Text>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: darkTheme ? "#1e293b" : "#e2e8f0" },
        ]}
      >
        <TextInput
          placeholder="Search by name or genre..."
          placeholderTextColor={darkTheme ? "#94a3b8" : "#555"}
          style={[
            styles.searchInput,
            { color: darkTheme ? "#fff" : "#111" },
          ]}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.cbutton}
          onPress={() => setSearch("")}
        >
          <Text style={[styles.cbuttonText, { color: darkTheme ? "#fff" : "#111" }]}>
            X
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMovies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={[
              styles.noResults,
              { color: darkTheme ? "#94a3b8" : "#555" },
            ]}
          >
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
  themeSwitch: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    zIndex: 100,
  },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  searchContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 10 },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
  },
  image: { width: (screenWidth / 2) - 24, height: 220 },
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
  cbutton: { paddingHorizontal: 10, paddingVertical: 6 },
  cbuttonText: { fontSize: 16 },
});
