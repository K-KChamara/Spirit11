const YouTubeLive = ({ videoId }) => {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-md">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Live Stream"
        ></iframe>
      </div>
    )
  }
  
  export default YouTubeLive
  
  