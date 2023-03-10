import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Header } from "../../components";
import { AlbumService } from "./services";
import { UserContext } from "../../context";

import styles from "./albums.module.css";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumsData = await AlbumService.list();
        const userAlbums = albumsData.filter(
          (item) => item.userId === currentUser?.id
        );

        setAlbums(userAlbums);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [currentUser?.id]);

  return (
    <div className={styles.albumsMainContainer}>
      <Header title="Albums" />
      <div className={styles.titlesContainer}>
        {albums.map((album) => (
          <Link
            className={styles.title}
            key={album.id}
            to={`/albums/${album.id}`}
          >
            {album.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
