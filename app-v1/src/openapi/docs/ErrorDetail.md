# ErrorDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**location** | **string** | Where the error occurred, e.g. \&#39;body.items[3].tags\&#39; or \&#39;path.thing-id\&#39; | [optional] [default to undefined]
**message** | **string** | Error message text | [optional] [default to undefined]
**value** | **any** | The value at the given location | [optional] [default to undefined]

## Example

```typescript
import { ErrorDetail } from './api';

const instance: ErrorDetail = {
    location,
    message,
    value,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
