# Publicacao automatica na Google Play

Todo push na branch `main` executa o typecheck e, se a validacao passar, inicia
um build Android de producao no EAS. Ao concluir, o EAS envia o AAB para a faixa
de teste interno da Google Play.

## Configuracao obrigatoria no GitHub

1. Gere um token em **Expo/EAS > Account settings > Access tokens**.
2. No repositorio GitHub, abra **Settings > Secrets and variables > Actions**.
3. Crie um **Repository secret** chamado exatamente `EXPO_TOKEN`.
4. Cole o token como valor. Nunca adicione o token aos arquivos do repositorio.

A conta do token precisa ter acesso ao projeto EAS cujo ID esta configurado em
`app.json`.

## Credencial da Google Play

A chave da conta de servico da Google Play deve permanecer cadastrada no EAS em
**Credentials > Android > Service Credentials**. Nenhum arquivo JSON de conta
de servico deve ser adicionado ao GitHub.

## Funcionamento

- Feature/fix, `develop` e `release`: seguem o CI e o fluxo de PR existente.
- `main`: validacao, build Android e envio para teste interno.
- Publicacoes simultaneas ficam em fila para preservar a sequencia do
  `versionCode`, que e incrementado remotamente pelo EAS.

O job do GitHub termina depois de disparar o build. O resultado final do build e
do envio pode ser acompanhado no painel do EAS e na Google Play Console.

## Mudanca futura para producao

Depois da homologacao, altere em `eas.json`:

```json
"track": "production"
```

Mantenha `releaseStatus: "completed"` somente quando a intencao for liberar a
versao automaticamente ao publico. Essa mudanca deve passar por revisao antes
de entrar na `main`.
