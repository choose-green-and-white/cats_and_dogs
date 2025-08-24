import React, { useEffect, useState, type JSX } from "react";
import Picture from "../../Components/Picture/Picture";
import Buttons from "../../Components/Buttons/Buttons";
import $api from "../../shared/axiosInstance";

import likeIcon from "../../assets/like.png";
import nextIcon from "../../assets/next.png";
import dislikeIcon from "../../assets/dislike.png";

export default function CatsPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCat();
  }, []);

  async function getCat(): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=full"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: any[] = await res.json();
      const url = data && data[0] && data[0].url ? data[0].url : null;
      setImageUrl(url);
    } catch (err: any) {
      setError(err?.message ?? "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  }

  // обработчик для загрузки нового котэ
  function handleNextCat(): void {
    getCat();
  }

  // ф-ция для добавления картинки в БД
  async function addToFavorite(imageUrl: string): Promise<void> {
    try {
      const response = await $api.post("/favorite/new", {
        imageURL: imageUrl,
        comment: "HELLO",
      });

      if (response.status === 201) {
        console.log("Картинка успешно добавлена в БД");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  // обработчик для кнопки LIKE
  const handleLike = async (): Promise<void> => {
    if (imageUrl) {
      await addToFavorite(imageUrl);
      getCat();
    } else {
      console.log("Нет изображения для добавления");
    }
  };

  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: 16,
  };

  return (
    <div style={pageStyle}>
      {loading && <div>Загрузка кота...</div>}
      {error && <div>Ошибка загрузки: {error}</div>}
      <Picture url={imageUrl} alt="Кот" />
      <Buttons
        onPlus={handleLike}
        onEquals={handleNextCat}
        likeImage={likeIcon}
        nextImage={nextIcon}
        dislikeImage={dislikeIcon}
      />
    </div>
  );
}