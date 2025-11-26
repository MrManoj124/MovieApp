import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth"; // Import this!
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { movies } from "../../../assets/data/movies";
import { auth, db } from "../../../firebaseconfig";

const { height } = Dimensions.get("window");

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [rating, setRating] = useState(0);

  const movie = movies.find((m) => m.id.toString() === id);

  // --- FIX: Wait for Auth to be ready before fetching ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && id) {
        try {
          const docRef = doc(db, "users", user.uid, "ratings", id.toString());
          const snapshot = await getDoc(docRef);

          if (snapshot.exists()) {
            setRating(snapshot.data().value);
          }
        } catch (error) {
          console.log("Error fetching rating:", error);
        }
      }
    });

    return () => unsubscribe(); // Cleanup listener when leaving screen
  }, [id]);
  // ----------------------------------------------------

  const handleRate = async (newRating: number) => {
    setRating(newRating);
    const user = auth.currentUser;

    if (user && id) {
      try {
        await setDoc(doc(db, "users", user.uid, "ratings", id.toString()), {
          value: newRating,
        });
      } catch (error) {
        console.log("Error saving rating:", error);
      }
    } else {
      alert("Please wait a moment or login again.");
    }
  };

  if (!movie) {
    return (
      <View style={styles.notFound}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Movie not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{ color: "#fff", fontSize: 18 }}>← Back</Text>
      </TouchableOpacity>

      <Image source={movie.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.name}</Text>

        {/* Rating UI */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rate this movie:</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRate(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color="#FFD700"
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingValue}>
            {rating > 0 ? `You rated: ${rating}/5` : "Tap a star"}
          </Text>
        </View>

        <Text style={styles.description}>{movie.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Cast:</Text>
          <Text style={styles.value}>{movie.cast}</Text>

          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{movie.genre}</Text>

          <Text style={styles.label}>Release Date:</Text>
          <Text style={styles.value}>{movie.releaseDate}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
  image: { width: "100%", height: height * 0.5, resizeMode: "cover" },
  content: { padding: 20 },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  ratingLabel: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 5,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  ratingValue: {
    color: "#fbbf24",
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  infoBox: { backgroundColor: "#1e293b", borderRadius: 12, padding: 15 },
  label: { color: "#94a3b8", fontSize: 14, marginTop: 10 },
  value: { color: "#fff", fontSize: 16, fontWeight: "500" },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
});