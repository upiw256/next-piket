"use client";
import React, { useState, useRef } from "react";
import CameraComponent from "./component/CameraComponent";

export default function page() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };
  const takePhoto = async () => {
    try {
      if (videoRef.current) {
        const track = videoRef.current.srcObject.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const photoBlob = await imageCapture.takePhoto();
        const imageUrl = URL.createObjectURL(photoBlob);

        // Handle the photo (e.g., display it, upload it, etc.)
        console.log("Photo captured:", imageUrl);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };
  return (
    <div>
      <CameraComponent
        isCameraOpen={isCameraOpen}
        openCamera={openCamera}
        closeCamera={closeCamera}
        takePhoto={takePhoto}
        videoRef={videoRef}
      />
    </div>
  );
}
