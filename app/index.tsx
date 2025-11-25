import { router } from "expo-router";
import Lottie from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  const [step, setStep] = useState(0);

  const screens = [
    {
      animation: require("../assets/images/Welcome Animation.json"),
      title: "Welcome to MovieApp",
      subtitle: "Discover and track your favorite movies",
    },
    {
      animation: require("../assets/images/Movie.json"),
      title: "Explore Movies",
      subtitle: "Find trending films and genres",
    },
    {
      animation: require("../assets/images/Loader cat.json"),
      title: "Loading Experience",
      subtitle: "Smooth animations for better UX",
    },
    {
      animation: require("../assets/images/Favorite Button.json"),
      title: "Favorites",
      subtitle: "Save your favorite movies in one place",
    },
    {
      animation: require("../assets/images/Pay Now.json"),
      title: "Booking",
      subtitle: "Book movie tickets instantly",
    },
  ];

  const gotoLogin = () => router.replace("/login/Login");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < screens.length - 1) setStep(step + 1);
      else gotoLogin();
    }, 3000);

    return () => clearTimeout(timer);
  }, [step]);

  const next = () => {
    if (step < screens.length - 1) setStep(step + 1);
    else gotoLogin();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={styles.container}>

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipBtn} onPress={gotoLogin}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Lottie Animation */}
      <Lottie
        source={screens[step].animation}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Text Section */}
      <Text style={styles.title}>{screens[step].title}</Text>
      <Text style={styles.subtitle}>{screens[step].subtitle}</Text>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        {step > 0 && (
          <TouchableOpacity style={styles.prevBtn} onPress={prev}>
            <Text style={styles.navTxt}>Previous</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.nextBtn} onPress={next}>
          <Text style={styles.navTxt}>
            {step === screens.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 80,
  },

  skipBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  skipText: { fontSize: 15, color: "#555", fontWeight: "600" },

  animation: { width: 300, height: 300 },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 20,
    color: "#111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#6a6a6a",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },

  bottomButtons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },

  prevBtn: {
    backgroundColor: "#444",
    width: 120,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  nextBtn: {
    backgroundColor: "#111",
    width: 120,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  navTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
