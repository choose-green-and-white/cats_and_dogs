import React, { useEffect, useState, type JSX} from 'react';
import Picture from '../../Components/Picture/Picture';
import Buttons from '../../Components/Buttons/Buttons';
import $api from "../../shared/axiosInstance";


import likeIcon from "../../assets/like.png";
import nextIcon from "../../assets/next.png";
import dislikeIcon from "../../assets/dislike.png";

type FoxApiResponse = {
  image?: string;
  link?: string;
};

export default function FoxPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFox();
  }, []);

  async function getFox(): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://randomfox.ca/floof/');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: FoxApiResponse = await res.json();
      const url = data?.image ?? null;
      setImageUrl(url);
    } catch (err: any) {
      setError(err?.message ?? 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }

  // обработчик для загрузки нового лиса
  function handleNextFox(): void {
    getFox();
  }

    // ф-ция для добавления картинки в БД
    async function addToFavorite(imageUrl: string): Promise<void> {
      try {
        const response = await $api.post("/favorite/new", {
          imageURL: imageUrl,
          comment: 'HELLO'
        });
        
        if (response.status === 201) {
          console.log('Картинка успешно добавлена в БД');
        }
      } catch (error) {
        console.log("Error", error);
      }
    }

      // обработчик для кнопки LIKE
  const handleLike = async (): Promise<void> => {
    if (imageUrl) {
      await addToFavorite(imageUrl); 
      getFox(); 
    } else {
      console.log('Нет изображения для добавления');
    }
  };

  const pageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 16,
  };

  return (
    <div style={pageStyle}>
      {loading && <div>Загрузка лисы...</div>}
      {error && <div>Ошибка загрузки: {error}</div>}
      <Picture url={imageUrl} alt="Лиса" />
      <Buttons
        onPlus={handleLike}
        onEquals={handleNextFox}
        likeImage={likeIcon}
        nextImage={nextIcon}
        dislikeImage={dislikeIcon}
      />
    </div>
  );
}