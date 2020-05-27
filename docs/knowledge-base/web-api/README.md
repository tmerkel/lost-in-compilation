# .Net Core Web Api

## Set up config

Main config in appsettings.json.

Environment configs in appsettings.<env>.json.

## Config Secrets

Locally, use **user-secrets**.

```bash
dotnet user-secrets set "Key:SubKey" "Value>
```

Put Production in Azure Key Vault.
