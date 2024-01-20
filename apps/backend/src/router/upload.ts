import { resolve } from "node:path";
import { Router } from "express";
import formidable from "formidable";

import ResponseModel from "@/models/response.model";
import { ERROR_CODE } from "@/enums/error";

const router: Router = Router();

router.post("/image", async (req, res, next) => {
  const form = formidable({
    uploadDir: resolve(__dirname, "../../public/upload"),
    maxFileSize: 2 * 1024 * 1024, //2M
    keepExtensions: true,
    filter: function ({name, originalFilename, mimetype}) {
      // keep only images
      return Boolean(mimetype && mimetype.includes("image"));
    },
    filename(name, ext, part, form) {
      const { originalFilename } = part
      return originalFilename || name + ext
    },
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // res.json({ fields, files });
    // const file = files[0]
    console.log('files,', files.file)
    if (files.file && files.file.length > 0) {
      res.send(new ResponseModel(ERROR_CODE.SUCCESS, 'ok', `/static/upload/${files.file[0].newFilename}`))
    }
  });
});

export default router;
