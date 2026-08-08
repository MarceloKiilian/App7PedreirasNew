---
description: Corrigir autenticação e proteger a área administrativa
---

Leia `AGENTS.md`, `.github/copilot-instructions.md` e as instruções aplicáveis antes de alterar código.

Trabalhe somente na Fase 1: autenticação e proteção das rotas administrativas.

Objetivos:
- remover o `signOut` automático da tela de login;
- criar controle centralizado do estado de autenticação, preferencialmente com `AuthProvider` e `useAuth`;
- proteger toda a área `/admin` após o estado inicial do Firebase Auth ser resolvido;
- redirecionar usuário não autenticado para `/admin/login`;
- impedir loops de redirecionamento durante a inicialização;
- implementar logout real usando `await signOut(auth)` antes de navegar;
- preservar a persistência existente com AsyncStorage;
- preservar as telas públicas e o design atual;
- não implementar ainda criação de administradores nem Firestore Security Rules.

Antes de concluir:
1. execute o typecheck disponível ou `npx tsc --noEmit`;
2. corrija erros TypeScript introduzidos pela alteração;
3. revise o diff para evitar mudanças fora do escopo;
4. informe arquivos alterados;
5. descreva como testar manualmente:
   - login válido;
   - login inválido;
   - acesso direto a `/admin/dashboard` sem sessão;
   - persistência após reiniciar o app;
   - logout e tentativa de retornar à área administrativa.

Não afirme que os testes no emulador passaram se não os executou.