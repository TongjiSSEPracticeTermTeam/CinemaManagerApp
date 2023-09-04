import {Action, action, createStore, createTypedHooks} from 'easy-peasy';

interface StoreModel {
  token: string;
  changeToken: Action<StoreModel, string>;
}

export const store = createStore<StoreModel>({
  token: '',
  changeToken: action((state, payload) => {
    state.token = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
