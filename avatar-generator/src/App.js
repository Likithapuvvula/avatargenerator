import React, { useState } from "react";
import "./index.css"; // Ensure the CSS file exists

const avatarStyles = {
  male: "adventurer",
  female: "avataaars",
  unknown: "identicon",
};

const App = () => {
  const [style, setStyle] = useState("identicon");
  const [seed, setSeed] = useState(generateSeed());
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("unknown");
  const [avatarHistory, setAvatarHistory] = useState([]);

  function generateSeed() {
    return Math.random().toString(36).substring(7);
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        detectGender();
      };
      reader.readAsDataURL(file);
    }
  };

  const detectGender = () => {
    const mockGender = Math.random() > 0.5 ? "male" : "female";
    setGender(mockGender);
    setAvatarHistory((prev) => [...prev, { style, seed }]);
    setStyle(avatarStyles[mockGender]);
    setSeed(generateSeed());
  };

  const downloadAvatar = () => {
    const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    const link = document.createElement("a");
    link.href = avatarUrl;
    link.download = `avatar_${gender}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetGenerator = () => {
    setImage(null);
    setAvatarHistory([]);
    setGender("unknown");
    setStyle("identicon");
    setSeed(generateSeed());
  };

  const revertToPreviousAvatar = () => {
    if (avatarHistory.length > 0) {
      const previous = avatarHistory.pop();
      setStyle(previous.style);
      setSeed(previous.seed);
      setAvatarHistory([...avatarHistory]);
    }
  };

  return (
    <div className="container">
      {/* Title and Uploaded Image beside each other */}
      <div className="title-container">
        <h1 className="title">Image-Based Avatar Generator</h1>
        {image && <img src={image} alt="Uploaded" className="uploaded-img" />}
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />

      <div className="avatar-container">
        <img
          src={`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`}
          alt="Generated Avatar"
          className="avatar-img"
        />
      </div>

      {/* Buttons in 2 rows */}
      <div className="button-container">
        <button onClick={detectGender} className="btn generate">Generate Avatar</button>
        <button onClick={revertToPreviousAvatar} className="btn previous" disabled={avatarHistory.length === 0}>Previous Avatar</button>
      </div>

      <div className="button-container">
        <button onClick={downloadAvatar} className="btn download">Download Avatar</button>
        <button onClick={resetGenerator} className="btn reset">Reset</button>
      </div>
    </div>
  );
};

export default App;
