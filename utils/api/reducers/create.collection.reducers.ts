import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollectionDetailsState {
  name: string;
  description: string;
  bannerFile: string;
  avatarFile: string;
  // category: any;
  category: string;
  termsConditions: string;
  blurState: boolean;
  launchPadState: boolean;
  isRizeMemberCollection: boolean;
}

const initialState: CollectionDetailsState = {
  name: "",
  description: "",
  bannerFile: "",
  avatarFile: "",
  // category: null,
  category: "Arts",
  termsConditions: "",
  blurState: false,
  launchPadState: false,
  isRizeMemberCollection: false
};

const createCollectionSlice = createSlice({
  name: 'create-collection',
  initialState,
  reducers: {
    updateCollectionName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateCollectionDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updateCollectionBannerFile: (state, action: PayloadAction<string>) => {
      state.bannerFile = action.payload;
    },
    updateCollectionAvatarFile: (state, action: PayloadAction<string>) => {
      state.avatarFile = action.payload;
    },
    updateCollectionCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    updateCollectionTermsConditions: (state, action: PayloadAction<string>) => {
      state.termsConditions = action.payload;
    },
    updateBlurState: (state, action: PayloadAction<boolean>) => {
      state.blurState = action.payload;
    },
    updateLaunchPadState: (state, action: PayloadAction<boolean>) => {
      state.launchPadState = action.payload;
    },
    updateIsRizeMemberCollection: (state, action: PayloadAction<boolean>) => {
      state.isRizeMemberCollection = action.payload;
    }
    // ... other reducers for updating collection details
  },
});

export const collectionReducer = createCollectionSlice.reducer;
export const { 
  updateCollectionName, 
  updateCollectionDescription,
  updateCollectionBannerFile,
  updateCollectionAvatarFile,
  updateCollectionCategory,
  updateCollectionTermsConditions,
  updateBlurState,
  updateLaunchPadState,
  updateIsRizeMemberCollection
} = createCollectionSlice.actions;
