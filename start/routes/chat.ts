import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ChatController = () => import('#controllers/chat/chat_controller')

export default function chatRoutes() {
  router
    .group(() => {
      router.get('users', [ChatController, 'users'])
      router.get('conversations', [ChatController, 'conversations'])
      router.post('conversations/direct', [ChatController, 'createDirect'])
      router.post('conversations/group', [ChatController, 'createGroup'])
      router.get('conversations/:id/messages', [ChatController, 'messages'])
      router.post('conversations/:id/messages', [ChatController, 'createMessage'])
      router.post('conversations/:id/read', [ChatController, 'markRead'])
      router.delete('conversations/:id/messages', [ChatController, 'clearMessages'])
      router.delete('conversations/:id', [ChatController, 'deleteConversation'])
    })
    .prefix('chat')
    .use(middleware.auth())
    .as('chat')
}
