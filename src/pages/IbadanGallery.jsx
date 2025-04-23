import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IbadanGallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorImages, setErrorImages] = useState(null);
  const [errorVideos, setErrorVideos] = useState(null);

  // Fetching Images from Unsplash
  useEffect(() => {
    const fetchImages = async () => {
  const unsplashApiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
  if (!unsplashApiKey) {
    setErrorImages('Unsplash API Key is not set');
    setLoadingImages(false);
    return;
  }

  const queryParams = [
    
    'University of ibadan',
  
  ];

  const allImages = [];
  setLoadingImages(true);

  try {
    // Loop through each query term and fetch results
    for (let query of queryParams) {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashApiKey}&per_page=10`
      );
      const data = await response.json();

      if (response.ok) {
        allImages.push(...data.results);
      } else {
        throw new Error(`Error fetching images for query: ${query}`);
      }
    }

    // Update state with all fetched images
    setImages(allImages);
  } catch (error) {
    setErrorImages(error.message);
  } finally {
    setLoadingImages(false);
  }
};

fetchImages();


    // Refresh images every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(() => {
      fetchImages();
    }, 30000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // // Fetching Videos from YouTube
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     const youtubeApiKey = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
  //     if (!youtubeApiKey) {
  //       setErrorVideos('YouTube API Key is not set');
  //       setLoadingVideos(false);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Ibadan&key=${youtubeApiKey}`
  //       );
  //       const data = await response.json();
  //       if (response.ok) {
  //         setVideos(data.items);
  //       } else {
  //         throw new Error('Error fetching videos');
  //       }
  //     } catch (error) {
  //       setErrorVideos(error.message);
  //     } finally {
  //       setLoadingVideos(false);
  //     }
  //   };

  //   fetchVideos();

    // // Refresh videos every 30 seconds (30000 milliseconds)
    // const intervalId = setInterval(() => {
    //   fetchVideos();
    // }, 30000);

  //   return () => clearInterval(intervalId); // Cleanup on component unmount
  // }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center rounded-lg p-6 dark:bg-slate-900">
      <h1 className="text-3xl text-white mb-4">Ibadan Fun and Relaxation Places</h1>
      
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <h2 className="col-span-full text-2xl text-white mb-4">Images</h2>
        {loadingImages
          ? Array(6).fill(0).map((_, idx) => (
              <Skeleton key={idx} className="rounded-lg h-48" />
            ))
          : errorImages
          ? <p className="text-red-500">{errorImages}</p>
          : images.length > 0
          ? images.map((image) => (
              <div key={image.id} className="rounded-3xl bg-orange-400">
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            ))
          : <p className="col-span-full text-white">No images found</p>}
      </div>

      {/* Video Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
        <h2 className="col-span-full text-2xl text-white mb-4">Videos</h2>
        {loadingVideos
          ? Array(3).fill(0).map((_, idx) => (
              <Skeleton key={idx} className="rounded-lg h-48" />
            ))
          : errorVideos
          ? <p className="text-red-500">{errorVideos}</p>
          : videos.length > 0
          ? videos.map((video) => (
              <div key={video.id.videoId} className="rounded-3xl bg-orange-400">
                <iframe
                  width="100%"
                  height="240"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  className="rounded-3xl"
                />
                <p className="text-white">{video.snippet.title}</p>
              </div>
            ))
          : <p className="col-span-full text-white">No videos found</p>}
      </div>
    </div>
  );
};

export default IbadanGallery;
