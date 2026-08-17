import { Calendar } from "lucide-react-native";
import type { ChangeEvent } from "react";
import { StyleSheet, View } from "react-native";

interface GiraDateFieldProps {
  value: Date | null;
  displayValue: string;
  onChange: (value: Date) => void;
}

const toInputValue = (value: Date | null): string => {
  if (!value) return "";

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function GiraDateField({ value, onChange }: GiraDateFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = event.currentTarget.value.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);

    if (!Number.isNaN(selectedDate.getTime())) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <Calendar color="#999" size={20} style={styles.inputIcon} />
      <input
        aria-label="Selecionar data da gira"
        type="date"
        value={toInputValue(value)}
        onChange={handleChange}
        style={webInputStyle}
      />
    </View>
  );
}

const webInputStyle = {
  backgroundColor: "transparent",
  border: 0,
  color: "#333",
  flex: 1,
  fontFamily: "inherit",
  fontSize: 16,
  minWidth: 0,
  outline: "none",
  padding: "12px 0",
};

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
  },
});
