import { useQuery } from "@tanstack/react-query";
import NewsItem from "./NewsItem";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchTopStories = async () => {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const storyIds = await response.json();
  return storyIds.slice(0, 30); // Fetch top 30 stories
};

const fetchStory = async (storyId) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
  return response.json();
};

const NewsList = () => {
  const { data: storyIds, isLoading: isLoadingStoryIds, error: storyIdsError } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const { data: stories, isLoading: isLoadingStories, error: storiesError } = useQuery({
    queryKey: ['stories', storyIds],
    queryFn: () => Promise.all(storyIds.map(fetchStory)),
    enabled: !!storyIds,
  });

  if (isLoadingStoryIds || isLoadingStories) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (storyIdsError || storiesError) {
    return <div>Error loading stories. Please try again later.</div>;
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <NewsItem key={story.id} {...story} />
      ))}
    </div>
  );
};

export default NewsList;