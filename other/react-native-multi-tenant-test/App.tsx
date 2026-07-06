import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BrandProvider } from "./modules/core/brand/Brand";
import { ThemeProvider } from "./modules/core/themes/theme";
import RootNavigator from "./RootNavigator";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./modules/core/query-client";

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <BrandProvider>
          <ThemeProvider>
            <View style={styles.container}>
              <StatusBar style="auto" />
              <RootNavigator />
            </View>
          </ThemeProvider>
        </BrandProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
