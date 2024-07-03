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

## Screens
There are three screens (pages) in this project.

1. Login  (/login) -> Public
2. OTP (/otp) -> Public with rule
3. Chat   (/chat) -> Protected

### Consideration
Login will also a signup page. If user not yet registered on supabase (first time user), then it will create a new user, if not it will sign in the user. Both scenario will required user to verify the otp that it will be sent to their email address.

OTP page will have a rule which is can only be used by user if the user already request for OTP in the login page (submit email address).

Chat will be protected and the redirection will be handled on server side to check if user is authenticated or not. If user is not authenticated, then it will redirect to login page.