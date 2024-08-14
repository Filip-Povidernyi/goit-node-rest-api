import path from "node:path";
import multer from "multer";
import createFolderIsNotExist from "../helpers/checkFolder.js";
import HttpError from "../helpers/HttpErrors.js";



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

  const limits = {
    fileSize: 1024 * 1024 * 5,
  };

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop();

  if (!["jpg", "jpeg", "png", "webp", "tiff", "gif", "svg"].includes(extension)) {
    return cb(HttpError(400, `.${extension} is not allow extension`));
  };

  cb(null, true);
};
  
  const upload = multer({
    storage,
    limits,
    fileFilter
  });


  
  export default upload;