import vine from '@vinejs/vine'

export const listChatMessagesValidator = vine.create({
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})

export const createDirectConversationValidator = vine.create({
  userId: vine.string().uuid(),
})

export const createGroupConversationValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
  memberIds: vine.array(vine.string().uuid()).minLength(2).maxLength(50),
})

export const createChatMessageValidator = vine.create({
  body: vine.string().trim().minLength(1).maxLength(4000),
})

export const markChatReadValidator = vine.create({
  messageId: vine.string().uuid().optional(),
})
