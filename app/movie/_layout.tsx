import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Layout() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/movie")}>
          <View style={styles.footerItem}>
            <Ionicons name="home" size={22} color="#fff" />
            <Text style={styles.footerText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/movie/favorites")}>
          <View style={styles.footerItem}>
            <Ionicons name="heart" size={22} color="#fff" />
            <Text style={styles.footerText}>Favorites</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/movie/profile")}>
          <View style={styles.footerItem}>
            <Ionicons name="person" size={22} color="#fff" />
            <Text style={styles.footerText}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.createdText}>Created By: Mr.Manoj</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#1e293b", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#334155" },
  footerItem: { alignItems: "center" },
  footerText: { color: "#fff", fontSize: 12, marginTop: 3, marginBottom: 20 },
  createdText: { textAlign: "center", color: "#fff", fontSize: 12, marginTop: 53 },
});
