export default function Home() {
  const sections = new Array(10).fill(0).map((_, i) => (
    <section className="h-screen " key={i}>
      <h1 className="text-3xl text-black p-10">Section{i}</h1>
    </section>
  ));
  return <div className="w-full min-h-screen">{sections}</div>;
}
