# Feward

Rede social "Feward" — protótipo front-end em React, baseado no PDF de referência (Feward30.pdf).
Todas as telas do PDF estão implementadas com **dados de teste (mock)**: não há backend nem Supabase
conectado ainda — é só front-end funcional, pronto para depois ligar num backend real (Supabase, Django, etc).

## Telas incluídas

- Login / Criar conta / Créditos
- Início (feed, criar post, curtir, comentar, salvar)
- Comunidade (grade de comunidades + criar comunidade + entrar numa comunidade)
- Explorar (busca de comunidades)
- Mensagem (lista de conversas + chat)
- Notificação
- Salvos (vídeos & fotos)
- Perfil (bio editável, sair, deletar conta)
- Configuração

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Estrutura

```
src/
  data/mockData.js     -> todos os dados de teste (usuário, posts, comunidades, mensagens...)
  components/           -> uma tela ou peça de UI por arquivo
  App.jsx               -> roteamento entre telas via estado (sem react-router)
  index.css             -> todo o design system (cores, tipografia, componentes)
```

## Próximos passos sugeridos

- Trocar `data/mockData.js` por chamadas reais (Supabase, API própria, etc).
- Persistir sessão de login (hoje reseta ao recarregar a página, de propósito, por ser só mock).
- Upload real de imagem/vídeo no post (hoje o composer só aceita texto).
