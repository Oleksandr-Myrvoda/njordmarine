import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  console.log('loadingImage', loadingImage);

  // const canRemoveImageRef = useRef(false);

  const toggleLoadImage = useCallback(imageId => {
    setLoadingImage(prev => {
      const isImageExist = prev?.includes(imageId) ?? false;

      return isImageExist
        ? prev.filter(el => el !== imageId)
        : // ? canRemoveImageRef.current
        //   ? prev.filter(el => el !== imageId)
        //   : prev
        !prev
        ? [imageId]
        : [...prev, imageId];
    });
  }, []);

  // useEffect(() => {
  //   if (loadingImage.length === 1) {
  //     setTimeout(() => {}, 700);
  //   }
  // }, [loadingImage]);

  return (
    <ToggleImageLoadingContext.Provider value={toggleLoadImage}>
      <ImageLoadingContext.Provider value={loadingImage}>
        {children}
      </ImageLoadingContext.Provider>
    </ToggleImageLoadingContext.Provider>
  );
};

export { ImageLoadingProvider, useImageLoading, useToggleImageLoading };
