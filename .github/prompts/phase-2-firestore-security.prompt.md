---
description: Criar e revisar regras de segurança do Firestore
---

Leia `AGENTS.md` e `.github/copilot-instructions.md` antes de alterar arquivos.

Trabalhe somente na Fase 2: Firestore Security Rules e autorização.

Objetivos:
- analisar todas as coleções atualmente usadas pelo aplicativo;
- adicionar `firestore.rules` e `firebase.json` se ainda não existirem e se forem necessários;
- permitir leitura pública somente para dados realmente públicos;
- exigir autenticação e autorização administrativa para `create`, `update` e `delete` de conteúdo administrativo;
- proteger dados de `administradores` e `obrigacoes` contra acesso público;
- documentar claramente qualquer premissa sobre o formato dos documentos de perfil/administrador;
- não confiar em proteção de rota do cliente como mecanismo de segurança do banco;
- não executar `firebase deploy` automaticamente.

Considere que o Firebase client config não é um segredo e não deve ser usado como mecanismo de autorização.

Antes de concluir:
1. liste as coleções encontradas e o nível de acesso proposto para cada uma;
2. verifique se as regras cobrem leitura e escrita separadamente;
3. explique como testar as regras com usuário autenticado e não autenticado;
4. informe os arquivos alterados e qualquer configuração manual necessária no Firebase Console.