import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'public';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${Date.now()}-${sanitizedOriginal}`;
        cb(null, filename);
    },


})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})