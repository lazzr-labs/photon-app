---
name: expo
description: Expo/React Native template patterns. Use when editing an Expo app that uses this stack (Expo Router, NativeWind, Zustand, React Hook Form, OpenAPI), adding screens, stores, or API usage.
---

# Expo template

**Stack:** Expo SDK 54, Expo Router, TypeScript, NativeWind (Tailwind), Zustand, React Hook Form, OpenAPI-generated API (Axios).

## Layout

* **Entry:** **main** is **expo-router/entry**. Routes live under **src/app/** (file-based).
* **Path alias:** Use **~/src/** for app code (e.g. **~/src/stores/auth.store**, **~/src/api**).
* **Route groups:** use parentheses, e.g. **(auth)**, **(app)**, **(public)**. Dynamic routes: **[id].tsx**, **[...slug].tsx**.

## Screens

* One folder per feature under **src/screens/** (e.g. **sign-in**, **dashboard**).
* **{feature}.tsx** = **{Feature}Screen**: **SafeAreaView** → optional **{Feature}Header** → **ScrollView** → **{Feature}Content**.
* **{feature}-content.tsx** = main form/logic; **-header.tsx** when needed.
* Route files in **app/** only set **Stack.Screen** and render the Screen component from **~/src/screens/...**.

## State (Zustand)

* **Global stores** in **src/stores/** (e.g. **auth.store**, **profile.store**).
* **Screen-scoped stores** next to the screen, name with leading underscore: **_entity.store.ts**, **_list.store.ts**.
* Pattern: **State** and **Actions** types, **initState**, **create<State & Actions>()((set, get) => ({ ...initState, ... }))**.
* Call **Store.getState().action()** when using outside React (e.g. in root layout).

## API

* **src/api.ts** instantiates OpenAPI classes with **Configuration**, **process.env.EXPO_PUBLIC_API_URL**, and a shared Axios instance. Export one instance per API (e.g. **authApi**, **usersApi**).
* Auth: token passed per call (e.g. **usersApi.profileGetAPI(token)**). Token from **AuthStore.getState().authToken** or **AsyncStorage**.
* On API errors use **ErrorGet(errors?.response?.data)** from **~/src/scripts/error** and show **Toast('Error', { variant: 'destructive', description: error })**.

## Forms

* **react-hook-form** with **Controller** for inputs and **useFormState({ control })** for **errors**.
* Use **rules** on Controller (e.g. **required: true**). Optional **defaultValue**.

## UI

* Primitives in **src/components/ui/** (button, input, text, avatar, etc.). Use **cn()** from **~/src/lib/utils** and **cva** for variants.
* Web-only styles (focus, hover) wrapped in **Platform.select({ web: '...' })**.
* **Toast** and **ToastHost** from **~/src/components/toast**; **PortalHost** from **@rn-primitives/portal** in root layout.

## Conventions

* **Naming:** PascalCase components, kebab-case screen files, **{Name}Store** for stores.
* **Imports:** external → **~/src/** (api, components, stores, lib, scripts) → relative.
* **Styling:** NativeWind classes; design tokens like **text-primary**, **bg-background**, **border**.
