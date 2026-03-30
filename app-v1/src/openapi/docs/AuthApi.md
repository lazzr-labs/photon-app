# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**passwordForgotPostAPI**](#passwordforgotpostapi) | **POST** /auth/passwordforgot | |
|[**passwordResetPostAPI**](#passwordresetpostapi) | **POST** /auth/passwordreset | |
|[**signInAPI**](#signinapi) | **POST** /auth/signin | |
|[**signInSupabaseAPI**](#signinsupabaseapi) | **POST** /auth/signin/supabase | |
|[**signUpAPI**](#signupapi) | **POST** /auth/signup | |

# **passwordForgotPostAPI**
> PasswordForgotPostOutputBody passwordForgotPostAPI(passwordForgotPostInputBody)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    PasswordForgotPostInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let passwordForgotPostInputBody: PasswordForgotPostInputBody; //

const { status, data } = await apiInstance.passwordForgotPostAPI(
    passwordForgotPostInputBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **passwordForgotPostInputBody** | **PasswordForgotPostInputBody**|  | |


### Return type

**PasswordForgotPostOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **passwordResetPostAPI**
> PasswordResetPostOutputBody passwordResetPostAPI(passwordResetPostInputBody)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    PasswordResetPostInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let passwordResetPostInputBody: PasswordResetPostInputBody; //

const { status, data } = await apiInstance.passwordResetPostAPI(
    passwordResetPostInputBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **passwordResetPostInputBody** | **PasswordResetPostInputBody**|  | |


### Return type

**PasswordResetPostOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signInAPI**
> SignInOutputBody signInAPI(signInInputBody)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SignInInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signInInputBody: SignInInputBody; //

const { status, data } = await apiInstance.signInAPI(
    signInInputBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signInInputBody** | **SignInInputBody**|  | |


### Return type

**SignInOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signInSupabaseAPI**
> SignInSupabaseOutputBody signInSupabaseAPI(signInSupabaseInputBody)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SignInSupabaseInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signInSupabaseInputBody: SignInSupabaseInputBody; //

const { status, data } = await apiInstance.signInSupabaseAPI(
    signInSupabaseInputBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signInSupabaseInputBody** | **SignInSupabaseInputBody**|  | |


### Return type

**SignInSupabaseOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signUpAPI**
> SignUpOutputBody signUpAPI(signUpInputBody)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SignUpInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signUpInputBody: SignUpInputBody; //

const { status, data } = await apiInstance.signUpAPI(
    signUpInputBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signUpInputBody** | **SignUpInputBody**|  | |


### Return type

**SignUpOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

