import { createTranscription } from '@/lib/actions/whisper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST (req: NextApiRequest, res: NextApiResponse) {
  const data = await req.body()
  const file = data.get('file');

  if (!file) {
    res.status(400).send('No file uploaded');
    return;
  }

  const transcription = await createTranscription(file);

  if (transcription) {
    res.status(200).json({ text: transcription });
  } else {
    console.log('GROQ API ERROR:');
    res.status(400).send(new Error());
  }
}

