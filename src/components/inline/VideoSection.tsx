export function VideoSection() {
  return (
    <section className="py-12 px-4 bg-[#f5f5f5]" id="video">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">
          See What Doctors Are Saying
        </h2>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
          <iframe
            src="https://youtube.com/embed/rM1DegIynKM?controls=1"
            allow="encrypted-media"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-none"
          />
        </div>
      </div>
    </section>
  );
}
