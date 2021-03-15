import React from "react";
import ImageGallery from "react-image-gallery";

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

export default (props) => {
  console.log(props.images);
  const images = props.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));
  return <ImageGallery items={images} />;
};
