import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export interface File {
  uri: string;
  name: string;
  type: string;
}

export const useImagePicker = (initialImage: string | null, num = 1) => {
  const [imageUris, setImageUris] = useState<(string | null)[]>([initialImage]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  const processAssets = (assets: ImagePicker.ImagePickerAsset[]) => {
    const validAssets = assets.filter(a => a.uri && a.type === 'image' && a.fileName);

    if (validAssets.length === 0) {
      setImageError('유효한 이미지 파일이 없습니다.');
      return;
    }

    setImageUris(validAssets.map(({ uri }) => uri));
    setImageFiles(
      validAssets.map(asset => ({
        uri: asset.uri,
        name: asset.fileName || 'image.jpg',
        type: 'image/jpeg',
      }))
    );
  };

  const uploadImageFiles = async () => {
    setImageError(null);

    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaStatus !== 'granted') {
      setImageError('갤러리 권한이 필요합니다.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: Boolean(num > 1),
        quality: 1,
      });

      if (result.canceled) return;
      processAssets(result.assets);
    } catch {
      setImageError('이미지 업로드 오류');
    }
  };

  const uploadTakingPicture = async () => {
    setImageError(null);

    if (num > 1) {
      setImageError('사진 찍기는 한 장만 허용됩니다.');
      return;
    }

    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      setImageError('카메라 권한이 필요합니다.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;
      processAssets(result.assets);
    } catch {
      setImageError('이미지 촬영 업로드 오류');
    }
  };

  const imageReset = () => {
    setImageFiles([]);
    setImageUris([initialImage]);
    setImageError(null);
  };

  return {
    imageUris,
    imageFiles,
    imageError,
    uploadImageFiles,
    uploadTakingPicture,
    imageReset,
  };
};
