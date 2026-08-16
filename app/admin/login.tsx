import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Lock, Mail, ChevronRight, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { auth } from "../../constants/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshAdministrador } = useAuth();

  const handleBackToHome = () => {
    router.replace("/(tabs)");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const administrador = await refreshAdministrador();
      if (!administrador || !administrador.ativo) {
        await auth.signOut();
        Alert.alert(
          "Acesso nÃ£o autorizado",
          "Esta conta nÃ£o possui um perfil administrativo ativo.",
        );
        return;
      }

      router.replace("/admin/dashboard");
    } catch (error: unknown) {
      const code =
        typeof error === "object" && error && "code" in error
          ? String(error.code)
          : "";
      let message = "Ocorreu um erro ao tentar entrar.";

      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
      ) {
        message = "E-mail ou senha incorretos.";
      } else if (code === "auth/invalid-email") {
        message = "E-mail inválido.";
      } else if (code === "auth/too-many-requests") {
        message = "Muitas tentativas malsucedidas. Tente novamente mais tarde.";
      } else if (code === "auth/user-disabled") {
        message = "Esta conta estÃ¡ desativada.";
      }

      Alert.alert("Erro de Login", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Lock color={Colors.primary} size={40} />
          </View>
          <Text style={styles.title}>Área Administrativa</Text>
          <Text style={styles.subtitle}>
            Acesse para gerenciar o calendário de giras e outras informações.
          </Text>
        </View>

        <View style={styles.form}>
          <View
            style={[
              styles.inputContainer,
              { borderLeftWidth: 4, borderLeftColor: Colors.green },
            ]}
          >
            <Mail color={Colors.primary} size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              { borderLeftWidth: 4, borderLeftColor: Colors.green },
            ]}
          >
            <Lock color={Colors.primary} size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Entrar</Text>
                <ChevronRight color={Colors.white} size={20} />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backHomeButton}
            onPress={handleBackToHome}
          >
            <ArrowLeft color={Colors.primary} size={18} />
            <Text style={styles.backHomeText}>Voltar para o início</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Acesso restrito a administradores e dirigentes do terreiro.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  content: {
    padding: 30,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconCircle: {
    backgroundColor: "#fef5e7",
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    elevation: 4,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  dividerText: {
    paddingHorizontal: 15,
    color: "#999",
    fontSize: 12,
    fontWeight: "bold",
  },
  backHomeButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
  },
  backHomeText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "600",
  },
  footerInfo: {
    marginTop: "auto",
    paddingTop: 40,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
});
