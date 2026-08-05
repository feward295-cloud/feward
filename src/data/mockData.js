// Dados de teste — sem backend. Tudo em memória, some ao recarregar a página.

export const currentUser = {
  id: 'u0',
  name: 'Pedro Rafael',
  username: '@ddrk',
  avatarColor: '#ff3b30',
  bio: 'Gosto de minecraft e fnaf. Criador da Feward.',
  createdAt: '25/04/2026',
  friendsCount: 128,
}

export const communities = [
  { id: 'jogos', name: 'Jogos', art: 'jogos', members: '84,2 mil' },
  { id: 'fanarte', name: 'FanArte', art: 'fanarte', members: '31,4 mil' },
  { id: 'circo', name: 'Digital Circus', art: 'circo', members: '212 mil' },
  { id: 'animes', name: 'Animes', art: 'animes', members: '156 mil' },
  { id: 'filmes', name: 'Filmes', art: 'filmes', members: '52,8 mil' },
  { id: 'memes', name: 'Memes', art: 'memes', members: '340 mil' },
]

export const trendingCommunities = ['Digital circus', 'Animes', 'Memes', 'FanArte']

export const initialPosts = [
  {
    id: 'p1',
    user: { name: 'Usuário', handle: '@convidado01' },
    caption: 'primeira postagem por aqui, bora testar essa rede 🔥',
    liked: false,
    likes: 12,
    saved: false,
    comments: [
      { id: 'c1', user: 'Usuário', text: 'muito bom!' },
    ],
  },
  {
    id: 'p2',
    user: { name: 'Usuário', handle: '@convidado02' },
    caption: 'alguém mais aqui é da comunidade de Jogos?',
    liked: false,
    likes: 4,
    saved: false,
    comments: [],
  },
]

export const friendsMock = Array.from({ length: 12 }).map((_, i) => ({
  id: `f${i}`,
  name: 'Usuário',
}))

export const initialConversations = [
  {
    id: 'conv1',
    name: 'Christopher',
    lastMessage: 'bora ver os ajustes da comunidade',
    messages: [
      { id: 'm1', from: 'them', text: 'e aí, viu o novo layout?' },
      { id: 'm2', from: 'me', text: 'vi sim, ficou muito bom' },
      { id: 'm3', from: 'them', text: 'bora ver os ajustes da comunidade' },
    ],
  },
  {
    id: 'conv2',
    name: 'Tony',
    lastMessage: 'te mandei a identidade visual nova',
    messages: [
      { id: 'm4', from: 'them', text: 'te mandei a identidade visual nova' },
    ],
  },
]

export const initialNotifications = [
  { id: 'n1', text: 'Christopher comentou na sua publicação', time: '2h' },
  { id: 'n2', text: 'Tony começou a seguir você', time: '5h' },
  { id: 'n3', text: 'Sua publicação recebeu 10 curtidas', time: '1d' },
]

export const savedItems = [
  { id: 's1', label: 'Digital Circus', type: 'video', art: 'circo' },
  { id: 's2', label: 'Feward', type: 'foto', art: 'feward' },
  { id: 's3', label: 'Jogos mais irados', type: 'video', art: 'retro' },
  { id: 's4', label: 'Paisagem', type: 'foto', art: 'paisagem' },
]

export const profileGallery = ['feward', 'pinguim', 'paisagem', 'retro', 'jogos', 'animes']

export const credits = [
  { name: 'Pedro Rafael (DDRK)', role: 'criador e programador da Feward' },
  { name: 'Christopher (Nullirã)', role: 'Adm da Feward' },
  { name: 'Tony', role: 'ajudou na identidade visual e programou um dos primeiros visuais' },
]

export const thanks = ['Arthur Pereira', 'Maria Eduarda']
