import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Colors";
import {
  Calendar,
  ShieldCheck,
  Users,
  LogOut,
  ChevronRight,
  ArrowLeft,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/admin/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da sessão.");
    }
  };

  const AdminMenuButton = ({
    icon: Icon,
    label,
    route,
    color,
  }: {
    icon: any;
    label: string;
    route: string;
    color: string;
  }) => (
    <TouchableOpacity
      style={[styles.menuButton, { borderTopWidth: 4, borderTopColor: color }]}
      onPress={() => router.push(route)}
    >
      <View style={styles.menuIconContainer}>
        <Icon color={Colors.primary} size={32} />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuSubtitle}>Toque para gerenciar</Text>
      </View>
      <ChevronRight color={Colors.border} size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Painel do Dirigente</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcomeText}>
          Bem-vindo(a)! Escolha uma opção para gerenciar as informações do
          terreiro.
        </Text>

        <View style={styles.gridContainer}>
          <AdminMenuButton
            icon={Calendar}
            label="Gerenciar Giras"
            route="/admin/giras"
            color={Colors.green}
          />

          <AdminMenuButton
            icon={ShieldCheck}
            label="Gerenciar Obrigações"
            route="/admin/obrigacoes"
            color={Colors.gold}
          />

          <AdminMenuButton
            icon={Users}
            label="Gerenciar Dirigentes"
            route="/admin/dirigentes"
            color={Colors.accent}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Dica de Segurança</Text>
          <Text style={styles.infoText}>
            Lembre-se de sair da área administrativa após terminar as alterações
            para manter os dados seguros.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <ArrowLeft color={Colors.primary} size={20} />
          <Text style={styles.backHomeText}>Voltar para o Início do App</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 22,
  },
  gridContainer: {
    width: "100%",
  },
  menuButton: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIconContainer: {
    backgroundColor: "#fef5e7",
    padding: 12,
    borderRadius: 12,
    marginRight: 20,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  infoCard: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  backHomeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 30,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    borderStyle: "dashed",
    backgroundColor: "#fff",
  },
  backHomeText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
