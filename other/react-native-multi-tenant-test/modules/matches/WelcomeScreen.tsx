import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../RootNavigator";
import { useBrand } from "../core/brand/Brand";
import { useListBrands } from "../sdk/useListBrands";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export const WelcomeScreen = ({ navigation }: Props) => {
  const { setBrand } = useBrand();
  const { data } = useListBrands();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.title}>Choose your edition</Text>
        <Text style={styles.subtitle}>
          Select the football experience you want.
        </Text>
        {data?.map((item) => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setBrand(item.id);
                navigation.navigate("Matches");
              }}
              key={item.id}
            >
              <Text style={styles.flag}>{item.flag}</Text>
              <Text style={styles.buttonText}>{item.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  content: {
    padding: 24,
    gap: 18,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },
  subtitle: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 28,
    marginRight: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
