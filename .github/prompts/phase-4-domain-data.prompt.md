---
description: Padronizar giras, obrigações, datas e timestamps
---

Leia `AGENTS.md` e `.github/copilot-instructions.md` antes de alterar código.

Trabalhe somente na Fase 4: modelos de domínio e datas de Giras/Obrigações.

Objetivos:
- criar tipos/interfaces explícitos para Gira e Obrigacao;
- reduzir `any` nesses fluxos;
- adicionar horário configurável às giras e remover o `18:00` hardcoded da Home;
- definir uma representação canônica para datas;
- preferir Firestore `Timestamp` quando cronologia/ordenação forem importantes;
- usar `serverTimestamp()` para `createdAt`/`updatedAt`;
- eliminar dependência de `new Date().toISOString().split('T')[0]` para determinar o dia local;
- preservar compatibilidade com documentos existentes sempre que viável;
- se migração for necessária, documentar exatamente como executar e como lidar com dados antigos;
- não alterar o layout além do necessário para incluir horário/campos corretos.

Antes de concluir:
1. execute typecheck;
2. informe arquivos alterados;
3. descreva o modelo final de cada documento Firestore;
4. explique compatibilidade/migração de dados antigos;
5. descreva testes manuais para Home, Calendário, Giras e Obrigações.