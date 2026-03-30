---
name: openapi-api
description: OpenAPI client and app API wiring. Use when adding or using API endpoints, editing the openapi client, or wiring new APIs in the app.
---

# OpenAPI and API

**Client:** The **openapi** folder holds the generated API client (do not edit by hand; regenerate from the OpenAPI spec). All API classes and types live there.

**Wiring:** **api.ts** is the single place that instantiates and exports API clients. It creates one **Configuration**, one Axios instance, and a **url** (e.g. **process.env.EXPO_PUBLIC_API_URL**). Each API class is constructed with **(config, url, axiosInstance)** and exported (e.g. **authApi**, **usersApi**).

* When the spec or generator adds a new API, add the same pattern in **api.ts**: import the **XxxApi** class, **new XxxApi(config, url, axiosInstance)**, then **export { ..., xxxApi }**.

## Usage

* Import API instances from **~/src/api** (e.g. **authApi**, **usersApi**). Call the generated methods (e.g. **authApi.signInAPI(...)**); auth is usually passed per call (e.g. token as last argument) where required.
* Most API calls are made inside **Zustand stores**; some are used directly in screens or components. Use **ErrorGet** from **~/src/scripts/error** and **Toast** for user-facing errors.
