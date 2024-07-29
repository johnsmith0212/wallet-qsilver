import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './src/pages/Dashboard';

export default function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    channelInit();
  }, []);
  return (
      <Dashboard/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
});
