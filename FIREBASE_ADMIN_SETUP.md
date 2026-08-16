# ConfiguraÃ§Ã£o temporÃ¡ria do gerenciamento de usuÃ¡rios

Este fluxo foi preparado para o perÃ­odo de testes e funciona no plano gratuito
Spark. O aplicativo cria a conta com uma instÃ¢ncia secundÃ¡ria do Firebase
Authentication, preservando a sessÃ£o do administrador atual.

## Estrutura

A senha existe somente no Firebase Authentication. Ela nunca Ã© gravada no
Firestore. O documento `administradores/{uid}` contÃ©m apenas:

```text
email: "email@exemplo.com"
perfil: "administrador" ou "dirigente"
ativo: true ou false
createdAt: Timestamp
createdBy: UID
updatedAt: Timestamp
updatedBy: UID
```

## ConfiguraÃ§Ã£o no Firebase Console

1. Em **Authentication > Sign-in method**, mantenha **E-mail/senha** ativado.
2. A primeira conta administrativa deve existir no Authentication.
3. O documento inicial deve ser `administradores/{uid}`, usando exatamente o
   UID da conta, com `perfil: "dirigente"` e `ativo: true`.
4. Publique somente as regras do Firestore:

   ```bash
   firebase use base7pedreiras
   firebase deploy --only firestore:rules
   ```

Cloud Functions e plano Blaze nÃ£o sÃ£o necessÃ¡rios para este fluxo temporÃ¡rio.

## PermissÃµes dos perfis

- `dirigente`: gerencia giras, obrigaÃ§Ãµes e usuÃ¡rios.
- `administrador`: gerencia somente giras.

## LimitaÃ§Ãµes do modo de testes

- Desativar remove o acesso ao app, mas nÃ£o marca a conta como desabilitada no
  Firebase Authentication.
- Remover apaga o documento de autorizaÃ§Ã£o, mas a conta permanece no
  Authentication. Se necessÃ¡rio, exclua-a manualmente no console.
- A criaÃ§Ã£o de contas por e-mail/senha fica disponÃ­vel no projeto. Uma conta sem
  documento administrativo ativo nÃ£o consegue entrar na Ã¡rea administrativa e
  nÃ£o recebe permissÃ£o pelas regras do Firestore.
- Para produÃ§Ã£o, use o backend com Admin SDK e reforce App Check.
