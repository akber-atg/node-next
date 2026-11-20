"use client";

import RadioGroup from "../../components/radio_btn";
import categories from "../../static_data/radiobuttons.json";
import { useEffect, useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  async function handleUpload() {
    if (!file) {
      setMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      setUploading(true);
      setMessage("");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed.");
      }

      setMessage("Image uploaded successfully!");
      setFile(null);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="globalContainer">
      <h1>Upload an Image</h1>
      <RadioGroup
        options={categories}
        name="imageCategory"
        selectedValue={category}
        onChange={setCategory}
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(event) => {
          setFile(event.target.files?.[0] ?? null);
          setDimensions(null);
          setMessage("");
          setPreviewUrl(file ? URL.createObjectURL(file) : "");
        }}
      />

      {file && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected: {file.name}</p>
          <p>
            <strong>File size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
          {dimensions && (
            <p>
              <strong>Dimensions:</strong> {dimensions.width} ×{" "}
              {dimensions.height} pixels
            </p>
          )}
          <img
            src={URL.createObjectURL(file)}
            alt="Selected image preview"
            onLoad={(event) => {
              const image = event.currentTarget;
              setDimensions({
                width: image.naturalWidth,
                height: image.naturalHeight,
              });
            }}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
