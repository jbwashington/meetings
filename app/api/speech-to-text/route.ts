// import { NextResponse } from "next/server";
// import fs from "fs";
// import { openai } from "@/lib/vendors/openai";
const FormData = require('form-data');
import { withFileUpload } from 'next-multiparty';
import { createReadStream } from 'fs';
import { createTranscription } from '@/lib/actions/whisper';

export const config = {
  api: {
    bodyParser: false,
  },
};




export default withFileUpload(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded');
    return;
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', createReadStream(file.filepath), 'audio.wav');
  const transcription = await createTranscription(formData);

  if (transcription) {
    res.status(200).json({ text: transcription });
  } else {
    console.log('GROQ API ERROR:');
    res.status(400).send(new Error());
  }
});
