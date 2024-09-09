import { AudioRecorder } from 'react-audio-voice-recorder';
import { Messages } from "@/components/layout/messages";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Messages />
        </main>
    );
}
