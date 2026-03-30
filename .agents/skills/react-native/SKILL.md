---
name: react-native
description: React Native UI and behavior basics. Use when building components, lists, or handling touch/keyboard; use with expo skill for app structure and conventions.
---

# React Native

**Use this for UI primitives, touch, keyboard, and lists.** For routing, state, API, and template structure see the **expo** skill.

## Primitives

* Use **View** for layout (flexbox, no **div**). Use **Text** for any readable text—text must live inside **Text**.
* Use **Pressable** for tappable areas (buttons, list rows, cards). Prefer over **TouchableOpacity** for consistency and accessibility.
* Use **ScrollView** for scrollable content. For long lists (100+ items) use **FlatList** or **SectionList** so only visible items are mounted.

## Keyboard and forms

* When a form lives inside a **ScrollView**, set **keyboardShouldPersistTaps="handled"** so taps on inputs dismiss the keyboard as expected and buttons remain tappable.
* Use **KeyboardAvoidingView** when the keyboard would cover inputs and **ScrollView** alone is not enough (e.g. **behavior="padding"** on iOS).

## Platform and styling

* Use **Platform.select({ ios: ..., android: ..., web: ... })** for platform-specific logic or styles. Default fallback last.
* Prefer NativeWind **className** for styling. Use **StyleSheet.create** when you need dynamic values, dimensions (e.g. **height: number**), or styles that are awkward in Tailwind.
