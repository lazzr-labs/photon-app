# PlacesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**placeGetAPI**](#placegetapi) | **GET** /places/{place_id} | |
|[**placesGetAPI**](#placesgetapi) | **GET** /places | |

# **placeGetAPI**
> PlaceGetOutputBody placeGetAPI()


### Example

```typescript
import {
    PlacesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlacesApi(configuration);

let placeId: string; // (default to undefined)
let authorization: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.placeGetAPI(
    placeId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **placeId** | [**string**] |  | defaults to undefined|
| **authorization** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PlaceGetOutputBody**

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

# **placesGetAPI**
> PlacesGetOutputBody placesGetAPI()


### Example

```typescript
import {
    PlacesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlacesApi(configuration);

let authorization: string; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.placesGetAPI(
    authorization,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] |  | (optional) defaults to undefined|
| **search** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PlacesGetOutputBody**

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

