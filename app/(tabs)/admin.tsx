import { Redirect } from 'expo-router';

export default function AdminIndex() {
  // Por padrão, redireciona para a tela de login ao clicar no Tab Admin
  return <Redirect href="/admin/login" />;
}
