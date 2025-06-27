import { Slot } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function VehicleLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <View>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        </Text>
      </View>
      <Slot />
      <Toast />
    </SafeAreaView>
  );
}
