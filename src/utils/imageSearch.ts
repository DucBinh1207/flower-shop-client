// Function to handle file upload
export function handleImageUpload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }

    // Check file type
    if (!file.type.match("image.*")) {
      reject(new Error("Please select an image file"));
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("File size should be less than 5MB"));
      return;
    }

    // Create a FileReader to read the file as data URL
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result.toString());
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}
