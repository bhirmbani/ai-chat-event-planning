"use client";

import { countMessageAtom, store } from "@/store";
import { Provider, useAtomValue } from "jotai";

export default function ChatCount() {
  const count = useAtomValue(countMessageAtom);

  return (
    <Provider store={store}>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-3 text-xl font-bold">Chat Messages</legend>
        <p>{`${count}/50 messages`}</p>
      </fieldset>
    </Provider>
  );
}
