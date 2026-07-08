import { placesApi } from '~/src/api';
import { AddressPlaceAutocomplete, AddressPlace } from '~/src/openapi';

export const placesGet = async (search: string, authToken: string): Promise<AddressPlaceAutocomplete[] | null> => {
  try {
    const response = await placesApi.placesGetAPI(authToken, search);
    return response.data.list;
  } catch {
    return null;
  }
};

export const placeGet = async (placeID: string, authToken: string): Promise<AddressPlace | null> => {
  try {
    const response = await placesApi.placeGetAPI(placeID, authToken);
    return response.data.object;
  } catch {
    return null;
  }
};
