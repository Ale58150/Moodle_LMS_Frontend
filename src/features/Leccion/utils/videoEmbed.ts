export function getVideoEmbedUrl(urlVideo?: string | null, proveedor?: string | null): string | null {
    if (!urlVideo) return null;

    const p = (proveedor ?? "").toLowerCase();

    if (p.includes("youtube") || urlVideo.includes("youtube.com") || urlVideo.includes("youtu.be")) {
        const match = urlVideo.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : urlVideo;
    }

    if (p.includes("vimeo") || urlVideo.includes("vimeo.com")) {
        const match = urlVideo.match(/vimeo\.com\/(\d+)/);
        return match ? `https://player.vimeo.com/video/${match[1]}` : urlVideo;
    }
    return urlVideo;
}