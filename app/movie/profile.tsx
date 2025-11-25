import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseconfig";

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState<string>("User");
  const [email, setEmail] = useState<string>("user@example.com");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setEmail(currentUser.email || "user@example.com");
        // Fetch name from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || "User");
        }
      } else {
        router.replace("/login/Login"); // If not logged in, redirect to login
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.replace("/login/Login");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle" size={120} color="#38bdf8" style={{ marginBottom: 20 }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", alignItems: "center", justifyContent: "center", padding: 30 },
  name: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 5 },
  email: { color: "#94a3b8", fontSize: 16, marginBottom: 40 },
  button: { backgroundColor: "#ef4444", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 16 },
});
