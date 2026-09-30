# Guia da Recarga Pré-paga

Site **informativo** (React/Vite), mantido por SYGMA SOLUCOES LTDA, CNPJ 30.061.720/0001-28.

Não vende recargas, não recebe pagamentos e não coleta telefone ou dados pessoais. Não há backend nem chaves de API.

## Rotas
- `/` — início (operadoras, checklist, alertas de golpe, dúvidas)
- `/guia-vivo`, `/guia-claro`, `/guia-tim`, `/guia-surf`, `/guia-correios`, `/guia-algar` (com ou sem `.html`)
- `/como-identificar-golpes-de-recarga`, `/saldo-e-validade-do-credito`, `/portabilidade-e-recarga`, `/glossario-de-recarga-pre-paga`
- `/termos-de-uso.html` e `/politica-de-privacidade.html`

## Build
```bash
npm install
npm run build
```
Deploy: Vercel (usa `vercel.json`).

## Regras para manter o site em conformidade
- Não reintroduzir pagamento, coleta de número ou promessa de recarga sem entrega real comprovada.
- Não usar logos/banners de operadoras sem autorização por escrito.
- Não publicar preços, bônus ou prazos sem fonte atual citada.
- Manter o aviso de independência visível em todas as páginas.
- Anúncios devem descrever o site como guia/consulta, não como local de recarga.
- Se adicionar tag do Google Ads/Analytics, atualize a Política de Privacidade antes.
