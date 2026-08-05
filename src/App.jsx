import { useState } from 'react'
import LoginScreen from './components/LoginScreen.jsx'
import SignupScreen from './components/SignupScreen.jsx'
import CreditsScreen from './components/CreditsScreen.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopNav from './components/TopNav.jsx'
import HomeFeed from './components/HomeFeed.jsx'
import Explore from './components/Explore.jsx'
import Communities from './components/Communities.jsx'
import CommunityDetail from './components/CommunityDetail.jsx'
import Messages from './components/Messages.jsx'
import Notifications from './components/Notifications.jsx'
import Saved from './components/Saved.jsx'
import Profile from './components/Profile.jsx'
import Settings from './components/Settings.jsx'
import { initialPosts, initialConversations, initialNotifications } from './data/mockData'

export default function App() {
  const [screen, setScreen] = useState('login') // login | signup | credits | app
  const [activeTab, setActiveTab] = useState('home')
  const [openCommunity, setOpenCommunity] = useState(null)

  const [posts, setPosts] = useState(initialPosts)
  const [conversations, setConversations] = useState(initialConversations)
  const [notifications] = useState(initialNotifications)

  function handleLogin() {
    setScreen('app')
    setActiveTab('home')
  }

  function handleCreateAccount() {
    setScreen('app')
    setActiveTab('home')
  }

  function handleLogout() {
    setScreen('login')
    setOpenCommunity(null)
  }

  function handleDeleteAccount() {
    setScreen('login')
    setOpenCommunity(null)
  }

  function navigate(tab) {
    setOpenCommunity(null)
    setActiveTab(tab)
  }

  if (screen === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onGoToSignup={() => setScreen('signup')}
        onGoToCredits={() => setScreen('credits')}
      />
    )
  }

  if (screen === 'signup') {
    return (
      <SignupScreen
        onCreateAccount={handleCreateAccount}
        onGoToLogin={() => setScreen('login')}
        onGoToCredits={() => setScreen('credits')}
      />
    )
  }

  if (screen === 'credits') {
    return <CreditsScreen onBack={() => setScreen('login')} />
  }

  let content = null
  if (openCommunity) {
    content = <CommunityDetail communityId={openCommunity} onBack={() => setOpenCommunity(null)} />
  } else {
    switch (activeTab) {
      case 'home':
        content = <HomeFeed posts={posts} setPosts={setPosts} />
        break
      case 'comunidade':
        content = <Communities onOpenCommunity={setOpenCommunity} />
        break
      case 'explorar':
        content = <Explore onOpenCommunity={setOpenCommunity} />
        break
      case 'mensagem':
        content = <Messages conversations={conversations} setConversations={setConversations} />
        break
      case 'notificacao':
        content = <Notifications notifications={notifications} />
        break
      case 'salvos':
        content = <Saved />
        break
      case 'perfil':
        content = <Profile onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />
        break
      case 'configuracao':
        content = <Settings />
        break
      default:
        content = <HomeFeed posts={posts} setPosts={setPosts} />
    }
  }

  // Perfil e Comunidade (lista e detalhe) usam o menu no topo, igual ao mockup.
  // As demais telas mantêm o menu lateral.
  const usesTopNav = activeTab === 'perfil' || activeTab === 'comunidade' || !!openCommunity

  if (usesTopNav) {
    return (
      <div className="app-shell-top">
        <TopNav active={activeTab} onNavigate={navigate} />
        <main>{content}</main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar active={activeTab} onNavigate={navigate} onLogout={handleLogout} />
      <main>{content}</main>
    </div>
  )
}
