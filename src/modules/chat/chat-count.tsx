"use client";

export default function ChatCount() {
  
  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-3 text-xl font-bold">Chat Messages</legend>
      <p>{`${2}/50 messages`}</p>
    </fieldset>
  );
}
