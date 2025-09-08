import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";
import { useState } from "react";

function converteTemperatura(valor, tipoConversao) {
  if (valor === "" || isNaN(valor)) return "";
  const temp = parseFloat(valor);
  if (tipoConversao === "cToF") {
    return ((temp * 9) / 5 + 32).toFixed(2);
  } else if (tipoConversao === "fToC") {
    return (((temp - 32) * 5) / 9).toFixed(2);
  }
  return "";
}

function converteDistancia(valor, tipoConversao) {
  if (valor === "" || isNaN(valor)) return "";
  const dist = parseFloat(valor);
  if (tipoConversao === "kToM") {
    return (dist * 0.621371).toFixed(2);
  } else if (tipoConversao === "mToK") {
    return (dist / 0.621371).toFixed(2);
  }
  return "";
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "temperatura", title: "Temperatura" },
    { key: "distancia", title: "Distância" },
  ]);

  // Temperatura
  const [valorTemp, setValorTemp] = useState("");
  const [tipoConversaoTemp, setTipoConversaoTemp] = useState("cToF");
  const [resultadoTemp, setResultadoTemp] = useState("");

  // Distância
  const [valorDist, setValorDist] = useState("");
  const [tipoConversaoDist, setTipoConversaoDist] = useState("kToM");
  const [resultadoDist, setResultadoDist] = useState("");

  const handleConverterTemp = () => {
    const res = converteTemperatura(valorTemp, tipoConversaoTemp);
    setResultadoTemp(res);
  };

  const handleConverterDist = () => {
    const res = converteDistancia(valorDist, tipoConversaoDist);
    setResultadoDist(res);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "temperatura":
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.box}>
              <Text style={styles.title}>Conversão de temperatura</Text>
            </View>
            <View style={styles.box}>
              <Text>Digite a temperatura:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={valorTemp}
                onChangeText={setValorTemp}
                placeholder="Ex: 25"
                placeholderTextColor="#90caf9"
              />
            </View>
            <View style={styles.box}>
              <Text>Selecione a fórmula:</Text>
              <RadioButton.Group
                onValueChange={setTipoConversaoTemp}
                value={tipoConversaoTemp}
              >
                <RadioButton.Item
                  label="Celsius para Fahrenheit"
                  value="cToF"
                />
                <RadioButton.Item
                  label="Fahrenheit para Celsius"
                  value="fToC"
                />
              </RadioButton.Group>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleConverterTemp}
              >
                <Text style={styles.buttonText}>Converter</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <Text>
                Resultado da conversão:{" "}
                <Text style={styles.result}>{resultadoTemp}</Text>
              </Text>
            </View>
            <StatusBar style="auto" />
          </SafeAreaView>
        );
      case "distancia":
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.box}>
              <Text style={styles.title}>Conversão de distância</Text>
            </View>
            <View style={styles.box}>
              <Text>Digite a distância:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={valorDist}
                onChangeText={setValorDist}
                placeholder="Ex: 10"
                placeholderTextColor="#90caf9"
              />
            </View>
            <View style={styles.box}>
              <Text>Selecione a fórmula:</Text>
              <RadioButton.Group
                onValueChange={setTipoConversaoDist}
                value={tipoConversaoDist}
              >
                <RadioButton.Item
                  label="Quilômetros (KM) para milhas (Mi)"
                  value="kToM"
                />
                <RadioButton.Item
                  label="Milhas (Mi) para quilômetros (KM)"
                  value="mToK"
                />
              </RadioButton.Group>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleConverterDist}
              >
                <Text style={styles.buttonText}>Converter</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <Text>
                Resultado da conversão:{" "}
                <Text style={styles.result}>{resultadoDist}</Text>
              </Text>
            </View>
            <StatusBar style="auto" />
          </SafeAreaView>
        );
      default:
        return null;
    }
  };
  const layout = Dimensions.get("window");

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={layout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#1976d2" }}
          style={{ backgroundColor: "#e3f2fd" }}
          labelStyle={{ color: "#1976d2", fontWeight: "bold" }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f9ff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 32,
  },
  box: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    height: 48,
    width: "100%",
    borderColor: "#90caf9",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#e3f2fd",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 4,
    color: "#1976d2",
  },
  button: {
    backgroundColor: "#1976d2",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  result: {
    fontWeight: "bold",
    color: "#388e3c",
    fontSize: 18,
  },
});
