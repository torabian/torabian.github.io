import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBrand } from "../brand/Brand";
import { useListBrands } from "../../sdk/useListBrands";

export default function SettingsScreen() {
  const { brand, setBrand } = useBrand();
  const { data } = useListBrands();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.section}>Brand</Text>

      {data?.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => setBrand(item.id)}
          >
            <View>
              <Text style={styles.itemTitle}>{item.id}</Text>
              <Text style={styles.itemSubtitle}>Football • Blue Theme</Text>
            </View>

            <Text>{brand === item.id ? "✓" : ""}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
    marginTop: 20,
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#DDD",
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "500",
  },

  itemSubtitle: {
    color: "#777",
    marginTop: 4,
  },
});
