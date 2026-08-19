import { getVideoEmbedUrl } from "../utils/videoEmbed";

interface LeccionVideoPlayerProps {
    urlVideo: string;
    proveedorVideo?: string | null;
}

export function LeccionVideoPlayer({ urlVideo, proveedorVideo }: LeccionVideoPlayerProps) {
    const embedUrl = getVideoEmbedUrl(urlVideo, proveedorVideo);
    if (!embedUrl) return null;

    return (
        <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: "16 / 9" }}>
            <iframe
                src={embedUrl}
                title="Video de la lección"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}