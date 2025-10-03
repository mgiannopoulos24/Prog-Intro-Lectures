export const loadImage = async (key) => {
  try {
    const images = import.meta.glob("/src/assets/*");

    const match = Object.keys(images).find((path) => {
      const fileName = path.split("/").pop();
      return fileName.startsWith(key + ".");
    });

    if (match) {
      const module = await images[match]();
      return module.default;
    } else {
      console.warn(`Image with key "${key}" not found in /src/assets/`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to load image for key: ${key}`, error);
    return null;
  }
};
