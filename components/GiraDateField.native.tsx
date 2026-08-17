import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "../constants/Colors";

interface GiraDateFieldProps {
  value: Date | null;
  displayValue: string;
  onChange: (value: Date) => void;
}

export default function GiraDateField({
  value,
  displayValue,
  onChange,
}: GiraDateFieldProps) {
  const [visible, setVisible] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setVisible(false);
    }

    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Selecionar data da gira"
      >
        <Calendar color="#999" size={20} style={styles.inputIcon} />
        <Text style={[styles.input, !value && styles.placeholderText]}>
          {value ? displayValue : "Selecione a data"}
        </Text>
      </TouchableOpacity>

      {visible && (
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={value ?? new Date()}
            mode="date"
            display="default"
            locale="pt-BR"
            onChange={handleChange}
          />
          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.doneText}>Concluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
    minHeight: 50,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
    paddingVertical: 12,
  },
  placeholderText: {
    color: "#999",
  },
  datePickerContainer: {
    marginTop: -12,
    marginBottom: 20,
  },
  doneButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  doneText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
