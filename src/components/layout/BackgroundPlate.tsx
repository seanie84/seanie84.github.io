export default function BackgroundPlate({
  src1080,
  src4k,
  dim = 0.42,
}: {
  src1080: string;
  src4k: string;
  dim?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#09090b',
      }}
    >
      <img
        src={src1080}
        srcSet={`${src1080} 1920w, ${src4k} 3840w`}
        sizes="100vw"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(9,9,11,${dim * 0.55}) 0%, rgba(9,9,11,${dim}) 100%)`,
        }}
      />
    </div>
  );
}
