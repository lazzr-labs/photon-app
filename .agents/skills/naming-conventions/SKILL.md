---
name: naming-conventions
description: Naming rules for this repo. Use when creating or renaming variables, functions, stores, folders, routes, and screen files so names match the existing domain-first patterns.
---

# Naming conventions

**Use this skill when choosing or refactoring names.** Follow the repo's domain-first naming style instead of inventing generic or verb-first names.

## Core rule

* Prefer **noun + verb** naming for variables and functions when possible.
* Put the domain noun first and the action second.
* Good examples: **profileInit**, **profileSet**, **profileClear**, **profileLogout**, **learnersInit**, **themeLoadedSet**, **apiLoadedSet**.
* Avoid vague verb-first names like **setProfileDataNow**, **handleLearner**, **processBook**, or **doUpdate** when a concrete domain noun is known.

## Use repo vocabulary

* Reuse nouns that already exist in the codebase: **profile**, **auth**, **learner**, **learners**, **book**, **books**, **series**, **page**, **toast**, **theme**.
* Keep naming aligned with routes, folder names, stores, and generated API models.
* If the UI says **learner**, do not rename the same concept to **student** in code unless the feature already does that consistently.

## Variables and state

* Local state should be specific and readable: **loading**, **learnerLoading**, **showCropper**, **learnerImage**, **nameValue**.
* Setter functions should mirror the state noun: **setLoading**, **setLearnerImage**, **setShowCropper**.
* Booleans should read clearly as state: **loading**, **apiLoaded**, **themeLoaded**, **showCropper**.

## Functions and actions

* Name functions by domain plus action: **learnerGet**, **learnerUpdate**, **learnerImageUpdate**, **profileInit**, **profileUpdateImage**.
* Store actions should keep the same domain noun across the store: **profileSet**, **profileClear**, **profileInit**.
* Use consistent action verbs across related features: **get**, **set**, **clear**, **init**, **update**, **create**, **delete**, **logout**.

## Stores and components

* Stores use PascalCase plus **Store**: **ProfileStore**, **AuthStore**, **LearnerStore**.
* Components use PascalCase and usually reflect domain plus role: **LearnerUpdateContent**, **ProfileHeader**, **DashboardScreen**.
* Reusable helpers should be named for what they return or do, not how they are implemented.

## Files and folders

* Route folders and screen files use **kebab-case**.
* Name folders and files by domain first, then action or role.
* Existing patterns include **learner-update/**, **profile-update/**, **admin-book-create/**, **sign-in/**, and **password-reset/**.
* Screen decomposition files commonly use **{feature}.tsx**, **{feature}-header.tsx**, **{feature}-content.tsx**, and helper files like **_learner.actions.ts** or **_book.store.ts**.

## What to avoid

* Avoid generic names like **data**, **item**, **thing**, **temp**, **value**, or **result** when the real domain noun is available.
* Avoid mixing synonyms for the same concept inside one feature.
* Avoid abbreviations unless they are already established in the repo or platform API.
* Avoid naming that hides side effects; for example, prefer **profileLogout** over a vague name like **resetUserState** if the function actually logs the user out.

## Quick checks before finalizing a name

* Does the name start with the domain noun?
* Does the action verb describe what it really does?
* Does the noun match the folder, route, store, or API model already used nearby?
* Would another agent understand the purpose without opening the implementation?
