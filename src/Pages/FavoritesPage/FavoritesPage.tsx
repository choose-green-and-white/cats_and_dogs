import  { useState, useEffect } from "react";
import $api from '../../shared/axiosInstance';
import Picture from '../../Components/Picture/Picture';

export default function FavoritesPage() {
  const [favoritesPictures, setFavoritesPictures] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  interface FavoriteItem {
    imageURL: string;
  }

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    if (favoritesPictures.length > 0) {
      selectRandomImage();
    }
  }, [favoritesPictures]);

   // получить избранные картинки из БД 

   async function getFavorites() {
    try {
      const response = await $api.get('/favorite');
      console.log('RESP', response);
      const favoritesData: FavoriteItem[] = response.data.data;
      const imageUrls = favoritesData.map((item: FavoriteItem) => item.imageURL);
      setFavoritesPictures(imageUrls);
    } catch (error) {
      console.error("Ошибка при получении любимых картинок:", error);
    }
  }

// получаем рандомную картинку

  const selectRandomImage = () => {
    if (favoritesPictures.length === 0) return;
    const randomIndex = Math.floor(Math.random() * favoritesPictures.length);
    setCurrentImage(favoritesPictures[randomIndex]);
  };

  const handleNext = () => {
    selectRandomImage();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
    }}>
      {currentImage ? (
        <Picture url={currentImage} alt="Любимая картинка" />
      ) : (
        <div>Нет любимых картинок</div>
      )}
      <button style={{ marginTop: '30px', fontSize: '30px' }} onClick={handleNext}>NEXT</button>
    </div>
  );
}