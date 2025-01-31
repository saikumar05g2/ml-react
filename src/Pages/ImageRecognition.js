import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

function ImageRecognition() {
  const [prediction, setPrediction] = useState("");
  const imageRef = useRef(null);

  const classifyImage = async () => {
    const model = await mobilenet.load();
    const predictions = await model.classify(imageRef.current);
    setPrediction(predictions[0].className);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) =>
          (imageRef.current.src = URL.createObjectURL(e.target.files[0]))
        }
      />
      <img ref={imageRef} alt="Upload" width="300" />
      <button onClick={classifyImage}>Classify Image</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
}

export default ImageRecognition;
