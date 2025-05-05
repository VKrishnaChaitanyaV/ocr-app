// pages/api/ocr.js
import { createWorker } from 'tesseract.js';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    debugger;
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
    console.log("Start");
    //console.log(req)
  const form = formidable({ uploadDir: './uploads', keepExtensions: true });
    
  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) {
        console.log(err);
      return res.status(400).json({ error: 'Image upload failed' });
    }
    console.log("Image details:"+ JSON.stringify(files));
    const imagePath = files.image[0].filepath;
    console.log("Image Path:"+imagePath);
    try {
      const worker = await createWorker();
      //await worker.load();
      //await worker.loadLanguage('eng');
      //await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(imagePath);
      await worker.terminate();
      console.log("Image Path:"+imagePath);
      fs.unlinkSync(imagePath); // Clean up
      res.status(200).json({ text });
    } catch (error) {
      console.error('OCR error:', error);
      res.status(500).json({ error: 'OCR failed' });
    }
  });
}
