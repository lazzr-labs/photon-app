# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**profileDeleteAPI**](#profiledeleteapi) | **DELETE** /users/profile | |
|[**profileGetAPI**](#profilegetapi) | **GET** /users/profile | |
|[**profileImageUpdateAPI**](#profileimageupdateapi) | **POST** /users/profile/image | |
|[**profileUpdateAPI**](#profileupdateapi) | **PUT** /users/profile | |
|[**profileUpdateEmailAPI**](#profileupdateemailapi) | **PUT** /users/profile/email | |

# **profileDeleteAPI**
> ProfileDeleteOutputBody profileDeleteAPI()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profileDeleteAPI(
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ProfileDeleteOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profileGetAPI**
> ProfileGetOutputBody profileGetAPI()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profileGetAPI(
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ProfileGetOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profileImageUpdateAPI**
> ProfileImageUpdateOutputBody profileImageUpdateAPI()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let file: File; // (default to undefined)
let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profileImageUpdateAPI(
    file,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | defaults to undefined|
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ProfileImageUpdateOutputBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profileUpdateAPI**
> ProfileUpdateOutputBody profileUpdateAPI(profileUpdateInputBody)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ProfileUpdateInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let profileUpdateInputBody: ProfileUpdateInputBody; //
let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profileUpdateAPI(
    profileUpdateInputBody,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **profileUpdateInputBody** | **ProfileUpdateInputBody**|  | |
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ProfileUpdateOutputBody**

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

# **profileUpdateEmailAPI**
> ProfileUpdateEmailOutputBody profileUpdateEmailAPI(profileUpdateEmailInputBody)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ProfileUpdateEmailInputBody
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let profileUpdateEmailInputBody: ProfileUpdateEmailInputBody; //
let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profileUpdateEmailAPI(
    profileUpdateEmailInputBody,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **profileUpdateEmailInputBody** | **ProfileUpdateEmailInputBody**|  | |
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ProfileUpdateEmailOutputBody**

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

