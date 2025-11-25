import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { movies } from "../../assets/data/movies";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter(
    (movie) => movie.name.toLowerCase().includes(search.toLowerCase()) || movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderMovie = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/movie/movieid/${item.id}`)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.movieName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Movie Suggestions</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search by name or genre..." placeholderTextColor="#94a3b8" style={styles.searchInput} value={search} onChangeText={setSearch} />
        <TouchableOpacity style={styles.cbutton} onPress={() => setSearch("")}>
          <Text style={styles.cbuttonText}>X</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMovies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.noResults}>No movies found</Text>}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", paddingHorizontal: 10, paddingTop: 50 },
  header: { fontSize: 24, fontWeight: "700", color: "#fff", marginBottom: 10, textAlign: "center" },
  searchContainer: { backgroundColor: "#1e293b", borderRadius: 12, paddingHorizontal: 12, marginBottom: 20, flexDirection: "row", alignItems: "center" },
  searchInput: { flex: 1, color: "#fff", fontSize: 16, paddingVertical: 10 },
  card: { flex: 1, margin: 8, backgroundColor: "#1e293b", borderRadius: 12, overflow: "hidden", elevation: 5 },
  image: { width: (screenWidth / 2) - 24, height: 220 },
  movieName: { color: "#fff", fontSize: 16, fontWeight: "600", textAlign: "center", padding: 10 },
  noResults: { textAlign: "center", color: "#94a3b8", fontSize: 16, marginTop: 40 },
  cbutton: { backgroundColor: "#1e293b", borderRadius: 10 },
  cbuttonText: { color: "#fff", fontSize: 16 },
});
