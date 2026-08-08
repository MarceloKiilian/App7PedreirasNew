import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/Colors";
import { db } from "../constants/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function CalendarioScreen() {
  const [eventosFuturos, setEventosFuturos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0];
    const q = query(
      collection(db, "giras"),
      where("data", ">=", hoje),
      orderBy("data", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs: any[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setEventosFuturos(docs);
        setLoading(false);
      },
      (error) => {
        console.warn("Erro ao carregar calendário:", error);
        setEventosFuturos([]);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const formatarData = (dataStr: string) => {
    if (!dataStr) return "";
    const parts = dataStr.split("-");
    if (parts.length !== 3) return dataStr;
    const [ano, mes, dia] = parts;
    return `${dia}/${mes}/${ano}`;
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Carregando calendário...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={eventosFuturos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text style={styles.headerTitle}>Agenda de Giras</Text>
        )}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { borderTopWidth: 4, borderTopColor: Colors.green },
            ]}
          >
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{formatarData(item.data)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            Nenhuma gira programada no momento.
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 25,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
  },
  dateBadge: {
    backgroundColor: "#fef5e7",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 15,
    minWidth: 90,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fce4c4",
  },
  dateText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  descricao: {
    fontSize: 17,
    color: Colors.textDark,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
    fontStyle: "italic",
  },
});
