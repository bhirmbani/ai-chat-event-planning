# Charcentric

## Tech Stack

## Project structure

## Database Model
```prisma
model Chat {
  id        String   @id @default(cuid())
  name      String?
  messages  Json[]
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
### Consideration
We are using supabase for user authentication. Supabase returning user id when user sign up or sign in. We are using this user id to create chat.

We aim to be simple as possible in this project by using only single Chat table instead creating another user table since sign up user already handled by supabase.

The Json structure for messages will be defined in frontend as a typescript interface. The interface is as follows:
```ts
interface Messages {
  type: 'assistant' | 'user'
  content: string
  createdAt: Date
}
```