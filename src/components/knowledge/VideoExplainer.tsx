import React from "react";

interface Props {
  src: string; // YouTube/Vimeo embed URL or mp4
  title: string;
  caption?: string;
}

export const VideoExplainer: React.FC<Props> = ({ src, title, caption }) => {
  const isMp4 = /\.mp4($|\?)/i.test(src);
  return (
    <figure className="my-6">
      <div className="aspect-video w-full overflow-hidden rounded-lg border bg-black">
        {isMp4 ? (
          <video src={src} controls className="w-full h-full" />
        ) : (
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground text-center">{caption}</figcaption>
      )}
    </figure>
  );
};

export default VideoExplainer;