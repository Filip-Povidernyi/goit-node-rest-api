import path from "path";
import multer from "multer";
import createFolderIsNotExist from "../helpers/checkFolder.js";



const tempDir = path.resolve("temp");

await createFolderIsNotExist(tempDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tempDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
  });


  
  export default upload;