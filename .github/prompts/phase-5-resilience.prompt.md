---
description: Melhorar tratamento de erros e estados do Firestore
---

Leia `AGENTS.md` e `.github/copilot-instructions.md` antes de alterar código.

Trabalhe somente na Fase 5: resiliência das consultas e operações Firestore.

Objetivos:
- revisar todas as consultas `onSnapshot`, `getDocs` e operações de escrita usadas pelo aplicativo;
- adicionar tratamento explícito de erros em listeners realtime;
- garantir cleanup/unsubscribe correto;
- impedir telas presas eternamente em loading quando ocorrer erro;
- implementar estados consistentes de loading, sucesso, vazio e erro;
- exibir mensagens amigáveis ao usuário sem vazar detalhes sensíveis;
- manter logs técnicos úteis para desenvolvimento;
- preservar o design atual sempre que possível;
- não transformar esta fase em uma refatoração arquitetural ampla.

Antes de concluir:
1. execute typecheck;
2. liste arquivos alterados;
3. liste os fluxos Firestore revisados;
4. descreva como simular erro de rede/permissão e verificar o comportamento da UI.