import { createContext, useState, useCallback, useContext } from 'react';

const ImageLoadingContext = createContext();
const ToggleImageLoadingContext = createContext();

const useImageLoading = () => {
  const images = useContext(ImageLoadingContext);
  return Boolean(images ? images.length : images);
};

const useToggleImageLoading = () => {
  return useContext(ToggleImageLoadingContext);
};

const ImageLoadingProvider = ({ children }) => {
  const [loadingImage, setLoadingImage] = useState(null);

  const toggleLoadImage = useCallback(imageId => {
    setLoadingImage(prev => {
      const isImageExist = prev?.includes(imageId) ?? false;

      return isImageExist
        ? prev.filter(el => el !== imageId)
        : !prev
        ? [imageId]
        : [...prev, imageId];
    });
  }, []);

  return (
    <ToggleImageLoadingContext.Provider value={toggleLoadImage}>
      <ImageLoadingContext.Provider value={loadingImage}>
        {children}
      </ImageLoadingContext.Provider>
    </ToggleImageLoadingContext.Provider>
  );
};

export { ImageLoadingProvider, useImageLoading, useToggleImageLoading };
