// File: app/vehicle/[id]/add-service.tsx

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { axiosInstance } from '../../../lib/axios';
import { useServiceStore } from '../../../store/useServiceStore';

export default function AddServiceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addService } = useServiceStore();

  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nextServiceDate, setNextServiceDate] = useState<Date | null>(null);
  const [showNextDatePicker, setShowNextDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [km, setKm] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/vehicle/${id}`);
        setVehicle(res.data);
      } catch (e) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to load vehicle' });
        router.back();
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async () => {
    if (!serviceType) { Toast.show({ type: 'error', text1: 'Validation', text2: 'Select service type' }); return; }
    setSubmitting(true);

    try {
      await addService({
        vehicleId: id!,
        service: serviceType,
        date: date.toISOString(),
        nextServiceDueDate: nextServiceDate?.toISOString() || undefined,
        desc,
        amount,
        km,
      }, true);

      Toast.show({ type: 'success', text1: 'Added service record!' });
      router.push(`/vehicle/${id}/view-records`);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to add record' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00f" />
        <Text style={styles.loadingText}>Loading vehicle...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{vehicle?.name}</Text>

      <Text style={styles.label}>Service Type</Text>
      <View style={styles.picker}>
        <Picker selectedValue={serviceType} onValueChange={setServiceType}>
          <Picker.Item label="Select type..." value="" />
          <Picker.Item label="General Service" value="general service" />
          <Picker.Item label="Insurance" value="insurance" />
          <Picker.Item label="Emission" value="emission" />
        </Picker>
      </View>

      <Text style={styles.label}>Service Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={(e, d) => { setShowDatePicker(false); d && setDate(d); }} />
      )}

      <Text style={styles.label}>Amount (₹)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="5000" />

      <Text style={styles.label}>Kilometers (KM)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={km} onChangeText={setKm} placeholder="45000" />

      <Text style={styles.label}>Next Service Date (optional)</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowNextDatePicker(true)}>
        <Text>{nextServiceDate ? nextServiceDate.toDateString() : 'Select date'}</Text>
      </TouchableOpacity>
      {showNextDatePicker && (
        <DateTimePicker
          value={nextServiceDate || new Date()}
          mode="date"
          onChange={(e, d) => { setShowNextDatePicker(false); d && setNextServiceDate(d); }}
        />
      )}

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput style={[styles.input, styles.textArea]} value={desc} onChangeText={setDesc} placeholder="Notes..." multiline />

      <TouchableOpacity
        style={[styles.button, submitting && styles.buttonDisabled]}
        disabled={submitting}
        onPress={handleSubmit}
      >
        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Add Service</Text>}
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111' },
  header: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  label: { color: '#ccc', marginTop: 12 },
  input: { backgroundColor: '#222', color: '#fff', padding: 12, borderRadius: 8, marginTop: 4 },
  textArea: { height: 100 },
  picker: { backgroundColor: '#222', borderRadius: 8, marginTop: 4 },
  button: { backgroundColor: '#f97316', padding: 16, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#555' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  loadingText: { color: '#fff', marginTop: 8 },
});
