import NewsList from "@/components/ui/NewsList";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Hacker News Stories</h1>
      <NewsList />
    </div>
  );
};

export default Index;