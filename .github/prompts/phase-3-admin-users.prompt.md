---
description: Corrigir o gerenciamento de administradores e dirigentes
---

Leia `AGENTS.md`, `.github/copilot-instructions.md` e as instruções administrativas aplicáveis antes de alterar código.

Trabalhe somente na Fase 3: gerenciamento seguro de administradores/dirigentes.

Problema atual a considerar:
- a tela solicita e-mail, senha provisória e perfil;
- o código atual grava apenas metadados no Firestore;
- isso não cria um usuário no Firebase Authentication;
- excluir o documento do Firestore também não exclui o usuário do Firebase Authentication.

Objetivos para o MVP:
- não armazenar senha em Firestore;
- não usar Firebase Admin SDK no aplicativo React Native;
- não implementar criação de conta pelo cliente de forma que substitua a sessão do administrador atual;
- preferir criação/remoção das contas de Authentication pelo Firebase Console enquanto não houver backend confiável;
- adaptar a tela para representar corretamente o que ela realmente administra;
- usar UID como identificador principal de metadados de autorização quando possível;
- documentar o fluxo operacional para criar uma nova conta no Firebase Console e associar perfil/status no Firestore;
- preservar o design atual na medida do possível.

Se concluir que é necessário um backend/Cloud Function para determinada operação, descreva a proposta, mas não crie infraestrutura extra fora do escopo sem solicitação explícita.

Antes de concluir:
1. execute typecheck;
2. liste arquivos alterados;
3. explique o fluxo final de inclusão, alteração de perfil, desativação e remoção de administrador;
4. aponte qualquer etapa manual que continua sendo feita no Firebase Console.