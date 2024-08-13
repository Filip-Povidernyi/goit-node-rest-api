import fs from "node:fs/promises"

const isAccessible = async path => {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
  };
  
  const createFolderIsNotExist = async folder => {
    if (!(await isAccessible(folder))) {
        await fs.mkdir(folder);
    }
  };

  export default createFolderIsNotExist;