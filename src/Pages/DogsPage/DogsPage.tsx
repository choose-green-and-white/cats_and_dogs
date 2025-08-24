import React, { useEffect, useState, type JSX } from "react";
import Picture from "../../Components/Picture/Picture";
import Buttons from "../../Components/Buttons/Buttons";
import $api from "../../shared/axiosInstance";

import likeIcon from "../../assets/like.png";
import nextIcon from "../../assets/next.png";
import dislikeIcon from "../../assets/dislike.png";

export default function DogsPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDog();
  }, []);

  async function getDog(): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: { message: string; status: string } = await res.json();
      const url = data?.message ?? null;
      setImageUrl(url);
    } catch (err: any) {
      setError(err?.message ?? "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  }

  // обработчик для загрузки нового пэса
  function handleEqualsDogs(): void {
    getDog();
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
      getDog();
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
      {loading && <div>Загрузка пса...</div>}
      {error && <div>Ошибка загрузки: {error}</div>}
      <Picture url={imageUrl} alt="Пёс" />
      <Buttons
        onPlus={handleLike}
        onEquals={handleEqualsDogs}
        likeImage={likeIcon}
        nextImage={nextIcon}
        dislikeImage={dislikeIcon}
      />
    </div>
  );
}
